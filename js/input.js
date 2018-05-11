var LEFT_KEY;
var UP_KEY;
var RIGHT_KEY;
var DOWN_KEY;
var SPACE_KEY;
var ESCAPE_KEY;
var RELOAD_KEY;
function loadKeys(){
  LEFT_KEY = 65;
  UP_KEY = 87;
  RIGHT_KEY = 68;
  DOWN_KEY = 83;
  SPACE_KEY = 32;
  ESCAPE_KEY = 27;
  RELOAD_KEY = 82;
}

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

function togglekey(keyCode, isPressed) {
  if (keyCode == LEFT_KEY) {
    controller.left = isPressed;
  }
  if (keyCode == RIGHT_KEY) {
    controller.right = isPressed;
  }
  if (keyCode == UP_KEY) {
    controller.up = isPressed;
    updateSpeed(1.2, 30, 0, controller.up);
  }
  if (keyCode == DOWN_KEY) {
    controller.down = isPressed;
    updateSpeed(0.9, 30, 10, controller.down);
  }
  if (keyCode == DOWN_KEY) {
    controller.down = isPressed;
  }
  if (keyCode == SPACE_KEY) {
    controller.space = isPressed;
  }
  if (keyCode == ESCAPE_KEY && isPressed) {
    setPaused(!controller.paused);
  }
  if (keyCode == RELOAD_KEY && isPressed) {
    hero.reload();
    hero.ammoResetCooldown = hero.ammoResetTime;
  }
}
