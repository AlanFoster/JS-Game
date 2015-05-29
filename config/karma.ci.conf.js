var base = require('./karma.conf.js');

module.exports = function(config) {
    base(config);

    config.set({
      singleRun: true,
      autoWatch: false,
      browsers: ['Firefox']
    });
};
