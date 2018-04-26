var LEFT_KEY = 65;
var UP_KEY = 87;
var RIGHT_KEY = 68;
var DOWN_KEY = 83;
var SPACE_KEY = 32;
var ESCAPE_KEY = 27;

var mouse = {
  x: undefined,
  y: undefined
};

window.addEventListener('mousemove', function(event) {
  mouse.x = event.x;
  mouse.y = event.y;
}); //lyssnar efter musens position


document.onkeydown = function(evt) {
  togglekey(evt.keyCode, true);
}

document.onkeyup = function(evt) {
  togglekey(evt.keyCode, false);
}

var controller = {
  left: false,
  right: false,
  up: false,
  down: false,
  paused: false,
  fire: false
};

function togglekey(keyCode, isPressed, ishold) {
  if (keyCode == LEFT_KEY) {
    controller.left = isPressed;
  }
  if (keyCode == RIGHT_KEY) {
    controller.right = isPressed;
  }
  if (keyCode == UP_KEY) {
    controller.up = isPressed;
    updateSpeed(2, 30, 0, controller.up);
  }
  if (keyCode == DOWN_KEY) {
    controller.down = isPressed;
    updateSpeed(0.5, 30, 10, controller.down);
  }
  if (keyCode == SPACE_KEY) {
    controller.space = isPressed;
  }
  if (keyCode == ESCAPE_KEY && isPressed == false) {
    controller.paused = !controller.paused;
    setPaused(controller.paused);
  }
}
