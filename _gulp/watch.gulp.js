export default function(gulp, plugins) {
    gulp.task('watch-scss', () => {
        return gulp.watch([
            plugins.path.join(process.env.SCSS_SRC, '**/*.scss'),
            plugins.path.join(process.env.JS_SRC, '**/*.scss'),
            plugins.path.join(process.cwd(), 'library/**/*.scss')
        ], gulp.series(
            gulp.parallel('scss'),
            gulp.parallel('sync-reload')
        ));
    });

    gulp.task('watch-js', () => {
        return gulp.watch([
            plugins.path.join(process.env.JS_SRC, '**/*.js'),
            plugins.path.join(process.cwd(), 'library/**/*.js')
        ], gulp.series(
            gulp.parallel('js'),
            gulp.parallel('sync-reload')
        ));
    });

    gulp.task('watch-patterns', () => {
        return gulp.watch([
            plugins.path.join(process.cwd(), 'library/**/*.json'),
            plugins.path.join(process.cwd(), 'library/**/*.twig')
        ], gulp.series(
            gulp.parallel('sync-reload')
        ));
    });

    gulp.task('watch', gulp.series(
        gulp.parallel('watch-scss', 'watch-js', 'watch-patterns')
    ));
};
