module.exports = (gulp, options, plugins) => {
    gulp.task('watch', gulp.series(
        gulp.parallel('watch-scss', 'watch-js', 'watch-patterns')
    ));

    gulp.task('watch-scss', () => {
        return gulp.watch([
            process.env.SCSS_SRC + '**/*.scss',
            process.env.JS_SRC + '**/*.scss',
            process.env.PWD + '/library/**/*.scss'
        ], gulp.series(
            gulp.parallel('scss'),
            gulp.parallel('sync-reload')
        ));
    });

    gulp.task('watch-js', () => {
        return gulp.watch([
            process.env.JS_SRC + '**/*.js',
            process.env.PWD + 'library/**/*.js'
        ], gulp.series(
            gulp.parallel('js'),
            gulp.parallel('sync-reload')
        ));
    });

    gulp.task('watch-patterns', () => {
        return gulp.watch([
            process.env.PWD + '/library/**/*.json',
            process.env.PWD + '/library/**/*.twig'
        ], gulp.series(
            gulp.parallel('sync-reload')
        ));
    });
};
