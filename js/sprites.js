var Sprites = [];
var Monster = [];

function Fiender(x, y, dx, dy){
  this.x = x;
  this.y = y;
  this.dx = dx;
  this.dy = dy;
  this.radius = 60;
  this.maxHP = 100;
  this.HP = this.maxHP;
  this.erik = document.getElementById("Erik");
  this.draw = function(){
    c.drawImage(this.erik,this.x-50, this.y-50, 100, 100);
    drawHealthBars(this.x-50, this.y-65, 100, 10, this.HP/this.maxHP);
  }
  this.update = function(){
    this.y += this.dy;
    if(this.y - 75 > canvas.height || this.HP <= 0){
      Monster.splice(Monster.indexOf(this), 1);
      Sprites.splice(Sprites.indexOf(this), 1);
    }
    this.draw();
  }
  this.applyDamage = function(damage){
    this.HP -= damage;
  }
}

/*
 *
 */

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
        if(Monster[i].HP <= 0){
          score += 100;
        }
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

function drawHealthBars(x, y, width, height, fraction, opacity) {
  if(opacity == undefined) opacity = 1;
  c.fillStyle = "red";
  c.globalAlpha = opacity;
  c.fillRect(x + width*fraction, y, width - width*fraction, height);
  c.fillStyle = "green";
  c.fillRect(x, y, width*fraction, height);
  c.globalAlpha = 1;
}
