'use strict';

var Renderer = (function () {
  var Renderer = function Renderer(target) {
    this.target = target;

    this.context = undefined;
  };

  Renderer.noop = {
    clear: function clear() {},
    batch: function batch(drawingFunction) {}
  };

  Renderer.prototype = {
    setUp: function setUp(world) {
      if (!this.target) return Renderer.noop;

      this.size = world.size;

      var canvas = document.createElement('canvas');
      canvas.width = this.size.width;
      canvas.height = this.size.height;

      this.context = canvas.getContext('2d');

      this.target.appendChild(canvas);

      return this;
    },
    clear: function clear() {
      var context = this.context;

      context.clearRect(0, 0, this.size.width, this.size.height);
      context.moveTo(0, 0);
    },
    batch: function batch(drawingFunction) {
      var context = this.context;

      context.save();
      drawingFunction(context);
      context.restore();
    }
  };

  return Renderer;
})();

module.exports = Renderer;