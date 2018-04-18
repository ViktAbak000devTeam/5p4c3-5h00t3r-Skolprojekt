
var hero = new Object();

hero.x = window.innerWidth/2;
hero.y = window.innerHeight/2;
hero.w = 100;
hero.h = 100;
hero.movement = 500;
hero.angle = 0;
hero.img = document.getElementById("ship");
hero.crosshair = undefined;
hero.LaserSoundEffect = undefined;//skapar ett crosshair som foljer mouse position
hero.deathsound = undefined;
hero.cooldown = 0; //detta e en cooldown till skott/minut, 0 => farkosten kan skjuta
hero.maxHP = 100;
hero.HP = hero.maxHP;

hero.draw = function() {
 c.translate(hero.x, hero.y);
 c.rotate(this.angle - Math.PI/2);
 c.drawImage(this.img,-this.w/2,-this.h/2,this.w,this.h);
 c.rotate(-this.angle + Math.PI/2);
 c.translate(-hero.x, -hero.y);
}

hero.update = function(dt) {
 this.angle = Math.atan2(hero.y - mouse.y, hero.x - mouse.x);
 this.cooldown -= dt;
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
 this.draw();
}

hero.fire = function() {
 if(this.cooldown > 0) return;// cooldown > 0 => funktionen ej kan aktiveras
 var v = 1000;
 var dx = -Math.cos(this.angle);
 var dy = -Math.sin(this.angle);
 if(!this.LaserSoundEffect.paused) {
   this.LaserSoundEffect.currentTime = 0;
 }
 else {
   this.LaserSoundEffect.play();//DETTA SPELAR UPP LJUD TILL LASERORKESTRALEN
 }
 Sprites.push(new Skott(this.x+dx*this.h/2, this.y+dy*this.h/2, dx*v, dy*v));
 this.cooldown = 0.25; //when function is activated, cooldown is set to greater than 0 to cool down
}
// Lagger till hero i listan av sprites

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
