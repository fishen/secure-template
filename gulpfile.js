const gulp = require('gulp');
const bundle = require('bundle-dts');

exports.dts = function () {
    return gulp.src('src/index.ts')
        .pipe(bundle())
        .pipe(gulp.dest('.'))
}