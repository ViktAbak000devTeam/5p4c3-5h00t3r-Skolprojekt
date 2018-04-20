var Sprites = [];
var Monster = [];
var EnemySprites = [
  document.getElementById("Enemyship"),
  document.getElementById("Enemyship2"),
  document.getElementById("Enemyship3")
]

var EnemyLaserBeamsSoundEffect = undefined;

function Fiender(x, y, dx, dy) {
  this.x = x;
  this.y = y;
  this.dx = dx;
  this.dy = dy;
  this.maxHP = 100;
  this.HP = this.maxHP;
  this.cooldown = 0;
  this.angle = 0;
  this.sprite = Math.floor(Math.random()*EnemySprites.length);
  this.radius = EnemySprites[this.sprite].width/9;
  this.draw = function(){
    c.drawImage(EnemySprites[this.sprite],
      this.x-EnemySprites[this.sprite].width/8,
      this.y-EnemySprites[this.sprite].height/8,
      EnemySprites[this.sprite].width/4,
      EnemySprites[this.sprite].height/4);
    drawHealthBars(this.x-50, this.y-65, 100, 10, this.HP/this.maxHP);
  }
  this.update = function(dt){
    this.y += this.dy;
    this.angle = Math.atan2(this.y - hero.y, this.x - hero.x);
    if(this.y - 75 > canvas.height){
      Monster.splice(Monster.indexOf(this), 1);
      Sprites.splice(Sprites.indexOf(this), 1);
    }
    else if(this.HP <= 0){
      Monster.splice(Monster.indexOf(this), 1);
      Sprites.splice(Sprites.indexOf(this), 1);
      hero.deathsound.play();
    }
    this.cooldown-=dt;
    this.fire();
  }
  this.applyDamage = function(damage){
    this.HP -= damage;
  }
  this.fire = function(){
    if(this.cooldown > 0) return;// cooldown > 0 => funktionen ej kan aktiveras
    var v = 1000;
    console.log(this.x);
    var dx = -Math.cos(this.angle);
    var dy = -Math.sin(this.angle);
    Sprites.push(new this.Skott(this.x+dx*this.radius, this.y+dy*this.radius, dx*v, dy*v));
    this.cooldown = 0.85; //when function is activated, cooldown is set to greater than 0 to cool down
   }

   // Fiendens skott
   this.Skott = function(x,y,dx,dy) {
     this.x = x;
     this.y = y;
     this.dx = dx;
     this.dy = dy;
     this.angle = Math.atan2(-dy, -dx);
     var img = document.getElementById("fiendeskott");
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
       var DeltaX = this.x - hero.x;
       var DeltaY = this.y - hero.y;
       if(Math.sqrt(DeltaX*DeltaX + DeltaY*DeltaY) < hero.radius){
           hero.takeDamage(5);
           Sprites.splice(Sprites.indexOf(this), 1);
       }
       // Tar bort skott utanfor skarmen
       if(this.x < 0 || this.x > window.innerWidth
       || this.y < 0 || this.y > window.innerHeight) {
         Sprites.splice(Sprites.indexOf(this), 1);//splicar ut elementet ur arrayen
       }
    }
  }
}

/*
 *
 */

function drawHealthBars(x, y, width, height, fraction, opacity) {
  if(opacity == undefined) opacity = 1;
  c.fillStyle = "red";
  c.globalAlpha = opacity;
  c.fillRect(x + width*fraction, y, width - width*fraction, height);
  c.fillStyle = "green";
  c.fillRect(x, y, width*fraction, height);
  c.globalAlpha = 1;
}
