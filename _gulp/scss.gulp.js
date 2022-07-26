export default function(gulp, plugins) {
    gulp.task('scss-print', () => {
        return gulp.src(process.env.SCSS_SRC + 'print.scss')
            .pipe(plugins.sass({
                importer: plugins.sassGlobbing
            }))
            .pipe(plugins.postcss([
                plugins.autoprefixer()
            ]))
            .pipe(gulp.dest(process.env.SCSS_DEST))
            .on('error', plugins.log.error);
    });

    gulp.task('scss-preload', () => {
        return gulp.src(process.env.SCSS_SRC + 'preload.scss')
            .pipe(plugins.sass({
                importer: plugins.sassGlobbing
            }))
            .pipe(plugins.postcss([
                plugins.autoprefixer()
            ]))
            .pipe(gulp.dest(process.env.SCSS_DEST))
            .on('error', plugins.log.error);
    });

    gulp.task('scss-core', () => {
        return gulp.src(process.env.SCSS_SRC + 'core.scss')
            .pipe(plugins.sass({
                importer: plugins.sassGlobbing
            }))
            .pipe(plugins.postcss([
                plugins.autoprefixer()
            ]))
            .pipe(gulp.dest(process.env.SCSS_DEST))
            .on('error', plugins.log.error);
    });

    gulp.task('scss-enhanced', () => {
        return gulp.src(process.env.SCSS_SRC + 'enhanced.scss')
            .pipe(plugins.sass({
                importer: plugins.sassGlobbing
            }))
            .pipe(plugins.postcss([
                plugins.autoprefixer()
            ]))
            .pipe(gulp.dest(process.env.SCSS_DEST))
            .on('error', plugins.log.error);
    });

    gulp.task('scss-minify', () => {
        return gulp.src([
            process.env.SCSS_DEST + 'print.css',
            process.env.SCSS_DEST + 'preload.css',
            process.env.SCSS_DEST + 'core.css',
            process.env.SCSS_DEST + 'enhanced.css'
        ])
            .pipe(plugins.postcss([
                plugins.cssnano({
                    preset: 'default'
                })
            ]))
            .pipe(gulp.dest(process.env.SCSS_DEST))
            .on('error', plugins.log.error);
    });

    gulp.task('scss', gulp.series(
        gulp.parallel('scss-print', 'scss-preload', 'scss-core'),
        gulp.parallel('scss-enhanced') // We compile enhanced after core as enhanced imports core and the task gets confused when running in parellel
    ));
};
