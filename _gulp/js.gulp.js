export default function(gulp, plugins) {
    // prepare script names/filenames
    const scripts = {
        'js-preload': 'preload.js',
        'js-script': 'script.js',
        'js-additional': 'additional.js',
        'js-threads': '**/*Thread.js',
        'js-workers': '**/*Worker.js',
        'js-helpers': '**/*Helper.js'
    };

    const runWebpack = (file) => new Promise((resolve, reject) => {
        const compiler = plugins.webpack({
            entry: plugins.path.resolve(file),
            mode: 'production',
            output: {
                filename: plugins.path.basename(file),
                path: plugins.path.resolve(process.env.JS_DEST)
            },
            performance: {hints: false},
            target: ['web', 'es2018']
        });

        compiler.run((error, stats) => {
            compiler.close(() => {});
            if (error) {
                reject(error);
                return;
            }
            if (stats.hasErrors()) {
                reject(new Error(stats.toString({all: false, errors: true})));
                return;
            }
            resolve();
        });
    });

    const compile = async (filename) => {
        const files = plugins.glob(process.env.JS_SRC + filename);
        await Promise.all(files.map(runWebpack));
    };

    const minify = async (filename) => {
        const files = plugins.glob(process.env.JS_DEST + filename);
        await Promise.all(files.map(async (file) => {
            const source = await plugins.fs.readFile(file, 'utf8');
            const result = await plugins.minify(source);
            await plugins.fs.writeFile(file, result.code);
        }));
    };

    for (const [name, filename] of Object.entries(scripts)) {
        gulp.task(name, () => compile(filename));
        gulp.task(`${name}-terser`, () => minify(filename));
    }

    // register global js task
    // cleaup
    gulp.task('js-cleanup', () => {
        return plugins.del([
            process.env.JS_DEST + '**/*.LICENSE.js'
        ]);
    });

    gulp.task('js', gulp.series(...Object.keys(scripts), 'js-cleanup'));

    // register global terser task
    gulp.task('js-terser', gulp.series(
        gulp.parallel('js-preload-terser'),
        gulp.parallel('js-script-terser'),
        gulp.parallel('js-additional-terser'),
        gulp.parallel('js-threads-terser'),
        gulp.parallel('js-workers-terser'),
        gulp.parallel('js-helpers-terser')
    ));
};
