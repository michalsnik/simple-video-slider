var gulp            = require('gulp');

var sass            = require('gulp-sass');
var autoprefixer    = require('gulp-autoprefixer');
var minifyCss       = require('gulp-minify-css');

var rollup          = require('gulp-rollup');
var concat          = require('gulp-concat');
var uglify          = require('gulp-uglify');

var browserSync     = require('browser-sync');
var reload          = browserSync.reload;

var Server          = require('karma').Server;

// Bundle

gulp.task('bundle', function(){
    gulp.src('./src/js/simple-video-slider.js', {read: false})
        .pipe(rollup({}))
        .pipe(gulp.dest('./dist/js'))
        .pipe(uglify({
            preserveComments: 'some'
        }))
        .pipe(concat('simple-video-slider.min.js'))
        .pipe(gulp.dest('./dist/js'))
        .pipe(reload({
            stream: true
        }));
});

// Sass

gulp.task('sass', function() {
    gulp.src('src/scss/*.scss')
        .pipe(concat('simple-video-slider.scss'))
        .pipe(sass({
            errLogToConsole: true
        }))
        .pipe(autoprefixer({
            browsers: ['> 1%']
        }))
        .pipe(gulp.dest('./dist/css'))
        .pipe(minifyCss())
        .pipe(concat('simple-video-slider.min.css'))
        .pipe(gulp.dest('./dist/css'))
        .pipe(reload({
            stream: true
        }));
});

// Tests

gulp.task('test', function(done) {
    new Server({
        configFile: __dirname + '/karma.conf.js',
        singleRun: true
    }, done).start();
});

gulp.task('tdd', function(done) {
    new Server({
        configFile: __dirname + '/karma.conf.js'
    }, done).start();
});

// Static server

gulp.task('browser-sync', function() {
    browserSync({
        server: {
            baseDir: "./"
        }
    });
});

// Reload all browsers

gulp.task('bs-reload', function() {
    browserSync.reload();
});

// Developement task

gulp.task('watch', ['browser-sync', 'bundle', 'sass'], function() {
    gulp.watch('./src/scss/**/*.scss', ['sass']);
    gulp.watch('./src/js/**/*.js', ['bundle']);
    gulp.watch('*.html', ['bs-reload']);
});

// Task for `gulp` command

gulp.task('default', ['watch']);

// Build js/css and run tests once

gulp.task('build', ['bundle', 'sass', 'test'], function() {
    process.exit();
});