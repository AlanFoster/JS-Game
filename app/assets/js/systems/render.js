var Render = (function() {
    var System = function() {

    };

    System.prototype = {
        update: function(entities) {
            var process = this.process;
            entities.forEach(function(entity) {
                var rendered = entity.getComponent('rendered');
                if (!rendered) return;

                process(entity, { rendered: rendered })
            })
        },
        process: function(entity, components) {
            // TODO
            window.document.body.innerHTML = entity.toString();
        }
    };

    return System;
})();

module.exports = Render;