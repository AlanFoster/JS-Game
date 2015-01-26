var Render = (function () {
    var System = function (target) {
        this.target = target;
        this.width = 600;
        this.height = 500;
        this.context = undefined;
    };

    System.prototype = {
        setUp: function () {
            if (!this.target) return;

            var canvas = document.createElement('canvas');
            canvas.width = this.width;
            canvas.height = this.height;

            this.context = canvas.getContext('2d');

            this.target.innerHTML = '';
            this.target.appendChild(canvas);

            return this;
        },
        update: function (entities) {
            if (!this.context) return;

            this.preprocess(entities);

            var process = this.process.bind(this);
            entities.forEach(function (entity) {
                var rendered = entity.getComponent('rendered');
                var location = entity.getComponent('location');
                if (!rendered || !location) return;

                process(entity, { rendered: rendered, location: location })
            })
        },
        preprocess: function(entities) {
            var context = this.context;

            context.fillStyle = '#000';
            context.fillRect(0, 0, this.width, this.height);
        },
        process: function (entity, components) {
            var rendered = components.rendered;
            var location = components.location;

            var context = this.context;

            context.fillStyle = rendered.color;

            context.fillRect(location.x, location.y, rendered.width, rendered.height);
        }
    };

    return System;
})();

module.exports = Render;