module.exports = (gulp, options, plugins) => {
    gulp.task('production', gulp.series(
        gulp.parallel('scss', 'js', 'mustard', 'sw'),
        gulp.parallel('scss-minify', 'js-terser')
    ));
};
