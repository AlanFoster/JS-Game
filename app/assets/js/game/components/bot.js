var Components = require('ecs-dist').Components;

module.exports = Components.create('bot', {
    state: 'roam',
    counter: 0,
    roamCount: 0
});
