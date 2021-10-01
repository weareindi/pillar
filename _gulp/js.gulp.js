module.exports = (gulp, options, plugins) => {
    // prepare script names/filenames
    const scripts = {
        'js-script': 'script.js',
        'js-additional': 'additional.js',
        'js-threads': '**/*Thread.js',
        'js-workers': '**/*Worker.js',
        'js-helpers': '**/*Helper.js'
    };

    // register global js task
    gulp.task('js', (done) => {
        const tasks = [];

        for (let name in scripts) {
            if (scripts.hasOwnProperty(name)) {
                const task = gulp.series(`${name}`, (taskDone) => {
                    taskDone();
                });

                tasks.push(task);
            }
        }

        // trigger cleanup
        const task = gulp.series('js-cleanup', (taskDone) => {
            taskDone();
        });
        tasks.push(task);

        // run tasks
        return gulp.series(...tasks, (seriesDone) => {
            seriesDone();
            done();
        })();
    });

    // register global terser task
    gulp.task('js-terser', gulp.series(
        gulp.parallel('js-script-terser'),
        gulp.parallel('js-additional-terser'),
        gulp.parallel('js-threads-terser'),
        gulp.parallel('js-workers-terser'),
        gulp.parallel('js-helpers-terser')
    ));

    // loop through script names
    for (let name in scripts) {
        if (scripts.hasOwnProperty(name)) {
            gulp.task(`${name}`, (done) => {
                return compile(scripts[name], done);
            });

            gulp.task(`${name}-terser`, (done) => {
                return terser(scripts[name], done);
            });
        }
    }

    // register compile script
    const compile = (filename, done) => {
        // prepare filenames
        const files = plugins.glob.sync(process.env.JS_SRC + filename);

        // prepare tasks
        const tasks = files.map((file) => {
            return (taskDone) => {
                return gulp.src([file])
                    .pipe(plugins.webpack({
                        mode: 'production',
                        performance: {
                            hints: false
                        },
                        module: {
                            rules: [
                                {
                                    test: /\.html$/i,
                                    loader: "html-loader",
                                }
                            ]
                        },
                        output: {
                            filename: path.basename(file)
                        }
                    }))
                    .pipe(plugins.babel({
                        presets: ['@babel/env']
                    }))
                    .pipe(gulp.dest(process.env.JS_DEST))
                    .on('error', plugins.log.error);
            }
        });

        // run tasks
        return gulp.series(...tasks, (seriesDone) => {
            seriesDone();
            done();
        })();
    }

    //register terser script
    const terser = (filename, done) => {
        // prepare filenames
        const files = plugins.glob.sync(process.env.JS_DEST + filename);

        // prepare tasks
        const tasks = files.map((file) => {
            return (taskDone) => {
                gulp.src([file])
                    .pipe(plugins.terser())
                    .pipe(gulp.dest(process.env.JS_DEST))
                    .on('finish', () => {
                        taskDone();
                    })
                    .on('error', plugins.log.error);
            }
        });

        // run tasks
        return gulp.parallel(...tasks, (parallelDone) => {
            parallelDone();
            done();
        })();
    }

    // cleaup
    gulp.task('js-cleanup', (done) => {
        return plugins.del([
            process.env.JS_DEST + '**/*.LICENSE.js'
        ]);
    });
};
