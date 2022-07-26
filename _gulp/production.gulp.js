export default function(gulp, plugins) {
    gulp.task('production', gulp.series(
        gulp.parallel('scss', 'js', 'mustard', 'sw'),
        gulp.parallel('scss-minify', 'js-terser')
    ));
};
