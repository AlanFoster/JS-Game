module.exports = (function () {
    function Loader() {
        this.assets = {};
    };

    Loader.prototype = {
        load: function (images, callback) {
            var assets = this.assets;

            var name = 'player';
            var src = 'images/player.gif';

            var image = new Image();
            image.onload = function () {
                assets[name] = image;

                callback(assets);
            };
            image.src = src;
        }
    };

    return Loader;
})();