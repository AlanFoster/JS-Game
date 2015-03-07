var _ = require('underscore');

var Render = (function () {
    var System = function () {
    };

    var botDebugRenderer = (function() {
        return {
            draw: function (entity, spatial, context) {
                var botComponent = entity.getComponent('bot');
                if (botComponent && botComponent.target) {
                    var x = botComponent.target.x;
                    var y = botComponent.target.y;

                    context.fillStyle = 'blue';
                    context.fillRect(x, y, 5, 5);
                }
            }
        };
    })();

    var componentDebugRenderer = (function() {
        return {
            draw: function(entity, context, size) {
                if (!entity.getComponent('camera')) return;

                var capitalizeFirst = function(string) { return string[0].toUpperCase() + string.substr(1) }
                var componentDebug = _.flatten(_.map(entity.components, function(component) {
                    var debugged = _.drop(component.toString().split('\n'));

                    var tag = capitalizeFirst(component.tag);
                    var splitter = debugged.length === 0 ? '{ }' : '{';
                    return [tag + ': ' + splitter].concat(debugged);
                }));

                var lines = ['Components for entity #' + entity.id + ' - '].concat(componentDebug);

                context.fillStyle = 'black';
                context.font = '15px serif';

                _.each(lines, function(line, index) {
                    context.fillText(line, 15, 15 * (index + 1));
                });
            }
        }
    })();

    var healthBarRenderer = (function() {
        var calculateHealthBar = function(health, spatial) {
            var healthBarTotalWidth = 180;
            return {
                totalWidth: healthBarTotalWidth,
                height: 18,
                greenBarWidth: health.percentage() * healthBarTotalWidth,

                drawAt: {
                    x: spatial.center.x - healthBarTotalWidth / 2,
                    y: spatial.y - 45
                }
            };
        };

        var colors = {
            background: 'red',
            foreground: '#6CDE68',
            border: '#135E2F'
        };

        return {
            draw: function(entity, spatial, context) {
                var health = entity.getComponent('health');
                if (!health) return;

                var healthBar = calculateHealthBar(health, spatial);

                context.fillStyle = colors.background;
                context.fillRect(healthBar.drawAt.x, healthBar.drawAt.y, healthBar.totalWidth, healthBar.height);

                context.fillStyle = colors.foreground;
                context.fillRect(healthBar.drawAt.x, healthBar.drawAt.y, healthBar.greenBarWidth, healthBar.height);

                context.strokeStyle = colors.border;
                context.lineWidth = 2;
                context.beginPath();
                context.rect(healthBar.drawAt.x, healthBar.drawAt.y, healthBar.totalWidth, healthBar.height);
                context.stroke()
            }
        }
    })();

    System.prototype = {
        setUp: function () {

        },
        getCamera: function(entities) {
            var entityWithCamera = _.find(entities, function(entity) {
                return entity.getComponent('camera')
            });

            if (!entityWithCamera) return { x: 0, y: 0 };

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
                botDebugRenderer.draw(entity, spatial, context);
                healthBarRenderer.draw(entity, spatial, context);
                componentDebugRenderer.draw(entity, context);

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