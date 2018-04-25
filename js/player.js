var hero = new Object();

hero.x = window.innerWidth / 2;
hero.y = window.innerHeight / 2;
hero.w = 100;
hero.h = 100;
hero.dy = 0;
hero.dx = 0;
hero.radius = 50;
hero.movement = 1500;
hero.angle = 0;
hero.img = document.getElementById("ship");
hero.crosshair = undefined;
hero.LaserSoundEffect = undefined; //skapar ett crosshair som foljer mouse position
hero.deathsound = undefined;
hero.cooldown = 0; //detta e en cooldown till skott/minut, 0 => farkosten kan skjuta
hero.maxHP = 100;
hero.HP = hero.maxHP;
hero.score = 0;

hero.draw = function() {
  c.translate(hero.x, hero.y);
  c.rotate(this.angle - Math.PI / 2);
  c.drawImage(this.img, -this.w / 2, -this.h / 2, this.w, this.h);
  c.rotate(-this.angle + Math.PI / 2);
  c.translate(-hero.x, -hero.y);
}

function clamp(min, max, value) {
  if (value < min) return min;
  if (value > max) return max;
  return value;
}

hero.update = function(dt) {
  this.angle = Math.atan2(hero.y - mouse.y, hero.x - mouse.x);
  this.cooldown -= dt;
  if (controller.up) {
    hero.dy -= hero.movement * dt;
  }
  if (controller.down) {
    hero.dy += hero.movement * dt;
  }
  if (controller.right) {
    hero.dx += hero.movement * dt;
  }
  if (controller.left) {
    hero.dx -= hero.movement * dt;
  }
  if (controller.space) {
    hero.fire();
  }
  if (controller.up == controller.down) {
    hero.dy -= hero.dy * dt * 2;
  }
  if (controller.right == controller.left) {
    hero.dx -= hero.dx * dt * 2;
  }
  hero.dy = clamp(-500, 500, hero.dy);
  hero.dx = clamp(-500, 500, hero.dx);
  hero.x += hero.dx * dt;
  hero.y += hero.dy * dt;
  if (this.HP <= 0) {
    //pausa spelet
    window.location.href = "http://www.6am-group.com/wp-content/uploads/2015/07/shaq-feat.jpg";
    controller.paused = true;
  }
  for (var i = Monster.length - 1; i >= 0; i--) {
    var DeltaHX = this.x - Monster[i].x;
    var DeltaHY = this.y - Monster[i].y;
    if (Math.sqrt(DeltaHX * DeltaHX + DeltaHY * DeltaHY) < Monster[i].radius + this.radius) {
      hero.takeDamage(15 * dt);
    }
  }
  if (boss != undefined) {
    var DeltaHX = this.x - boss.x;
    var DeltaHY = this.y - boss.y;
    if (Math.sqrt(DeltaHX * DeltaHX + DeltaHY * DeltaHY) < boss.radius + this.radius) {
      hero.takeDamage(15 * dt);
    }
  }
  ensureBounds(hero);
}

hero.fire = function() {
  if (this.cooldown > 0) return; // cooldown > 0 => funktionen ej kan aktiveras
  var v = 1000;
  var dx = -Math.cos(this.angle);
  var dy = -Math.sin(this.angle);
  if (!this.LaserSoundEffect.paused) {
    this.LaserSoundEffect.currentTime = 0;
  } else {
    this.LaserSoundEffect.play(); //DETTA SPELAR UPP LJUD TILL LASERORKESTRALEN
  }
  Sprites.push(new this.Skott(this.x + dx * this.h / 2, this.y + dy * this.h / 2, dx * v, dy * v));
  this.cooldown = 0.25; //when function is activated, cooldown is set to greater than 0 to cool down
}

hero.takeDamage = function(dmg) {
  hero.HP -= dmg;
}
// Lagger till hero i listan av sprites

function ensureBounds(sprite) {
  if (sprite.x < hero.w / 2) {
    sprite.x = sprite.w / 2;
    sprite.dx = 0;
  }
  if (sprite.y < hero.h / 2) {
    sprite.y = sprite.h / 2;
    sprite.dy = 0;
  }
  if (sprite.x + sprite.w / 2 > window.innerWidth) {
    sprite.x = window.innerWidth - sprite.w / 2;
    sprite.dx = 0;
  }
  if (sprite.y + sprite.h / 2 > window.innerHeight) {
    sprite.y = window.innerHeight - sprite.h / 2;
    sprite.dy = 0;
  }
}

hero.Skott = function(x, y, dx, dy) {
  this.x = x;
  this.y = y;
  this.dx = dx;
  this.dy = dy;
  this.angle = Math.atan2(-dy, -dx);
  var img = document.getElementById("skott");
  this.draw = function() {
    c.translate(this.x, this.y); //flyttar skotten till this.x, this.y
    c.rotate(this.angle - Math.PI / 2); //roterar skottet efter musens position
    c.drawImage(img, -30, -30, 60, 60);
    c.rotate(-this.angle + Math.PI / 2); //tillater att skottet roterar at andra hallet
    c.translate(-this.x, -this.y); //tillater en tillbakaflyttning
  }

  this.update = function(dt) {
    this.x += this.dx * dt;
    this.y += this.dy * dt;
    // Testa kollision
    for (var i = Monster.length - 1; i >= 0; i--) {
      var DeltaX = this.x - Monster[i].x;
      var DeltaY = this.y - Monster[i].y;
      if (Math.sqrt(DeltaX * DeltaX + DeltaY * DeltaY) < Monster[i].radius) {
        Monster[i].applyDamage(25);
        Sprites.splice(Sprites.indexOf(this), 1);
        if (Monster[i].HP <= 0) {
          hero.score += 100;
        }
      }
    }
    if (boss != undefined) {
      var DeltaX = this.x - boss.x;
      var DeltaY = this.y - boss.y;
      if (Math.sqrt(DeltaX * DeltaX + DeltaY * DeltaY) < boss.radius) {
        boss.applyDamage(25);
        Sprites.splice(Sprites.indexOf(this), 1);
        if (boss.HP <= 0) {
          hero.score += boss.score;
        }
      }
    }
    // Tar bort skott utanfor skarmen
    if (this.x < 0 || this.x > window.innerWidth ||
      this.y < 0 || this.y > window.innerHeight) {
      Sprites.splice(Sprites.indexOf(this), 1); //splicar ut elementet ur arrayen
    }
    //anropar draw
  }
}
