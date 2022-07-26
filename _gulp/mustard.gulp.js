export default function(gulp, plugins) {
    gulp.task('mustard', () => {
        return gulp.src([
            process.env.JS_SRC + 'mustard.js'
        ])
            .pipe(plugins.terser())
            .pipe(gulp.dest(process.env.JS_DEST))
            .on('error', plugins.log.error);
    });
};
