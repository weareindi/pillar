export default function(gulp, plugins) {
    const compile = async (name) => {
        const source = plugins.path.join(process.env.SCSS_SRC, `${name}.scss`);
        const destination = plugins.path.join(process.env.SCSS_DEST, `${name}.css`);
        const result = plugins.sass.compile(source, {
            importers: [plugins.sassGlobbing],
            loadPaths: [
                plugins.path.resolve(process.env.SCSS_SRC),
                process.cwd()
            ],
            style: 'expanded'
        });
        const processed = await plugins.postcss([
            plugins.autoprefixer()
        ]).process(result.css, {from: source, to: destination});

        await plugins.fs.mkdir(process.env.SCSS_DEST, {recursive: true});
        await plugins.fs.writeFile(destination, processed.css);
    };

    for (const name of ['custom-vars', 'fonts', 'core']) {
        gulp.task(`scss-${name}`, () => compile(name));
    }

    gulp.task('scss-minify', async () => {
        await Promise.all(['custom-vars', 'fonts', 'core'].map(async (name) => {
            const destination = plugins.path.join(process.env.SCSS_DEST, `${name}.css`);
            const css = await plugins.fs.readFile(destination, 'utf8');
            const processed = await plugins.postcss([
                plugins.cssnano({preset: 'default'})
            ]).process(css, {from: destination, to: destination});

            await plugins.fs.writeFile(destination, processed.css);
        }));
    });

    gulp.task('scss', gulp.series(
        gulp.parallel('scss-custom-vars', 'scss-fonts', 'scss-core')
    ));
};
