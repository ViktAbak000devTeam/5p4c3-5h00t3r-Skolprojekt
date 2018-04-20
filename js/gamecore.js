

var levels = {
  10 : {
    spawnRate: 4,
  },
  50 : {
    spawnRate: 2,
  },
};

var EnemySpawnRate = 0;
function updateObjects(dt) {
  // Updaterar alla sprites
  var x = Math.random()*canvas.width;
  if(x < 50){
    x = 50;
  }
  else if( x > canvas.width-50){
    x = canvas.width - 50;
  }
  if(EnemySpawnRate <= 0){
    var Fiende = new Fiender(x, -100, 10, 1);
    Sprites.push(Fiende);
    Monster.push(Fiende);
    EnemySpawnRate = 4;
  }
  EnemySpawnRate -= dt;
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
  music.play();
  pausemusic.play();
  Sprites.push(hero);
  mouse.x = canvas.width/2;
  mouse.y = canvas.height/3;
  window.requestAnimationFrame(loop);
}

var t0 = 0;
var time = 0;
function loop(t) {
  var dt = (t - t0)/1000;
  time += dt;
  if(!controller.paused) {
    updateBackground();
    updateObjects(dt);
    hero.score += 1;
    music.play();
    music.volume = 0.5;
    pausemusic.pause();
  }
  else{
    music.pause();
    pausemusic.play();
    pausemusic.volume = 0;
  }
  drawBackground();
  drawSprites();
  t0 = t;
  drawUI();
  window.requestAnimationFrame(loop);
}
