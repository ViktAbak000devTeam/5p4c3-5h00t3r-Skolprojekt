var canvas = document.querySelector('canvas');
var c = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

var starColors = [
  'rgb(255, 214, 0)',
  'rgb(0, 255, 181)',
  'rgb(0, 79, 255)'
];

var explosionColor1 = [
  'rgba(225, 160, 0, 1)',
  'rgba(240, 255, 0, 1)',
  'rgba(225, 180, 0, 1)'
];

var explosionColor2 = [
  'rgba(255, 101, 0, 1)',
  'rgba(255, 130, 0, 1)',
  'rgba(255, 140, 0, 1)'
];

var explosionColor3 = [
  'rgba(246, 19, 0, 1)',
  'rgba(255, 50, 0, 1)',
  'rgba(255, 10, 0, 1)'
];

var exploded = false;

window.addEventListener('resize', function(){

  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
});//Denna resizar canvasen efter rutans storlek

function Asteroids(x, y, dx, dy, width, height, radie, drop){
  this.x = x;
  this.y = y;
  this.dx = dx;
  this.dy = dy;
  this.width = width;
  this.height = height;
  this.radius = radie;
  this.drop = drop;
  this.img = Asteroid;
  this.damage = hero.HP;
  this.maxHP = 200;
  this.HP = this.maxHP;
  this.draw = function(){
    c.drawImage(this.img, this.x-this.width, this.y-this.height, this.width*2, this.height*2);
    drawHealthBars(this.x - 50, this.y-this.height, 100, 10, this.HP/this.maxHP);
  }
  this.applyDamage = function(damage){
    this.HP -= damage;
  }
  this.update = function(){
    this.x += this.dx;
    this.y += this.dy;
    this.draw();

    if(this.HP <= 0){
      particles = 600;
      BossExplosion.volume = 1;
      BossExplosion.play();
      explosion(this.x+20, this.y+20);
      explosion(this.x-20, this.y-20);
      explosion(this.x, this.y);
      Sprites.splice(Sprites.indexOf(this), 1);
      Monster.splice(Monster.indexOf(this), 1);
    }
    /*if(this.HP <= 0){

    }*/
    var DeltaX = this.x - hero.x;
    var DeltaY = this.y - hero.y;
    if(Math.sqrt(DeltaX*DeltaX + DeltaY*DeltaY) < hero.radius){
        hero.takeDamage(this.damage);
    }
    /*Sprites.splice(Sprites.indexOf(this), 1);
    Monster.splice(Monster.indexOf(this), 1);*/
    // Tar bort skott utanfor skarmen
    /*if(this.x < 0 || this.x > window.innerWidth
    || this.y < 0 || this.y > window.innerHeight) {
      Sprites.splice(Sprites.indexOf(this), 1);//splicar ut elementet ur arrayen
    }*/

  }
}

function Stars(x, y, dx, dy, radie, color, glow) {
  this.x = x;
  this.y = y;
  this.dx = dx;
  this.dy = dy;
  this.dySave = dy;
  this.dxSave = dx;
  this.radie = radie;
  this.color = color;
  this.glow = glow;
  this.historyX = [];
  this.historyY = [];
  this.minsk = 1;

  this.draw = function() {
    c.beginPath();
    c.arc(this.x, this.y, this.radie, 0, Math.PI * 2, false);
    c.strokeStyle = this.color;
    c.stroke();
    c.fillStyle = this.color;
    c.shadowBlur = 2;
    c.shadowColor = this.glow;
    c.fill();
  }

  /*this.pushO = function(a) {
  for (var i = 0; i < this.historyX.length; i++) {
    a.push(new Stars(this.historyX[i], this.historyY[i], this.dx, this.dy, this.radie, this.color, this.glow));
  }
}*/

this.moveRelativeToMass = function() {
    this.dy = (this.dy/this.radie)*20;
    this.dx = (this.dx/this.radie)*20;
  }

  this.fade = function() {
    this.color = this.color.toString("");
    var start = this.color.lastIndexOf(", ");
    var end = this.color.lastIndexOf(")");
    this.minsk = this.minsk * 0.94;
    this.minsk = " " + this.minsk;
    var aArray = this.color.split("");
    aArray.splice(start, end - start, ",", " ", this.minsk);
    this.color = aArray.join("");
    this.minsk = parseFloat(this.minsk);

    if(this.minsk < 0.01) {
      explosionArray.splice(0, explosionArray.length);
      exploded = false;
    }
  }

  this.accelerate = function() {
    this.dx = this.dx*0.9;
    this.dy = this.dy*0.9;
    this.x += this.dx + hero.dx/1000;
    this.y += this.dy;

    this.historyX.push(this.x);
    this.historyY.push(this.y);

    if (this.historyX.length > 20) {
      this.historyX.splice(0, 1);
      this.historyY.splice(0, 1);
    }
  }

  this.update = function() {
  if (this.x > innerWidth + 200 || this.x < -200) {
      this.y = -200;
      this.x = Math.random() * (1.2*innerWidth);
      this.dx = this.dxSave;
    }
    if (this.y > innerHeight + 200) {
      this.y = -200;
      this.x = Math.random() * (1.2*innerWidth);
    }
    if (controller.up == true){
      if (this.dy <= this.dySave*2.7) {
      this.dy = this.dy*1.01;
      }
    }
    else if (controller.down == true){
      if (this.dy >= this.dySave/1.7) {
      this.dy = this.dy*0.99;
      }
    }
    else {
      this.dy = this.dySave;
      this.dx = this.dxSave;
    }
    if (controller.up == true && controller.down == true) {
      this.dy = this.dySave;
    }
    this.x += this.dx + hero.dx/1000;
    this.y += this.dy;
  }
}


