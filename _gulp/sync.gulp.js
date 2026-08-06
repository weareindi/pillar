export default function(gulp, plugins) {
    gulp.task('sync', async () => {
        plugins.vite.server = await plugins.vite.createServer({
            clearScreen: false,
            server: {
                open: false,
                proxy: {
                    '/': {
                        target: `http://${process.env.HOST}:${process.env.PORT}`,
                        ws: true
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
