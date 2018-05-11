

var bossAtLevel = 5;

/*
* this array contains the different enemytypes that can spawn. The "level" attribute is what determines when
* the specific type can spawn. "level" relies on the "score"-variable.
*/

var enemyTypes = [
  {
    maxHP: 50,
    attackInterval: 0.8,
    imageID: "Enemyship",
    damage: 5,
    level: 0
  },
  {
    maxHP: 75,
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



var boss = undefined; //this variable is essential for the boss spawning in

/*
*
*/

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
      else if(enemyTypes[i].level > this.level && this.enemies.includes(i)) {
        this.enemies.splice(this.enemies[i], this.enemies.length-1);
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
    var dx = Math.random();
    if(dx > 0.5){
      dx = -dx/2
    }
    if(x < 50){
      x = 50;
    }
    else if( x > canvas.width-50){
      x = canvas.width - 50;
    }
    var Fiende = new Fiender(x, -100, enemyTypes[i], 10, 70);
    Sprites.push(Fiende);
    Monster.push(Fiende);
    var asteroidSpawnRate = Math.random()*100;
    var Asteroider = new Asteroids(x, -Asteroid.height, dx, 0.5, Asteroid.width, Asteroid.height, Math.floor((Asteroid.width*2)/3));
    if(Math.floor(asteroidSpawnRate) >=95){
      Sprites.push(Asteroider);
      Monster.push(Asteroider);
    }
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

function init(){
  preload();
  loadKeys();
  LaserSoundEffect.volume = 0.2;
  bossmusic1.volume = 0.5;
  boom.volume = 0.15;
  //LargeChrash.volume = 0.3;
  chrash3.volume = 0.2;
  Sprites.push(hero);
  mouse.x = canvas.width/2;
  mouse.y = canvas.height/3;
  hero.HP = hero.maxHP;
  hero.score = 0;
  hero.x = canvas.width/2;
  hero.y = canvas.height*2/3;
  music.currentTime = 0;
  setPaused(false);
  music.loop = true;
  window.requestAnimationFrame(loop);
}

function setPaused(v) {
  controller.paused = v;
  if(v) {
    music.pause();
    pausemusic.play();
    bossmusic1.pause();
    pausemusic.volume = 0.0;
    document.body.className = "paused";
  }
  else {
    pausemusic.pause();
    if(boss != undefined){
      bossmusic1.play();
      document.body.className = "";
    }
    else{
      music.play();
      music.volume = 0.5;
      document.body.className = "";
    }
  }
}

function gameOver() {
  controller.playing = false;
  ESCAPE_KEY = undefined;
  backgroundLoop();
  Sprites.splice(0, Sprites.length);
  Monster.splice(0, Monster.length);
  music.pause();
  bossmusic1.pause();
  BossExplosion.volume = 0.5;
  BossExplosion.play();
  GameOver.volume = 0.9;
  GameOver.play();
  document.body.className = "gameover";
}

function goToMainMenu() {
  document.body.className = "notplaying";
}

function startGame() {
  controller.playing = true;
  document.body.className = "";
  init();
}

var t0 = 0;
function backgroundLoop(t) {
  t0 = t;
  updateBackground();
  drawBackground();
  if(!controller.playing) {
    window.requestAnimationFrame(backgroundLoop);
  }// valkommenterad kod
}

var time = 0;
var scoreCooldown = 0;
function loop(t) {
  var dt = (t - t0)/1000;
  time += dt;
  if(!controller.paused) {
    updateObjects(dt);
    scoreCooldown -= dt;
    if(scoreCooldown <= 0) {
      hero.score += 1;
      scoreCooldown = 0.3;
    }
  }
  updateBackground();
  drawBackground();
  drawSprites();
  t0 = t;
  drawUI();
  if(controller.playing) {
    window.requestAnimationFrame(loop);
  }
  // if the game is over, don't call this loop again.
}
