module.exports = (gulp, options, plugins) => {
    gulp.task('sw', () => {
        return gulp.src([
            process.env.SW_SRC + 'sw.js'
        ])
            .pipe(plugins.terser())
            .pipe(gulp.dest(process.env.SW_DEST))
            .on('error', plugins.log.error);
    });
};
