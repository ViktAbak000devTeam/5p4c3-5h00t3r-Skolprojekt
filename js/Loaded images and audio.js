var music;
var pausemusic;
var bossmusic1;
var LaserSoundEffect;
var EnemyLaserBeamsSoundEffect;
var Asteroid;
var ReloadSound;
var bossLaser;
var hitsound;

function preload(){
  LaserSoundEffect = document.getElementById("LaserSound");
  EnemyLaserBeamsSoundEffect = document.getElementById("EnemyLaserSound");
  hero.crosshair = document.getElementById("crosshair");
  hero.deathsound = document.getElementById("DeathSound");
  music = document.getElementById("BackgroundMusic");
  pausemusic = document.getElementById("PauseMusic");
  bossmusic1 = document.getElementById("bossmusic1");
  boom = document.getElementById("boom");
  chrash3 = document.getElementById("chrash3");
  turn = document.getElementById("turn");
  Asteroid = document.getElementById("Asteroid");
  ReloadSound = document.getElementById("reloadSound");
  bossLaser = document.getElementById("BossLaser");
  hitsound = document.getElementById("HitSound");
}

var deadSoundArray = [
  boom,
  //LargeChrash
  chrash3
];

function pickDeadSound() {
  var selected = deadSoundArray[Math.floor(Math.random() * deadSoundArray.length)];
  selected.play();
}
