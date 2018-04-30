

var bossAtLevel = 5;

var enemyTypes = [
  {
    maxHP: 50,
    attackInterval: 0.8,
    imageID: "Enemyship",
    damage: 5,
    level: 0
  },
  {
    maxHP: 80,
    attackInterval: 0.6,
    imageID: "Enemyship2",
    damage: 5,
    level: 3
  },
  {
    maxHP: 100,
    attackInterval: 0.3,
    imageID: "Enemyship3",
    damage: 1,
    level: 7
  }
];



var boss = undefined;

var EnemySpawner = function() {
  this.time = 0;
  this.spawnRate = 4;
  this.cooldown = 0;
  this.score = 0;
  this.level = 0;
  this.biss = false;
  this.enemies = [];
  this.tick = function(dt) {
    this.level = Math.floor(this.score/400);
    this.spawnRate = (4*Math.pow(0.96, this.level));
    for(var i = 0; i < enemyTypes.length; i++) {
      if(enemyTypes[i].level <= this.level && !this.enemies.includes(i)) {
        this.enemies.push(i);
      }
    }
    var x = Math.random()*(canvas.width - 400);
    var y = Math.random()*canvas.height;

    if(this.level == bossAtLevel && !this.biss) {
      this.biss = true;
      music.pause();
      bossmusic1.play();
      boss = new Thonfors(x, -100, 60, 100);
      Sprites.push(boss);
      bossAtLevel+=10;
      }

    if(this.biss && boss.HP <= 0) {
      hero.HP = hero.maxHP;
      this.biss = false;
      bossmusic1.pause();
      music.play();
      boss = undefined;
    }
    if(this.biss) {
      return;
    }
    else if(this.cooldown <= 0) {
      // spawn new enemy
      this.spawnEnemy();
      this.cooldown = this.spawnRate;
    }
    else {
      this.cooldown -= dt;
    }
  }
  this.spawnEnemy = function() {
    var i = Math.floor(Math.random()*this.enemies.length);

    var x = Math.random()*canvas.width;
    if(x < 50){
      x = 50;
    }
    else if( x > canvas.width-50){
      x = canvas.width - 50;
    }
    var Fiende = new Fiender(x, -100, enemyTypes[i], 10, 70);
    Sprites.push(Fiende);
    Monster.push(Fiende);
  }

  this
}

var EnemySpawnRate = 0;
var spawner = new EnemySpawner();

function updateObjects(dt) {
  // Updaterar alla sprites
  spawner.score = hero.score;
  spawner.tick(dt);

  for(i = Sprites.length - 1; i >= 0; i--) {
    Sprites[i].update(dt);
  }
}

function drawSprites() {
  c.shadowBlur = 0;
  c.shadowColor = undefined;
  for(i = 0; i < Sprites.length; i++) {
    Sprites[i].draw();
  }
}

function init(){
  preload();
  LaserSoundEffect.volume = 0.2;
  bossmusic1.volume = 0.5;
  Sprites.push(hero);
  mouse.x = canvas.width/2;
  mouse.y = canvas.height/3;
  setPaused(false);
  window.requestAnimationFrame(loop);
}

function setPaused(v) {
  if(v) {
    music.pause();
    pausemusic.play();
    bossmusic1.pause();
    pausemusic.volume = 0.0;
    document.body.className = "paused";
  }
  else {
    if(boss != undefined){
      bossmusic1.play();
      document.body.className = "";
    }
    else{
      music.play();
      music.volume = 0.5;
      pausemusic.pause();
      document.body.className = "";
    }
  }
}

function gameOver(v) {
  if (v) {
    ESCAPE_KEY = undefined;
    Sprites.splice(0, Sprites.length);
    controller.paused = true;
    music.pause();
    BossExplosion.volume = 0.5;
    BossExplosion.play();
    GameOver.volume = 0.9;
    GameOver.play();
  }
}

var t0 = 0;
var time = 0;
var scoreCooldown = 0;
function loop(t) {
  var dt = (t - t0)/1000;
  time += dt;
  if(!controller.paused) {
    updateBackground();
    updateObjects(dt);
    scoreCooldown -= dt;
    if(scoreCooldown <= 0) {
      hero.score += 1;
      scoreCooldown = 0.3;
    }
  }

  drawBackground();
  drawSprites();
  t0 = t;
  drawUI();
  window.requestAnimationFrame(loop);
}
