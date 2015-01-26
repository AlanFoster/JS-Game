var gulp = require('gulp');
var browserify = require('gulp-browserify');
var replace = require('gulp-replace');
var rename = require('gulp-rename');
var haml = require('gulp-haml');
var karma = require('karma').server;

var handleError = function(error) {
    var errorContent = escape(error.message.replace(/'|"/g, "\'"))

    gulp.src('app/assets/js/error.js')
        .pipe(replace("#{ERROR}", errorContent))
        .pipe(rename('main.js'))
        .pipe(gulp.dest('dist/js'));
};

gulp.task('browserify', function () {
    gulp.src('app/assets/js/main.js')
        .pipe(browserify({ debug: true, paths: ['app/assets/js'] }))
        .on('error', handleError)
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


gulp.task('test', function(done) {
    karma.start({
        configFile: __dirname + '/karma.conf.js'
    }, done)
});

gulp.task('javascript', ['bower_components', 'browserify']);
gulp.task('assets', ['javascript']);
gulp.task('views', ['haml']);
gulp.task('default', ['assets', 'views']);

gulp.task('watch', function () {
    gulp.watch('app/**/*.*', ['default']);
});
