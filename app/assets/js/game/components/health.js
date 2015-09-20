var Components = require('ecs-dist').Components;

module.exports = Components.create('health', {
    current: 50,
    maximum: 100
}, {
    percentage: function() {
        return this.current / this.maximum;
    }
});
