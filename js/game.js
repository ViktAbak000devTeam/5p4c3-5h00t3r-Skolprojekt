var LEFT_KEY = 65;
var UP_KEY = 87;
var RIGHT_KEY = 68;
var DOWN_KEY = 83;
var SPACE_KEY = 32;

var lastLoopRun = 0;

var mouse = {
  x: undefined,
  y: undefined
};

var Sprites = [];
var Monster = [];
var canvas = document.querySelector('canvas');
var c = canvas.getContext('2d');

window.addEventListener('mousemove', function(event){
  mouse.x = event.x;
  mouse.y = event.y;
});//lyssnar efter musens position


var LaserSoundEffect;

function Fiender(x, y, dx, dy){
  this.x = x;
  this.y = y;
  this.dx = dx;
  this.dy = dy;
  this.radius = 60;
  var maxHP = 100;
  this.HP = maxHP;
  this.erik = document.getElementById("Erik");
  this.draw = function(){
    c.drawImage(this.erik,this.x-50, this.y-50, 100, 100);
    c.fillStyle = "red";
    c.fillRect(this.x-50, this.y-65, 100, 10);
    c.fillStyle = "green";
    c.fillRect(this.x-50, this.y-65, 100*this.HP/maxHP, 10);
  }
  this.update = function(){
    this.y += this.dy;
    if(this.y > canvas.height || this.HP <= 0){
      Monster.splice(Monster.indexOf(this), 1);
      Sprites.splice(Sprites.indexOf(this), 1);
    }
    this.draw();
  }
  this.applyDamage = function(damage){
    this.HP -= damage;
  }
}

function Skott(x,y,dx,dy) {
  this.x = x;
  this.y = y;
  this.dx = dx;
  this.dy = dy;
  this.angle = Math.atan2(-dy, -dx);
  var img = document.getElementById("skott");
  this.draw = function() {
    c.translate(this.x, this.y);//flyttar skotten till this.x, this.y
    c.rotate(this.angle - Math.PI/2);//roterar skottet efter musens position
    c.drawImage(img,-30,-30,60,60);
    c.rotate(-this.angle + Math.PI/2);//tillater att skottet roterar at andra hallet
    c.translate(-this.x, -this.y);//tillater en tillbakaflyttning
  }

  this.update = function(dt) {
    this.x += this.dx*dt;
    this.y += this.dy*dt;
    // Testa kollision
    for(var i = Monster.length -1; i >= 0; i--){
      var DeltaX = this.x - Monster[i].x;
      var DeltaY = this.y - Monster[i].y;
      if(Math.sqrt(DeltaX*DeltaX + DeltaY*DeltaY) < Monster[i].radius){
        Monster[i].applyDamage(25);
        Sprites.splice(Sprites.indexOf(this), 1);
      }
    }


    // Tar bort skott utanfor skarmen
    if(this.x < 0 || this.x > window.innerWidth
    || this.y < 0 || this.y > window.innerHeight) {
      Sprites.splice(Sprites.indexOf(this), 1);//splicar ut elementet ur arrayen
    }
    this.draw();//anropar draw
  }
}

var hero = new Object();
 //hero.element = 'hero';
 hero.x = window.innerWidth/2;
 hero.y = window.innerHeight/2;
 hero.w = 100;
 hero.h = 100;
 hero.movement = 300;
 hero.angle = 0;
 hero.img = document.getElementById("ship");
 hero.crosshair = document.getElementById("crosshair");//skapar ett crosshair som foljer mouse position
 hero.cooldown = 0; //detta e en cooldown till skott/minut, 0 => farkosten kan skjuta

 hero.draw = function() {
   c.translate(hero.x, hero.y);
   c.rotate(this.angle - Math.PI/2);
   c.drawImage(this.img,-this.w/2,-this.h/2,this.w,this.h);
   c.rotate(-this.angle + Math.PI/2);
   c.translate(-hero.x, -hero.y);

   c.drawImage(this.crosshair,mouse.x-25, mouse.y-25, 50, 50);
 }

 hero.update = function(dt) {
   this.angle = Math.atan2(hero.y - mouse.y, hero.x - mouse.x);
   this.cooldown -= dt;
   this.draw();
 }

 hero.fire = function() {
   if(this.cooldown > 0) return;// cooldown > 0 => funktionen ej kan aktiveras
   var v = 1000;
   var dx = -Math.cos(this.angle);
   var dy = -Math.sin(this.angle);
   if(!LaserSoundEffect.paused)
      LaserSoundEffect.currentTime = 0;
   else
      LaserSoundEffect.play();//DETTA SPELAR UPP LJUD TILL LASERORKESTRALEN
   Sprites.push(new Skott(this.x+dx*this.h/2, this.y+dy*this.h/2, dx*v, dy*v));
   this.cooldown = 0.25; //when function is activated, cooldown is set to greater than 0 to cool down

   //window.setTimeout(function(){ hero.cooldown = 0;}, 125);//checks the window delta t, so that after 250 ms cooldown is reset to 0
 }
 // Lagger till hero i listan av sprites
 Sprites.push(hero);

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
  if (keyCode == SPACE_KEY) {
    controller.space = isPressed;
  }
}

var EnemySpawnRate = 0;
function updateObjects(dt) {
  // Updaterar alla sprites
  var x = Math.random()*canvas.width;
  if(x < 50){
    x = 50;
  }
  else if( x > canvas.width-50){
    x = canvas.width - 50;
  }
  if(EnemySpawnRate <= 0){
    var Fiende = new Fiender(x, -100, 10, 1);
    Sprites.push(Fiende);
    Monster.push(Fiende);
    EnemySpawnRate = 4;
  }
  EnemySpawnRate -= dt;
  c.shadowBlur = 0;
  c.shadowColor = undefined;
  for(i = Sprites.length - 1; i >= 0; i--) {
    Sprites[i].update(dt);
  }
}

function handleControls(dt) {
  if (controller.up) {
    hero.y -= hero.movement*dt;
  }
  if (controller.down) {
    hero.y += hero.movement*dt;
  }
  if (controller.right) {
    hero.x += hero.movement*dt;
  }
  if (controller.left) {
    hero.x -= hero.movement*dt;
  }
  if(controller.space) {
    hero.fire();
  }

  ensureBounds(hero);
}//denna funktion kan flyttas in i hero.update!

function ensureBounds(sprite) {
  if (sprite.x < hero.w/2) {
    sprite.x = sprite.w/2;
  }
  if (sprite.y < hero.h/2) {
    sprite.y = sprite.h/2;
  }
  if (sprite.x + sprite.w/2 > window.innerWidth) {
    sprite.x = window.innerWidth - sprite.w/2 ;
  }
  if (sprite.y + sprite.h/2 > window.innerHeight) {
    sprite.y = window.innerHeight-sprite.h/2;
  }
}

var t0 = 0;
function loop(t) {
  var dt = (t - t0)/1000;
  handleControls(dt);
  drawBackground();
  updateObjects(dt);
  t0 = t;
  window.requestAnimationFrame(loop);
}

function init(){
  LaserSoundEffect = document.getElementById("LaserSound");
  window.requestAnimationFrame(loop);
}

document.onkeydown = function(evt){
  togglekey(evt.keyCode, true);
}

document.onkeyup = function(evt){
  togglekey(evt.keyCode, false);
}
