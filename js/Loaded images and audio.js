var music;
var pausemusic;
var bossmusic1;
var LaserSoundEffect;
var EnemyLaserBeamsSoundEffect;

function preload(){
  LaserSoundEffect = document.getElementById("LaserSound");
  EnemyLaserBeamsSoundEffect = document.getElementById("EnemyLaserSound");
  hero.crosshair = document.getElementById("crosshair");
  hero.deathsound = document.getElementById("DeathSound");
  music = document.getElementById("BackgroundMusic");
  pausemusic = document.getElementById("PauseMusic");
  bossmusic1 = document.getElementById("bossmusic1");
}
