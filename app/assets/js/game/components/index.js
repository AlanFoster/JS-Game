var _ = require('underscore');

var allComponents = _.object(_.map([
    'Rendered',
    'Velocity',
    'Location',
    'Acceleration',
    'Keyboard',
    'Friction',
    'Camera',
    'Bot'
], function(tag) {
    return [tag, require('game/components/' + tag.toLowerCase())];
}));

module.exports = allComponents;