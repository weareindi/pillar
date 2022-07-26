export default function(gulp, plugins) {
    gulp.task('sync', () => {
        return plugins.browsersync.init({
            proxy: process.env.HOST + ':' + process.env.PORT,
            open: false,
            notify: false
        });
    });

    gulp.task('sync-reload', (done) => {
        plugins.browsersync.reload();
        done();
    });
}
