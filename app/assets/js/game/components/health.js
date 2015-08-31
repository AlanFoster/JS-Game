var Components = require('core/components');

module.exports = Components.create('health', {
    current: 50,
    maximum: 100
}, {
    percentage: function() {
        return this.current / this.maximum;
    }
});
