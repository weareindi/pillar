import {promisify} from 'node:util';
import {brotliDecompress, gunzip, inflate} from 'node:zlib';

const decompress = {
    br: promisify(brotliDecompress),
    gzip: promisify(gunzip),
    deflate: promisify(inflate)
};

export default function(gulp, plugins) {
    const injectClient = async (upstream, request, response) => {
        const headers = {...upstream.headers};
        // Connection-specific headers belong to the upstream HTTP connection only.
        const connectionHeaders = String(headers.connection || '').split(',')
            .map((name) => name.trim().toLowerCase()).filter(Boolean);
        for (const name of [
            ...connectionHeaders,
            'connection', 'keep-alive', 'proxy-authenticate', 'proxy-authorization',
            'proxy-connection', 'te', 'trailer', 'transfer-encoding', 'upgrade'
        ]) {
            delete headers[name];
        }
        const isHtml = /^text\/html\b/i.test(headers['content-type'] || '');

        if (!isHtml || request.method === 'HEAD' || [204, 304].includes(upstream.statusCode)) {
            response.writeHead(upstream.statusCode, headers);
            upstream.on('error', (error) => response.destroy(error));
            upstream.pipe(response);
            return;
        }

        const chunks = [];
        for await (const chunk of upstream) {
            chunks.push(chunk);
        }
        let body = Buffer.concat(chunks);
        const encoding = headers['content-encoding'];
        if (encoding && encoding !== 'identity') {
            if (!decompress[encoding]) {
                throw new Error(`Unsupported HTML content encoding: ${encoding}`);
            }
            body = await decompress[encoding](body);
        }

        const html = body.toString('utf8');
        const client = '<script type="module" src="/@vite/client"></script>';
        const injected = /<head\b[^>]*>/i.test(html)
            ? html.replace(/<head\b[^>]*>/i, (head) => `${head}\n${client}`)
            : `${client}\n${html}`;

        // The injected response has different bytes and must not reuse PHP's validators.
        for (const name of ['content-length', 'content-encoding', 'etag', 'last-modified']) {
            delete headers[name];
        }
        headers['cache-control'] = 'no-store';
        response.writeHead(upstream.statusCode, headers);
        response.end(injected);
    };

    gulp.task('sync', async () => {
        plugins.vite.server = await plugins.vite.createServer({
            clearScreen: false,
            server: {
                https: {
                    key: await plugins.fs.readFile(
                        plugins.path.resolve('_certs/key.pem')
                    ),
                    cert: await plugins.fs.readFile(
                        plugins.path.resolve('_certs/cert.pem')
                    )
                },
                open: false,
                // Gulp watches sources and sends reloads after compilation finishes.
                watch: null,
                proxy: {
                    '^/(?!@vite/|@id/|@fs/|node_modules/)': {
                        target: `http://${process.env.HOST}:${process.env.PORT}`,
                        // Vite owns the reload WebSocket; PHP only receives HTTP requests.
                        ws: false,
                        selfHandleResponse: true,
                        configure(proxy) {
                            proxy.on('proxyReq', (request) => {
                                request.setHeader('accept-encoding', 'identity');
                                request.removeHeader('if-none-match');
                                request.removeHeader('if-modified-since');
                            });
                            proxy.on('proxyRes', (upstream, request, response) => {
                                injectClient(upstream, request, response).catch((error) => {
                                    plugins.vite.server.config.logger.error(error.stack || error.message);
                                    if (response.headersSent) {
                                        response.destroy(error);
                                        return;
                                    }
                                    response.writeHead(502, {'content-type': 'text/plain'});
                                    response.end('Unable to inject the development reload client.');
                                });
                            });
                        }
                    }
                }
            }
        });

        await plugins.vite.server.listen();
        plugins.vite.server.printUrls();
    });

    gulp.task('sync-reload', (done) => {
        plugins.vite.server?.ws.send({type: 'full-reload'});
        done();
    });
}
