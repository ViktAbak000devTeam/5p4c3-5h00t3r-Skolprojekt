/*
* This function is essential for the score meter and the ammo meter down in the
* bottom right corner. It allows for 6 zeroes to be drawn and for them to be updated
* at a specified interval.
*/
function pad(n, width, z) {
  z = z || '0';
  n = n + '';
  return n.length >= width ? n : new Array(width - n.length + 1).join(z) + n;
}

/*
* This function draws the UI, which includes the scoremeter, the ammometer, the
* player's HP-bar and the crosshair of the mouse.
*/
function drawUI(){
  c.font = "30px Arcade";
  c.fillStyle = "white";
  c.fillText(pad(hero.score, 6),canvas.width - 150,canvas.height-30);
  //draws the scoremeter

  c.beginPath();
  c.font = "30px Arcade";
  c.fillStyle = "white";
  c.fillText(pad("Ammo: " + hero.ammo + "/" + hero.fullAmmo, 2),canvas.width - 400,canvas.height-30);
  //draws the ammo-meter

  drawHealthBars(30, canvas.height-50, 250, 25, hero.HP/hero.maxHP, 0.4);
  //draws the player's healtbar

  if(!controller.paused){
    c.drawImage(hero.crosshair,mouse.x-25, mouse.y-25, 50, 50);
  }
  //this if-statement draws the crosshair if the game is not paused.
}
