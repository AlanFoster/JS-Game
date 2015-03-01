var _ = require('underscore');

var Render = (function () {
    var System = function () {

    };

    System.prototype = {
        setUp: function () {

        },
        getCamera: function(entities) {
            var entityWithCamera = _.find(entities, function(entity) {
                return entity.getComponent('camera')
            });

            var location = entityWithCamera.getComponent('location');
            var rendered = entityWithCamera.getComponent('rendered');
            var camera = {
                x: location.x + (rendered.width / 2),
                y: location.y + (rendered.height / 2)
            };

            return camera;
        },
        update: function (entities, world) {
            var renderer = world.renderer;
            if (!renderer) return; // TODO

            var camera = this.getCamera(entities);

            var process = this.process.bind(this);
            entities.forEach(function (entity) {
                var rendered = entity.getComponent('rendered');
                var location = entity.getComponent('location');
                if (!rendered || !location) return;

                process(entity, {rendered: rendered, location: location}, camera, renderer)
            })
        },
        process: function (entity, components, camera, renderer) {
            var rendered = components.rendered;
            var location = components.location;

            renderer.batch(function(context) {
                var foo = entity.getComponent('bot');
                if(foo && foo.target) {
                    var x = foo.target.x;
                    var y = foo.target.y;

                    context.fillStyle = 'red';
                    context.fillRect(x, y, 5, 5);
                }

                var center = {
                    x: location.x + (rendered.width / 2),
                    y: location.y + (rendered.height / 2)
                };

                var drawAt = {
                    x: -(rendered.width / 2),
                    y: -(rendered.height / 2)
                };

                context.translate(center.x, center.y);

                context.rotate(location.rotation);

                if(rendered.color) {
                    context.fillStyle = rendered.color;
                    context.fillRect(drawAt.x, drawAt.y, rendered.width, rendered.height);
                } else if(rendered.graphic) {
                    context.drawImage(rendered.graphic, drawAt.x, drawAt.y);
                }
            });

        }
    };

    return System;
})();

module.exports = Render;