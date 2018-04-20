
function pad(n, width, z) {
  z = z || '0';
  n = n + '';
  return n.length >= width ? n : new Array(width - n.length + 1).join(z) + n;
}

function drawUI(){
  c.font = "30px Comic Sans MS";
  c.fillStyle = "white";
  c.fillText(pad(hero.score, 6),canvas.width - 150,canvas.height-30);

  c.drawImage(this.crosshair,mouse.x-25, mouse.y-25, 50, 50);

  drawHealthBars(30, canvas.height-50, 250, 25, hero.HP/hero.maxHP, 0.4);

  if(controller.paused){
    
  }

}
