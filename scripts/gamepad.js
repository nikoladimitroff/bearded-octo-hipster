var Gamepad = (function () {
    var animationFrameId = null;
    var listener = null;
    window.addEventListener("gamepadconnected", function() {
      var gp = navigator.getGamepads()[0];
      console.log("Gamepad connected at index " + gp.index + ": " + gp.id +
                  ". It has " + gp.buttons.length + " buttons and " + gp.axes.length + " axes.");

      loop();
    });

    window.addEventListener("gamepaddisconnected", function() {
      console.log("Waiting for gamepad.");

      cancelAnimationFrame(animationFrameId);
    });

    function loop() {
        var gp = navigator.getGamepads()[0];

        if (listener) {
            listener(gp);
        }
        animationFrameId = requestAnimationFrame(loop);
    };
    return {
        listen: function (func) {
            listener = func;
        }
    }
})();
