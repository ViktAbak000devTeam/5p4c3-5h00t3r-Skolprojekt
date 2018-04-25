var Sprites = [];
var Monster = [];
var EnemySprites = [
  document.getElementById("Enemyship"),
  document.getElementById("Enemyship2"),
  document.getElementById("Enemyship3")
];

var EnemyLaserBeamsSoundEffect = undefined;

function Fiender(x, y, type, dx, dy) {
  this.x = x;
  this.y = y;
  this.dx = dx;
  this.dy = dy;
  this.type = type;
  this.HP = this.type.maxHP;
  this.cooldown = 0;
  this.angle = 0;
  //this.sprite = Math.floor(Math.random()*EnemySprites.length);
  var img = document.getElementById(this.type.imageID);
  this.radius = img.width/9;
  this.draw = function(){
    c.drawImage(img,
      Math.floor(this.x-img.width/8),
      Math.floor(this.y-img.height/8),
      img.width/4,
      img.height/4);
    drawHealthBars(this.x-50, this.y-65, 100, 10, this.HP/this.type.maxHP);
  }
  this.update = function(dt){
    this.y += this.dy*dt;
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
    Sprites.push(new this.Skott(this.x+dx*this.radius, this.y+dy*this.radius, dx*v, dy*v, this.type.damage));
    this.cooldown = this.type.attackInterval; //when function is activated, cooldown is set to greater than 0 to cool down
   }

   // Fiendens skott
   this.Skott = function(x,y,dx,dy,damage) {
     this.x = x;
     this.y = y;
     this.dx = dx;
     this.dy = dy;
     this.damage = damage;
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
           hero.takeDamage(this.damage);
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
function Thonfors(x, y, dx, dy){
  this.x = x;
  this.y = y;
  this.dx = dx;
  this.dy = dy;
  this.maxHP = 500;
  this.radius = 100;
  this.score = 1000;
  this.HP = this.maxHP;
  var img = document.getElementById("Thonfors");//loada Bilder
  this.draw = function(){
    c.drawImage(img,
      Math.floor(this.x-this.radius),
      Math.floor(this.y-this.radius),
      2*this.radius,
      2*this.radius);
      c.fillStyle = "red";
      c.globalAlpha = 1 - (this.HP/this.maxHP);
      c.fillRect(
        Math.floor(this.x-this.radius),
        Math.floor(this.y-this.radius),
        2*this.radius,
        2*this.radius);
      c.globalAlpha = 1;
    drawHealthBars(this.x-50, this.y-this.radius - 15, 100, 10, this.HP/this.maxHP);
  }
  this.update = function(dt){
    this.x += this.dx*dt;
    this.y += this.dy*dt;

    if(this.HP <= 0){
      Sprites.splice(Sprites.indexOf(this), 1);
      hero.deathsound.play();
    }
  }
  this.applyDamage = function(dmg){
    this.HP -= dmg;
  }
}
