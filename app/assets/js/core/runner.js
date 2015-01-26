var runLater = (function() {
    var fallback = function(callback) {
        var targetFPS = 2;
        return window.setTimeout(callback, 1000 / targetFPS);
    };

    return fallback;
})();

var loopEndlessly = function(callback) {
    runLater(function() {
        loopEndlessly(callback);
    });
    callback();
};

module.exports = {
    queue: loopEndlessly
}