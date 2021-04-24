const gulp = require('gulp');
const terser = require('gulp-terser');

function es(){
  return gulp.src('./public/js/*.js')
    .pipe(terser())
    .pipe(gulp.dest('./public/uglyJS'));
}

exports.default = es;