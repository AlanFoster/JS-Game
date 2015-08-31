var Components = require('core/components');

module.exports = Components.create('rendered', {
    width: 100,
    height: 100,
    color: undefined,
    graphic: undefined
}, {
    toString: function() {
        return JSON.stringify({ width: this.width, height: this.height}, null, 4);
    }
});
