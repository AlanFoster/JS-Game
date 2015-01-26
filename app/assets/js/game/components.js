var _ = require('underscore');

var allComponents = _.object(_.map([
    'Rendered',
    'Velocity',
    'Location'
], function(tag) {
    return [tag, require('core/components/' + tag.toLowerCase())];
}));

module.exports = allComponents;