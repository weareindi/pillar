import autoprefixer from 'autoprefixer';
import cssnano from 'cssnano';
import {deleteAsync} from 'del';
import dotenv from 'dotenv';
import fs from 'node:fs/promises';
import {readFileSync} from 'node:fs';
import {globSync} from 'glob';
import gulp from 'gulp';
import path from 'node:path';
import {fileURLToPath, pathToFileURL} from 'node:url';
import postcss from 'postcss';
import * as sass from 'sass';
import {minify} from 'terser';
import {createServer} from 'vite';
import webpack from 'webpack';

dotenv.config({quiet: true});
dotenv.config({path: './.env.gulp', quiet: true});

const plugins = {
    autoprefixer: autoprefixer,
    cssnano: cssnano,
    del: deleteAsync,
    fs: fs,
    glob: globSync,
    minify: minify,
    path: path,
    postcss: postcss,
    sass: sass,
    vite: {
        createServer,
        server: null
    },
    sassGlobbing: {
        canonicalize(url, options) {
            if (url.startsWith('pillar-file:')) {
                const file = Buffer.from(url.slice('pillar-file:'.length), 'base64url').toString();
                return pathToFileURL(file);
            }

            if (!url.includes('*')) {
                return null;
            }

            const base = options.containingUrl
                ? path.dirname(fileURLToPath(options.containingUrl))
                : process.cwd();
            const files = globSync(url, {absolute: true, cwd: base});
            const id = Buffer.from(JSON.stringify(files)).toString('base64url');

            return new URL(`pillar-glob:${id}`);
        },
        load(canonicalUrl) {
            if (canonicalUrl.protocol === 'file:') {
                return {
                    contents: readFileSync(fileURLToPath(canonicalUrl), 'utf8'),
                    sourceMapUrl: canonicalUrl,
                    syntax: 'scss'
                };
            }

            const files = JSON.parse(Buffer.from(canonicalUrl.pathname, 'base64url').toString());

            return {
                contents: files.map((file) => {
                    const id = Buffer.from(file).toString('base64url');
                    return `@forward "pillar-file:${id}";`;
                }).join('\n'),
                syntax: 'scss'
            };
        }
    },
    webpack: webpack
};

// tasks
import taskdefault from './_gulp/default.gulp.js';
import taskjs from './_gulp/js.gulp.js';
import taskproduction from './_gulp/production.gulp.js';
import taskscss from './_gulp/scss.gulp.js';
import tasksync from './_gulp/sync.gulp.js';
import taskwatch from './_gulp/watch.gulp.js';

taskjs(gulp, plugins);
taskscss(gulp, plugins);
taskwatch(gulp, plugins);
tasksync(gulp, plugins);
taskproduction(gulp, plugins);
taskdefault(gulp, plugins);
