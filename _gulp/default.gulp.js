module.exports = (gulp, options, plugins) => {
    gulp.task('default', gulp.series(
        gulp.parallel('sync', 'watch')
    ));
};
