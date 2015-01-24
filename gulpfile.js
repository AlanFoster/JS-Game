var gulp = require('gulp');
var browserify = require('gulp-browserify');
var concat = require('gulp-concat');
var connect = require('gulp-connect');
var haml = require('gulp-haml');

gulp.task('browserify', function () {
    gulp.src('app/assets/js/main.js')
        .pipe(browserify())
        .pipe(gulp.dest('dist/js'));
});

gulp.task('bower_components', function () {
    gulp.src('app/assets/js/bower_components/**')
        .pipe(gulp.dest('dist'));
});

gulp.task('haml', function () {
    gulp.src('app/views/**/*.haml')
        .pipe(haml())
        .pipe(gulp.dest('dist'));
});

gulp.task('connect', function () {
    connect.server({
        root: 'dist/',
        port: 8000
    });
});

gulp.task('javascript', ['browserify', 'bower_components']);
gulp.task('assets', ['javascript']);
gulp.task('views', ['haml']);
gulp.task('default', ['assets', 'views', 'connect']);

gulp.task('watch', function () {
    gulp.watch('app/**/*.*', ['default']);
});
