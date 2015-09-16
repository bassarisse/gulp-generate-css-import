
var path = require('path');
var through = require('through2');
var gutil = require('gulp-util');
var PluginError = gutil.PluginError;
var File = gutil.File;

module.exports = function(basePath) {
    if (!basePath) {
        throw new PluginError('gulp-generate-css-import', 'Missing base path for gulp-generate-css-import');
    }

    var finalResult = "";

    function bufferContents(file, encoding, cb) {
        // ignore empty files
        if (file.isNull()) {
            cb();
            return;
        }

        var importPath = path.relative(basePath, file.path).replace(/\\/ig, "/");

        finalResult += "@import url(" + importPath + ");\n";

        cb();
    }

    function endStream(cb) {

        if (finalResult) {
            this.push(new File({
                cwd: "/",
                base: basePath,
                path: path.join(basePath, "temp.css"),
                contents: new Buffer(finalResult, "utf8")
            }));
        }

        cb();
    }

    return through.obj(bufferContents, endStream);
};