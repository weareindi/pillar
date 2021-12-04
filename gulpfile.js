require('events').EventEmitter.prototype._maxListeners = 100;
require('dotenv').config(); // Loads default .env file variables into `process.env`
require('dotenv').config({ // Loads gulp .env file variables into `process.env`
    path: './.env.gulp'
});

const gulp = require('gulp');
const forwardRef = require('undertaker-forward-reference');

const plugins = {
    autoprefixer: require('autoprefixer'),
    babel: require('gulp-babel'),
    browsersync: require('browser-sync').create(),
    cssnano: require('cssnano'),
    del: require('del'),
    glob: require('glob'),
    env: require('env'),
    log: require('fancy-log'),
    postcss: require('gulp-postcss'),
    sass: require('gulp-sass')(require('sass')),
    sassGlobbing: require('node-sass-globbing'),
    terser: require('gulp-terser'),
    vinylBuffer: require('vinyl-buffer'),
    vinylSource: require('vinyl-source-stream'),
    webpack: require('webpack-stream')
};

gulp.registry(forwardRef());

require('load-gulp-tasks')(gulp, {
    pattern: ['_gulp/**/*.gulp.js']
}, plugins);
