// events emitter
import events from 'events';
events.EventEmitter.prototype._maxListeners = 100;

// dotenv
import dotenv from 'dotenv';
dotenv.config(); // Loads default .env file variables into `process.env`
dotenv.config({path: './.env.gulp'}); // Loads gulp .env file variables into `process.env`

// gulp
import gulp from 'gulp';

// forward ref (so we can import gulp tasks in any order)
import ForwardRefRegistry from 'undertaker-forward-reference';
gulp.registry(ForwardRefRegistry());

// plugins
import autoprefixer from 'autoprefixer';
import browsersync from 'browser-sync';
import cssnano from 'cssnano';
import {deleteAsync} from 'del';
import glob from 'glob';
import gulpbabel from 'gulp-babel';
import gulppostcss from 'gulp-postcss';
import gulpsass from 'gulp-sass';
import gulpterser from 'gulp-terser';
import env from 'env';
import log from 'fancy-log';
import plumber from 'gulp-plumber';
import pluginError from 'plugin-error';
import * as sass from 'sass';
import sassVariables from 'gulp-sass-variables';
import sassGlobbing from 'node-sass-globbing';
import vinylbuffer from 'vinyl-buffer';
import vinylsource from 'vinyl-source-stream';
import webpack from 'webpack';
import webpackStream from 'webpack-stream';

const plugins = {
    autoprefixer: autoprefixer,
    babel: gulpbabel,
    browsersync: browsersync.create(),
    cssnano: cssnano,
    del: deleteAsync,
    glob: glob,
    env: env,
    log: log,
    postcss: gulppostcss,
    plumber: plumber,
    pluginError: pluginError,
    sass: gulpsass(sass),
    sassVariables: sassVariables,
    sassGlobbing: sassGlobbing,
    terser: gulpterser,
    vinylBuffer: vinylbuffer,
    vinylSource: vinylsource,
    webpack: webpack,
    webpackStream: webpackStream
};

// tasks
import taskbrowsersync from './_gulp/browsersync.gulp.js';
import taskdefault from './_gulp/default.gulp.js';
import taskjs from './_gulp/js.gulp.js';
import taskmustard from './_gulp/mustard.gulp.js';
import taskproduction from './_gulp/production.gulp.js';
import taskscss from './_gulp/scss.gulp.js';
import tasksw from './_gulp/sw.gulp.js';
import taskwatch from './_gulp/watch.gulp.js';

taskbrowsersync(gulp, plugins);
taskdefault(gulp, plugins);
taskjs(gulp, plugins);
taskmustard(gulp, plugins);
taskproduction(gulp, plugins);
taskscss(gulp, plugins);
tasksw(gulp, plugins);
taskwatch(gulp, plugins);
