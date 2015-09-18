var Renderer = (function () {
  var Renderer = function (target) {
    this.target = target;

    this.context = undefined;
  };

  Renderer.noop = {
    clear: function() { },
    batch: function(drawingFunction) { }
  };

  Renderer.prototype = {
    setUp: function (world) {
      if (!this.target) return Renderer.noop;

      this.size = world.size;

      var canvas = document.createElement('canvas');
      canvas.width = this.size.width;
      canvas.height = this.size.height;

      this.context = canvas.getContext('2d');

      this.target.appendChild(canvas);

      return this;
    },
    clear: function () {
      var context = this.context;

      context.clearRect(0, 0, this.size.width, this.size.height);
      context.moveTo(0, 0);
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

module.exports = Renderer;
