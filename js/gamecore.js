
var enemyTypes = [
  {
    maxHP: 50,
    attackInterval: 0.8,
    imageID: "Enemyship",
    damage: 5,
    level: 0
  },
  {
    maxHP: 100,
    attackInterval: 0.6,
    imageID: "Enemyship2",
    damage: 5,
    level: 1
  },
  {
    maxHP: 150,
    attackInterval: 0.4,
    imageID: "Enemyship3",
    damage: 10,
    level: 3
  }
];

var EnemySpawner = function() {
  this.time = 0;
  this.spawnRate = 4;
  this.cooldown = 0;
  this.score = 0;
  this.level = 0;
  this.enemies = [];
  this.tick = function(dt) {
    this.level = Math.floor(this.score/400);
    this.spawnRate = 4*Math.pow(0.9,this.level);
    for(var i = 0; i < enemyTypes.length; i++) {
      if(enemyTypes[i].level <= this.level && !this.enemies.includes(i)) {
        this.enemies.push(i);
      }
    }
    if(this.cooldown <= 0) {
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
    var Fiende = new Fiender(x, -100, enemyTypes[i], 10, 1);
    Sprites.push(Fiende);
    Monster.push(Fiende);
  }
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

var music;
var pausemusic;
function init(){
  hero.LaserSoundEffect = document.getElementById("LaserSound");
  hero.LaserSoundEffect.volume = 0.2;
  EnemyLaserBeamsSoundEffect = document.getElementById("EnemyLaserSound");
  hero.crosshair = document.getElementById("crosshair");
  hero.deathsound = document.getElementById("DeathSound");
  music = document.getElementById("BackgroundMusic");
  pausemusic = document.getElementById("PauseMusic");
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
    pausemusic.volume = 0.0;
    document.body.className = "paused";
  }
  else {
    music.play();
    music.volume = 0.5;
    pausemusic.pause();
    document.body.className = "";
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
