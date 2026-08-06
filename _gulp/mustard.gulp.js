export default function(gulp, plugins) {
    gulp.task('mustard', async () => {
        const source = plugins.path.join(process.env.JS_SRC, 'mustard.js');
        const destination = plugins.path.join(process.env.JS_DEST, 'mustard.js');
        const result = await plugins.minify(await plugins.fs.readFile(source, 'utf8'));
        await plugins.fs.mkdir(process.env.JS_DEST, {recursive: true});
        await plugins.fs.writeFile(destination, result.code);
    });
};
