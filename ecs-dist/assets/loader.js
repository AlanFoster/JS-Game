'use strict';

var _ = require('underscore');

module.exports = (function () {
    function Loader() {
        this.assets = {};
    };

    Loader.prototype = {
        load: function load(requiredAssets, callback) {
            var totalRequired = requiredAssets.length;
            var totalLoaded = 0;
            if (totalRequired === 0) callback();

            var assets = this.assets;

            _.each(requiredAssets, function (requiredAsset) {
                var name = requiredAsset.name;
                var src = requiredAsset.src;

                var image = new Image();
                image.onload = function () {
                    assets[name] = image;
                    totalLoaded++;
                    if (totalLoaded === totalRequired) {
                        callback();
                    }
                };
                image.src = src;
            });
        }
    };

    return Loader;
})();