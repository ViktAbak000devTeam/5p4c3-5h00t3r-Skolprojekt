
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
  c.shadowBlur = 0;
  c.shadowColor = undefined;
  for(i = Sprites.length - 1; i >= 0; i--) {
    Sprites[i].update(dt);
  }
}

var t0 = 0;
function loop(t) {
  var dt = (t - t0)/1000;
  drawBackground();
  updateObjects(dt);
  t0 = t;
  score++;
  drawUI();
  window.requestAnimationFrame(loop);
}

function init(){
  hero.LaserSoundEffect = document.getElementById("LaserSound");
  hero.crosshair = document.getElementById("crosshair");
  Sprites.push(hero);
  mouse.x = canvas.width/2;
  mouse.y = canvas.height/3;
  window.requestAnimationFrame(loop);
}
