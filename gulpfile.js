var gulp = require('gulp');
var replace = require('gulp-replace');
var rename = require('gulp-rename');
var haml = require('gulp-haml');
var karma = require('karma').server;
var webpack = require('gulp-webpack');
var configuration = require('./config');

var handleError = function(error) {
    var errorContent = error.message.replace(/'|"/g, "\\\'");

    gulp.src('app/assets/js/error.js')
        .pipe(replace("#{ERROR}", errorContent))
        .pipe(rename('main.js'))
        .pipe(gulp.dest('dist/js'));
};

gulp.task('javascript_bundle', function () {
    gulp.src('app/assets/js/main.js')
        .pipe(webpack(configuration.webpack))
        .on('error', handleError)
        .pipe(gulp.dest('dist/js'));
});

gulp.task('haml', function () {
    gulp.src('app/views/**/*.haml')
        .pipe(haml())
        .pipe(gulp.dest('dist'));
});

gulp.task('test', function(done) {
    karma.start({
        configFile: __dirname + '/config/karma.js'
    }, done)
});

gulp.task('javascript', ['javascript_bundle']);
gulp.task('assets', ['javascript']);
gulp.task('views', ['haml']);
gulp.task('build', ['assets', 'views']);
gulp.task('watch', function () {
    gulp.watch('app/**/*.*', ['default']);
});
gulp.task('default', ['build', 'watch']);
