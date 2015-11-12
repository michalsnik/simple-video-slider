var gulp            = require('gulp');

var sass            = require('gulp-sass');
var autoprefixer    = require('gulp-autoprefixer');
var concat          = require('gulp-concat');
var minifyCss       = require('gulp-minify-css');

var browserSync     = require('browser-sync');
var reload          = browserSync.reload;

var plugin          = require('./../plugin.json');

module.exports = function() {
  gulp.src('src/scss/*.scss')
        .pipe(concat(plugin.scss))
        .pipe(sass({
            errLogToConsole: true
        }))
        .pipe(autoprefixer({
            browsers: ['> 1%']
        }))
        .pipe(minifyCss())
        .pipe(gulp.dest('dist/css'))
        .pipe(reload({
            stream: true
        }));
}
