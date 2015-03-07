var Components = require('core/components/index');

module.exports = Components.create('health', {
    current: 50,
    maximum: 100
}, {
    percentage: function() {
        return this.current / this.maximum;
    }
});