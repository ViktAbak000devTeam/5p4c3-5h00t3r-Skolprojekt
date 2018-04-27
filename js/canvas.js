//var canvas = document.querySelector('canvas');

var canvas = document.querySelector('canvas');
var c = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

//var c = canvas.getContext('2d');

var starColors = [
  'rgb(255, 214, 0)',
  'rgb(0, 255, 181)',
  'rgb(0, 79, 255)'
];

window.addEventListener('resize', function(){

  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
});//Denna resizar canvasen efter rutans storlek

function Stars(x, y, dx, dy, radie, color, glow) {
  this.x = x;
  this.y = y;
  this.dx = dx;
  this.dy = dy;
  this.dySave = dy;
  //this.dxSave = dx;
  this.radie = radie;
  this.color = color;
  this.glow = glow;

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

  this.update = function(speedFactor, slowFactor, controlUp, controlDown) {
    if (this.x > innerWidth + 200 || this.x < -200) {
      this.dx = -this.dx;
    }
    if (this.y > innerHeight + 200) {
      this.y = 0;
      this.x = Math.random() * (1.2*innerWidth);
    }
    if (controlUp == true){
      if (this.dy <= this.dySave*2.7) {
      this.dy = this.dy*speedFactor;
      }
      else {
      this.dy = this.dy*1;
      }
    }
    else if (controlDown == true){
      if (this.dy >= this.dySave/2.7) {
      this.dy = this.dy*slowFactor;
      }
      else {
      this.dy = this.dy*1;
      }
    }
    /*else if (controlLeft == true) {
      if (-this.dx <= -this.dxSave/2) {
        this.dx = -this.dx*speedFactor*200;
      }
      else {
        this.dx = this.dx*1;
      }
    }
    else if (controlRight == true) {
      if (this.dx <= this.dxSave/2) {
        this.dx = this.dx*speedFactor*200;
      }
      else {
        this.dx = this.dx*1;
      }
    }*/
    else {
      this.dy = this.dySave;
      /*this.dx = this.dxSave;*/
    }
    this.x += this.dx;
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
  dy = dyCChecker(dy);
  console.log(dy);
  dy = (r*dy)/1.5;
  return dy;
  }

function dyCChecker(dy) {
  var dyArray = dy.toString().split("");
  if (dyArray[0] === 0) {
    console.log(dyArray[0]);
    dyArray = dyArray.slice(0, 1);
  }
  return dyArray.join("");
}

var starArray = [];
for (var i = 0; i < 50; i++) {
  var color = RandomfillStar();
  var radie = ((Math.random() * 2 ));
  var xC = Math.random() * (1.2*innerWidth);
  var yC = Math.random() * (1.2*innerHeight);
  var dxC = (Math.random() * 0.01);
  var dyC = moveRelativeToRadius(radie, 15);
  var glow = starColors[Math.floor(Math.random() * starColors.length)];
//console.log(dyC + "dyC");
  starArray.push(new Stars(xC, yC, dxC, dyC, radie, color, glow));
}

function updateBackground(speedFactor, slowFactor, controlUp, controlDown) {
  this.speedFactor = speedFactor;
  this.slowFactor = slowFactor;
  this.controlUp = controlUp;
  this.controlDown = controlDown;


  for (var i = 0; i < starArray.length; i++) {
    starArray[i].update(this.speedFactor, this.slowFactor, this.controlUp, this.controlDown);
  }
}

function drawBackground(){
  c.clearRect(0, 0, innerWidth, innerHeight);
  for (var i = 0; i < starArray.length; i++) {
    starArray[i].draw();
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
