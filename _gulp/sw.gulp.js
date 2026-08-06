export default function(gulp, plugins) {
    gulp.task('sw', async () => {
        const source = plugins.path.join(process.env.SW_SRC, 'sw.js');
        const destination = plugins.path.join(process.env.SW_DEST, 'sw.js');
        const result = await plugins.minify(await plugins.fs.readFile(source, 'utf8'));
        await plugins.fs.mkdir(process.env.SW_DEST, {recursive: true});
        await plugins.fs.writeFile(destination, result.code);
    });
};
