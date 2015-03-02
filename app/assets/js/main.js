window.onload = function () {
    var _ = require('underscore');
    var entityManager = require('game/entities').entityManager;
    var systemManager = require('game/systems').create();
    var assetManager = require('core/assets');
    var runner = require('core/runner');

    var world = {
        entityManager: entityManager,
        assetManager: assetManager,

        size: {
            width: window.innerWidth,
            height: window.innerHeight
        }
    };

    world.renderer = new Renderer(document.body).setUp(world);

    assetManager.load([], function () {
        runner.queue(function () {
            systemManager.update(world);
        })
    })
};

var Renderer = (function () {
    var Renderer = function (target) {
        this.target = target;

        this.context = undefined;
    };

    Renderer.prototype = {
        setUp: function (world) {
            if (!this.target) return;

            this.size = world.size;

            var canvas = document.createElement('canvas');
            canvas.width = this.size.width;
            canvas.height = this.size.height;

            this.context = canvas.getContext('2d');

            this.target.innerHTML = '';
            this.target.appendChild(canvas);

            return this;
        },
        clear: function () {
            var context = this.context;

            context.clearRect(0, 0, this.size.width, this.size.height);
        },
        batch: function(drawingFunction) {
            var context = this.context;

            context.save();
            drawingFunction(context);
            context.restore();
        }
    };

    return Renderer;
})();
