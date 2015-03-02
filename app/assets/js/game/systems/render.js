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

            var spatial = entityWithCamera.getComponent('spatial');
            var rendered = entityWithCamera.getComponent('rendered');
            var camera = {
                x: spatial.x + (rendered.width / 2),
                y: spatial.y + (rendered.height / 2)
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
                var spatial = entity.getComponent('spatial');
                if (!rendered || !spatial) return;

                process(entity, {rendered: rendered, spatial: spatial}, camera, renderer)
            })
        },
        process: function (entity, components, camera, renderer) {
            var rendered = components.rendered;
            var spatial = components.spatial;

            renderer.batch(function(context) {
                var foo = entity.getComponent('bot');
                if(foo && foo.target) {
                    var x = foo.target.x;
                    var y = foo.target.y;

                    context.fillStyle = 'blue';
                    context.fillRect(x, y, 5, 5);
                };

                var center = spatial.center;

                var drawAt = {
                    x: -(spatial.width / 2),
                    y: -(spatial.height / 2)
                };

                context.translate(center.x, center.y);

                context.rotate(spatial.rotation);

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