export default function(gulp, plugins) {
    gulp.task('default', gulp.series(
        gulp.parallel('sync', 'watch')
    ));
}