function RandomfillStar(){
  var o = Math.round,
    r = Math.random(),
    s = 255;
  return 'rgba(' + o(r * s) + ',' + o(r * s) + ',' + o(r * s) + ',' + (r + 0.1).toFixed(1) + ')';
}

function moveRelativeToRadius(r, dy) {
  dy = (r*dy)/1.5;
  return dy;
  }

var starArray = [];
for (var i = 0; i < 50; i++) {
  var color = RandomfillStar();
  var radie = ((Math.random() * 2));
  var xC = Math.random() * (1.2*innerWidth);
  var yC = Math.random() * (1.2*innerHeight);
  var dxC = moveRelativeToRadius(radie, ((Math.random() - 0.5) * 0.01));
  var dyC = moveRelativeToRadius(radie, 15);
  var glow = starColors[Math.floor(Math.random() * starColors.length)];
  starArray.push(new Stars(xC, yC, dxC, dyC, radie, color, glow));
}

function updateBackground() {
  for (var i = 0; i < starArray.length; i++) {
    starArray[i].update();
    if(i < explosionArray.length) {
    explosionArray[i].accelerate();
    explosionArray[i].fade();
    }
  }
}

function drawBackground(){
  c.clearRect(0, 0, innerWidth, innerHeight);

  for (var i = 0; i < starArray.length; i++) {
    starArray[i].draw();
    if(i < explosionArray.length) {
    explosionArray[i].draw();
    explosionArray[i].fade();
    }
  }
}

function drawHealthBars(x, y, width, height, fraction, opacity) {
  if(opacity == undefined) opacity = 1;
  c.fillStyle = "red";
  c.globalAlpha = opacity;
  c.fillRect(x + width*fraction, y, width - width*fraction, height);
  c.fillStyle = "green";
  c.fillRect(x, y, width*fraction, height);
  c.globalAlpha = 1;
}

function plusOrMinus() {
  x = Math.random() < 0.5 ? -1 : 1;
  return x;
}

var explosionArray = [];

var particles = 0;
function explosion(x, y) {

    for (var i = 0; i < particles; i++) {
    var radie = ((Math.random() * 5) + 1);
    var color;
    if(radie > 4) {
      color = explosionColor1[Math.floor(Math.random() * explosionColor1.length)];
    }
    else if(radie > 2.5) {
      color = explosionColor2[Math.floor(Math.random() * explosionColor2.length)];
    }
    else {
      color = explosionColor3[Math.floor(Math.random() * explosionColor3.length)];
    }
    var glow = color;
    var dxC = plusOrMinus()*Math.random();
    var dyC = plusOrMinus()*Math.sqrt(1 - Math.pow(dxC, 2));
    explosionArray.push(new Stars(x, y, dxC, dyC, radie, color, glow));
    explosionArray[i].moveRelativeToMass();
    exploded = true;
  }
}
