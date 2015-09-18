module.exports = {
    twoPI: Math.PI * 2,
    angleBetween: function(from, to) {
        var x = from.x - to.x;
        var y = from.y - to.y;
        return Math.atan2(y, x);
    },
    normalizeRadians: function(value) {
        var twoPI = this.twoPI;
        var normalizedRadian = value - Math.floor(value / twoPI) * twoPI;

        return normalizedRadian;
    },
    distanceBetween: function(from, to) {
        var xSquared = Math.pow(from.x - to.x, 2);
        var ySquared = Math.pow(from.y - to.y, 2);

        return Math.sqrt(xSquared + ySquared);
    }
};