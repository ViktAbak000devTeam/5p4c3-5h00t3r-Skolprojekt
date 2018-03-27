var canvas = document.querySelector('canvas');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

var c = canvas.getContext('2d');

function Circle(x, y, dx, dy, radie, color) {
  this.x = x;
  this.y = y;
  this.dx = dx;
  this.dy = dy;
  this.radie = radie;
  this.color = color;

  this.draw = function() {
    c.beginPath();
    c.arc(this.x, this.y, this.radie, 0, Math.PI * 2, false);
    c.strokeStyle = this.color;
    c.stroke();
    c.fillStyle = this.color;
    c.fill();
  }

  this.update = function() {
    if (this.x > innerWidth + 200 || this.x < -200) {
      this.dx = -this.dx;
    }
    if (this.y > innerHeight + 200 || this.y < -200) {
      this.dy = -this.dy;
    }
    this.x += this.dx;
    this.y += this.dy;

    this.draw();
  }
}

function RandomfillStar(){
  var o = Math.round,
    r = Math.random(),
    s = 255;
  return 'rgba(' + o(r * s) + ',' + o(r * s) + ',' + o(r * s) + ',' + (r + 0.1).toFixed(1) + ')';
}

var circleArray = [];

for (var i = 0; i < 200; i++) {
  var color = RandomfillStar();
  var radie = ((Math.random() * 2) + 0.5);
  var xC = Math.random() * (1.2*innerWidth);
  var yC = Math.random() * (1.2*innerHeight);
  var dxC = (Math.random() * 0.01);
  var dyC = (Math.random() - 0.5) * 0.05;

  circleArray.push(new Circle(xC, yC, dxC, dyC, radie, color));
}

function animate() {
  requestAnimationFrame(animate);
  c.clearRect(0, 0, innerWidth, innerHeight);

  for (var i = 0; i < circleArray.length; i++) {
    circleArray[i].update();
  }
}
animate();
