// Karma configuration
// Generated on Sat Jan 24 2015 00:15:47 GMT+0000 (GMT)
var _ = require('underscore');
var configuration = require('./index');

module.exports = function(config) {
    var PORT = 9000;

    config.set({

    // base path that will be used to resolve all patterns (eg. files, exclude)
    basePath: './../',

    // frameworks to use
    // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
    frameworks: ['jasmine'],

    // list of files / patterns to load in the browser
    files: [
        'spec/spec_helper.coffee',
        'spec/**/*.coffee',
        { pattern: 'app/assets/images/**/*', watched: false, included: false, served: true }
    ],

    proxies: {
        '/images/': 'http://localhost:' + PORT + '/base/app/assets/images/'
    },

    // list of files to exclude
    exclude: [
    ],

    // preprocess matching files before serving them to the browser
    // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
    preprocessors: {
      'spec/**/*.coffee': ['webpack']
    },

    // test results reporter to use
    // possible values: 'dots', 'progress'
    // available reporters: https://npmjs.org/browse/keyword/karma-reporter
    reporters: ['progress'],

    // web server port
    port: PORT,

    // enable / disable colors in the output (reporters and logs)
    colors: true,

    // level of logging
    // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
    logLevel: config.LOG_INFO,

    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: true,

    // start these browsers
    // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
    browsers: ['Chrome'],

    // Continuous Integration mode
    // if true, Karma captures browsers, runs the tests and exits
    singleRun: false,

    webpack: _.extend(configuration.webpack, {
        devtool: 'inline-source-map',
        bail: false
    }),

    webpackServer: {
      noInfo: true
    }
  });
};
