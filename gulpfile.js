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

    console.log('Error: ', errorContent);

    gulp.src('app/assets/js/error.js')
        .pipe(replace("#{ERROR}", errorContent))
        .pipe(rename('main.js'))
        .pipe(gulp.dest('dist/js'));
};


var javascriptBundleFor = function(path, target) {
  return gulp.src(path)
             .pipe(plumber({ errorHandler: handleError }))
             .pipe(webpack(configuration.webpack))
             .pipe(gulp.dest(target));
};

var ecs_bundle = function(cb) {
  return javascriptBundleFor('ecs/index.js', 'ecs-dist')
};

var app_bundle = function(cb) {
  return javascriptBundleFor('app/assets/js/index.js', 'dist/js');
};

// These must be sequentially ran
gulp.task('javascript_bundle', function(){
  ecs_bundle();
  app_bundle();
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
    return gulp.src(['dist/**', 'ecs-dist/**'], { read: false })
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
    return watch(['app/**/*.*', 'ecs/**/*.*'], function() {
        gulp.start('rebuild');
    });
});
gulp.task('default', ['build', 'watch']);
