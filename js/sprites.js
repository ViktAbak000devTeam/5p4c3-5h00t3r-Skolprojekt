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
      Sprites.splice(Sprites.indexOf(this), 1);
    }
    else if(this.HP <= 0){
      Monster.splice(Monster.indexOf(this), 1);
      Sprites.splice(Sprites.indexOf(this), 1);
      pickDeadSound();
      particles = 200;
      explosion(this.x, this.y,((Math.random() * 5) + 1));
    }

    this.cooldown-=dt;
    this.fire();
  }
  this.applyDamage = function(damage){
    this.HP -= damage;
  }
  this.fire = function(){
    if(this.cooldown > 0) return;// cooldown > 0 => funktion cannot activate
    var v = 1000;
    console.log(this.x);
    var dx = -Math.cos(this.angle);
    var dy = -Math.sin(this.angle);
    Sprites.push(new this.Skott(this.x+dx*this.radius, this.y+dy*this.radius, dx*v, dy*v, this.type.damage));
    this.cooldown = this.type.attackInterval; //when function is activated, cooldown is set to greater than 0 to cool down
   }

   // Enemy bullet constructor. Works exactly like hero.skott, however with minor
   //adjustments.
   this.Skott = function(x,y,dx,dy,damage) {
     this.x = x;
     this.y = y;
     this.dx = dx;
     this.dy = dy;
     this.damage = damage;
     this.angle = Math.atan2(-dy, -dx);
     var img = document.getElementById("fiendeskott");
     this.draw = function() {
       c.translate(this.x, this.y);
       c.rotate(this.angle - Math.PI/2);
       c.drawImage(img,-30,-30,60,60);
       c.rotate(-this.angle + Math.PI/2);
       c.translate(-this.x, -this.y);
     }

     this.update = function(dt) {
       this.x += this.dx*dt;
       this.y += this.dy*dt;
       //Tests collision
       var DeltaX = this.x - hero.x;
       var DeltaY = this.y - hero.y;
       if(Math.sqrt(DeltaX*DeltaX + DeltaY*DeltaY) < hero.radius){
           hero.takeDamage(this.damage);
           Sprites.splice(Sprites.indexOf(this), 1);
         }
       // removes bullets from screen when outside of canvas.
       if(this.x < 0 || this.x > window.innerWidth
       || this.y < 0 || this.y > window.innerHeight) {
         Sprites.splice(Sprites.indexOf(this), 1);
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
  this.cooldown = 0;
  this.damage = 8;
  this.angle = 0;
  this.HP = this.maxHP;
  var img = document.getElementById("BigWheel");//loads bossimage
  this.draw = function(){
    c.drawImage(img,
      Math.floor(this.x-this.radius),
      Math.floor(this.y-this.radius),
      2*this.radius,
      2*this.radius);
    drawHealthBars(this.x-100, this.y-this.radius - 15, 200, 20, this.HP/this.maxHP);
  }
  this.update = function(dt){

    if(this.HP <= 0){
      particles = 600;
      BossExplosion.volume = 1;
      BossExplosion.play();
      explosion(this.x+20, this.y+20);
      explosion(this.x-20, this.y-20);
      explosion(this.x, this.y);
      Sprites.splice(Sprites.indexOf(this), 1);
    }
    if(this.y - this.radius > 0){
      this.x += this.dx*dt;
      this.y += this.dy*dt;

        if(this.x+this.radius >= canvas.width || this.x-this.radius <= 0){
          this.dx = -this.dx;
        }
        if(this.y+this.radius >= canvas.height || this.y-this.radius<= 0){
          this.dy = -this.dy;
        }
      }
      else{
      this.x += this.dx*dt;
      this.y += this.dy*dt;
      }
    this.cooldown -= dt;
    this.angle += dt*Math.PI;
      if(this.angle >= 2*Math.PI) {
        this.angle -= 2*Math.PI;
      }
    this.fire();
    this.draw();
    }
    this.applyDamage = function(dmg){
      this.HP -= dmg;
    }
    this.fire = function(){
      if(this.cooldown > 0) return;// cooldown > 0 => function cannot activate
      var v = 1000;
      if (!bossLaser.paused) {
        bossLaser.currentTime = 0;
      } else {
        bossLaser.play();
      }
      for(var angle = 0; angle < 2*Math.PI; angle += Math.PI/10) {
        var dx = -Math.cos(angle+this.angle);
        var dy = -Math.sin(angle+this.angle);
        Sprites.push(new this.Skott(this.x+dx*this.radius, this.y+dy*this.radius, dx*v, dy*v, this.damage));
      }
      this.cooldown = this.HP/this.maxHP + 0.2; //when function is activated, cooldown is set to greater than 0 to cool down
    }
    this.Skott = function(x,y,dx,dy,damage) {
      this.x = x;
      this.y = y;
      this.dx = dx;
      this.dy = dy;
      this.damage = damage;
      this.angle = Math.atan2(-dy, -dx);
      var img = document.getElementById("fiendeskott");
      this.draw = function() {
        c.translate(this.x, this.y);
        c.rotate(this.angle - Math.PI/2);
        c.drawImage(img,-50,-50,100,100);
        c.rotate(-this.angle + Math.PI/2);
        c.translate(-this.x, -this.y);
      }

      this.update = function(dt) {
        this.x += this.dx*dt;
        this.y += this.dy*dt;
        var DeltaX = this.x - hero.x;
        var DeltaY = this.y - hero.y;
        if(Math.sqrt(DeltaX*DeltaX + DeltaY*DeltaY) < hero.radius){
          hero.takeDamage(this.damage);
          Sprites.splice(Sprites.indexOf(this), 1);
        }
        if(this.x < 0 || this.x > window.innerWidth
          || this.y < 0 || this.y > window.innerHeight) {
          Sprites.splice(Sprites.indexOf(this), 1);
        }
      }
    }
}
