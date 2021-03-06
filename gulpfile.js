var gulp = require('gulp');
var replace = require('gulp-replace');
var rename = require('gulp-rename');
var haml = require('gulp-haml');
var karma = require('karma').server;
var webpack = require('gulp-webpack');
var configuration = require('./config');
var watch = require('gulp-watch');
var clean = require('gulp-clean');
var plumber = require('gulp-plumber');
var argv = require('yargs').argv;

var handleError = function(error) {
    var errorContent = error.message
                            .replace(/'|"/g, "\\\'")
                            .replace(/\n|\r/g, "<br />");

     gulp.src('app/assets/js/error.js')
                .pipe(replace("#{ERROR}", errorContent))
                .pipe(rename('main.js'))
                .pipe(gulp.dest('dist/js'));
};

gulp.task('javascript_bundle', function () {
    return gulp.src('app/assets/js/main.js')
                .pipe(plumber({ errorHandler: handleError }))
                .pipe(webpack(configuration.webpack))
                .pipe(gulp.dest('dist/js'));
});

gulp.task('haml', function () {
    return gulp.src('app/views/**/*.haml')
                .pipe(haml())
                .pipe(gulp.dest('dist'));
});

gulp.task('images', function() {
    return gulp.src('app/assets/images/**/**')
                .pipe(gulp.dest('dist/images'));
});

gulp.task('clean', function() {
    return gulp.src('dist/**', { read: false })
                .pipe(clean({ force: true }));
});

gulp.task('test', function(done) {
    var config = argv.ci ? '/config/karma.ci.conf'
                         : '/config/karma.conf.js';

    karma.start({
        configFile: __dirname + config
    }, done)
});

gulp.task('javascript', ['javascript_bundle']);
gulp.task('assets', ['javascript', 'images']);
gulp.task('views', ['haml']);
gulp.task('build', ['assets', 'views']);
gulp.task('rebuild', ['build']);
gulp.task('watch', ['rebuild'], function () {
    return watch('app/**/*.*', function() {
        gulp.start('rebuild');
    });
});
gulp.task('default', ['build', 'watch']);
