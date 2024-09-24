var ctx = document.getElementById("canvas").getContext("2d");

const WIDTH = 450;
const HEIGHT = 450;

const SPACING = 150;

var board = [
  ['','',''],
  ['','',''],
  ['','','']];
var player = 'O';
var gameFinished = false;

getCursorPosition = function (canvas, event) {
    const rect = canvas.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    onClick(x, y);
}

const canvas = document.querySelector('canvas')
canvas.addEventListener('mousedown', function(e) {
    getCursorPosition(canvas, e);
})

setup = function () {
  ctx.clearRect(0,0,WIDTH,HEIGHT);
  board = [
    ['','',''],
    ['','',''],
    ['','','']];
  player = 'O';
  gameFinished = false;
  ctx.font = "150px Arial";
  ctx.fillStyle = "#000000";
  ctx.fillRect(SPACING,0,10,SPACING*3);
  ctx.fillRect(SPACING*2,0,10,SPACING*3);
  ctx.fillRect(0,SPACING,SPACING*3,10);
  ctx.fillRect(0,SPACING*2,SPACING*3,10);
  ctx.fillStyle = "#FFFFFF";
}

onClick = function (mouseX, mouseY) {
  if (gameFinished){
    setup();
    return;
  }

  let x = Math.floor(mouseX/150);
  let y = Math.floor(mouseY/150);

  if (board[y][x] == '') {
    board[y][x] = player;

    switch (player) {
      case 'O':
        ctx.fillText(player, (x * 150) + 20, ((y+1) * 150) - 15);
        winState = checkWin('O');
        if (winState >= 0){
          win('O', winState);
        }
        player = 'X';
        break;
      case 'X':
        ctx.fillText(player, (x * 150) + 30, ((y+1) * 150) - 15);
        winState = checkWin('X');
        if (winState >= 0){
          win('X', winState);
        }
        player = 'O';
        break;
    }
  }
}

win = function (winner, winState) {
  switch (winState) {
    case 0:
      ctx.fillRect(75,5,10,440);
      break;
    case 1:
      ctx.fillRect(225,5,10,440);
      break;
    case 2:
      ctx.fillRect(375,5,10,440);
      break;
    case 3:
      ctx.fillRect(5,75,440,10);
      break;
    case 4:
      ctx.fillRect(5,225,440,10);
      break;
    case 5:
      ctx.fillRect(5,375,440,10);
      break;
    case 6:
      drawRotatedRect(225,-70,10,590, -45);
      break;
    case 7:
      drawRotatedRect(225,-70,10,590, 45);
      break;
  }

  gameFinished = true;
}

checkWin = function(player) {
  if (board[0][0] == player && board[1][0] == player && board[2][0] == player) return 0;
  if (board[0][1] == player && board[1][1] == player && board[2][1] == player) return 1;
  if (board[0][2] == player && board[1][2] == player && board[2][2] == player) return 2;
  if (board[0][0] == player && board[0][1] == player && board[0][2] == player) return 3;
  if (board[1][0] == player && board[1][1] == player && board[1][2] == player) return 4;
  if (board[2][0] == player && board[2][1] == player && board[2][2] == player) return 5;
  if (board[0][0] == player && board[1][1] == player && board[2][2] == player) return 6;
  if (board[2][0] == player && board[1][1] == player && board[0][2] == player) return 7;

  if (board[0][0] != '' &&
  board[0][1] != '' &&
  board[0][2] != '' &&
  board[1][0] != '' &&
  board[1][1] != '' &&
  board[1][2] != '' &&
  board[2][0] != '' &&
  board[2][1] != '' &&
  board[2][2] != '') gameFinished = true;

  return -1;
}

drawRotatedRect = function (x,y,width,height,degrees){

        // first save the untranslated/unrotated context
        ctx.save();

        ctx.beginPath();
        // move the rotation point to the center of the rect
        ctx.translate( x+width/2, y+height/2 );
        // rotate the rect
        ctx.rotate(degrees*Math.PI/180);

        // draw the rect on the transformed context
        // Note: after transforming [0,0] is visually [x,y]
        //       so the rect needs to be offset accordingly when drawn
        ctx.rect( -width/2, -height/2, width,height);

        ctx.fill();

        // restore the context to its untranslated/unrotated state
        ctx.restore();

    }

setup();
