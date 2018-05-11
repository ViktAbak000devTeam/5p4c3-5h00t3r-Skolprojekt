
function pad(n, width, z) {
  z = z || '0';
  n = n + '';
  return n.length >= width ? n : new Array(width - n.length + 1).join(z) + n;
}

function drawUI(){
  c.font = "bold 25px Lucida Console, Monaco, monospace";
  c.fillStyle = "rgb(255, 184, 0)";
  c.fillText(pad(hero.score, 6),canvas.width - 150,canvas.height-30);

  c.beginPath();
  c.font = "bold 25px Lucida Console, Monaco, monospace";
  c.fillStyle = "rgb(255, 184, 0)";
  c.fillText(pad("Ammo: " + hero.ammo + "/" + hero.fullAmmo, 2),canvas.width - 400,canvas.height-30);

  drawHealthBars(30, canvas.height-50, 250, 25, hero.HP/hero.maxHP, 0.4);

  if(!controller.paused){
    c.drawImage(hero.crosshair,mouse.x-25, mouse.y-25, 50, 50);
  }
}
