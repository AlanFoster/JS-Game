"use strict";

var runLater = (function () {
    var fallback = function fallback(callback) {
        var targetFPS = 60;
        return window.setTimeout(callback, 1000 / targetFPS);
    };

    return window.requestAnimationFrame || fallback;
})();

var loopEndlessly = function loopEndlessly(callback) {
    runLater(function () {
        loopEndlessly(callback);
    });
    callback();
};

module.exports = {
    queue: loopEndlessly
};