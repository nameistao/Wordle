const gulp = require('gulp');
const terser = require('gulp-terser');
const { watch, series } = require('gulp');

function minifyJS(){
  return gulp.src('./public/js/*.js')
    .pipe(terser())
    .pipe(gulp.dest('./public/uglyJS'));
}

//exports.default = es;

exports.default = function() {
  // You can use a single task
  watch('public/js/*.js', minifyJS);
};