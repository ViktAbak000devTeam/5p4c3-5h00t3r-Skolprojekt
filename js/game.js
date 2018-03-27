<<<<<<< HEAD
var c = document.getElementByID("myCanvas");
var ctx = c.getContext("2d");
var canvas = document.que
ctx.beginPath(0, 0);
ctx.rect(0, 0, 100, 100);
ctx.fillStyle = "red";
ctx.fill();
=======
var LEFT_KEY = 65;
var UP_KEY = 87;
var RIGHT_KEY = 68;
var DOWN_KEY = 83;

var lastLoopRun = 0;

var hero = new Object();
 hero.element = 'hero';
 hero.x = window.innerWidth/2;
 hero.y = window.innerHeight/2 + 300;
 hero.w = 40;
 hero.h = 40;
 hero.movement = 10;

 var controller = new Object();

function togglekey(keyCode, isPressed) {
  if (keyCode == LEFT_KEY) {
    controller.left = isPressed;
  }
  if (keyCode == RIGHT_KEY) {
    controller.right = isPressed;
  }
  if (keyCode == UP_KEY) {
    controller.up = isPressed;
  }
  if (keyCode == DOWN_KEY) {
    controller.down = isPressed;
  }
}

function showSprites() {
  setPosition(hero);
}

function setPosition(sprite){
  var e = document.getElementById(sprite.element);
  e.style.left = sprite.x + 'px';
  e.style.top = sprite.y + 'px';
}

function handleControls() {
  if (controller.up) {
    hero.y -= hero.movement;
  }
  if (controller.down) {
    hero.y += hero.movement;
  }
  if (controller.right) {
    hero.x += hero.movement;
  }
  if (controller.left) {
    hero.x -= hero.movement;
  }

  ensureBounds(hero);
}

function ensureBounds(sprite) {
  if (sprite.x < 20) {
    sprite.x = 20;
  }
  if (sprite.y < 20) {
    sprite.y = 20;
  }
  if (sprite.x + (20 + sprite.w) > window.innerWidth) {
    sprite.x = window.innerWidth - (20 + sprite.w);
  }
  if (sprite.y + (20 + sprite.h) > window.innerHeight) {
    sprite.y = window.innerHeight - (20 + sprite.h);
  }
}

function loop() {
  if (new Date().getTime() - lastLoopRun > 0.1){ //Kollar hela tiden om differansen är större än 5ms
    handleControls();
    showSprites();
    lastLoopRun = new Date().getTime(); //Uppdaterar hjältens position varje 5:e millisekund
  }
  setTimeout('loop();', 2); //gör en liten fördröjning på 2ms, kör funktionen igen 
}

document.onkeydown = function(evt){
  togglekey(evt.keyCode, true);
}

document.onkeyup = function(evt){
  togglekey(evt.keyCode, false);
}

loop();
>>>>>>> fe6951f7b707b0fd02e95d3d773c567d2bfeaf1c
