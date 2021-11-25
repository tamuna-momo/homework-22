const canvas = document.querySelector('#canvas');
const context = canvas.getContext('2d');




const squareSize = 50;
const targetSize = 20;
const moveSpeed = 1;
// let gameTime = 30;

let squareX = 50;
let squareY = 100;

let targetX = 0;
let targetY = 0;

let up = false;
let down = false;
let right = false;
let left = false;


var timeleft = 30;
var downloadTimer = setInterval(function(){
  if(timeleft <= 0){
    clearInterval(downloadTimer);
    document.getElementById("countdown").innerHTML = "Finished";
  } else {
    document.getElementById("countdown").innerHTML = timeleft + " seconds remaining";
  }
  timeleft -= 1;
}, 1000);

function startGame() {
  moveTarget();
  draw();
  moveSquare();
  document.addEventListener('keydown', e => {
    if (e.key === 'ArrowUp') {
      up = true;
    }
    if (e.key === 'ArrowDown') {
      down = true;
    }
    if (e.key === 'ArrowRight') {
      right = true;
    }
    if (e.key === 'ArrowLeft') {
      left = true;
    }
    console.log('keydown', e.key);
    // moveSquare();
  });
  document.addEventListener('keyup', e => {
    if (e.key === 'ArrowUp') {
      up = false;
    }
    if (e.key === 'ArrowDown') {
      down = false;
    }
    if (e.key === 'ArrowRight') {
      right = false;
    }
    if (e.key === 'ArrowLeft') {
      left = false;
    }
    console.log('keyup', e.key);
  });
}

startGame();

function draw() {
  resetCanvas();
  // Big square
  context.fillStyle = 'red';
  context.fillRect(squareX, squareY, squareSize, squareSize);
  // Small square
  context.fillStyle = 'green';
  context.fillRect(targetX, targetY, targetSize, targetSize);
}

function moveSquare() {
  if (up) {
    squareY -= moveSpeed;
  }
  if (down) {
    squareY += moveSpeed;
  }
  if (left) {
    squareX -= moveSpeed;
  }
  if (right) {
    squareX += moveSpeed;
  }
  if (squareX + squareSize > canvas.width) {
    squareX = canvas.width - squareSize;
  }
  if (squareY + squareSize > canvas.height) {
    squareY = canvas.height - squareSize;
  }
  squareX = Math.max(0, squareX);
  squareY = Math.max(0, squareY);
  if(isEaten()){
    moveTarget();
  }
  draw();
  setTimeout(() => moveSquare(), 1);
}

function moveTarget() {
  const {x, y} = getTargetRandomXY();
  targetX = x;
  targetY = y;
}

function getTargetRandomXY() {
  const x = Math.floor(Math.random() * (canvas.width - targetSize));
  const y = Math.floor(Math.random() * (canvas.height - targetSize));

  return {
    x: x,
    y: y,
  }
}

function resetCanvas() {
  context.fillStyle = 'white';
  context.fillRect(0, 0, canvas.width, canvas.height);
}

function isEaten(){
  const squareBottom = squareY + squareSize;
  const squareRight = squareX + squareSize;
  const targetBottom = targetY + targetSize;
  const targetRight = targetX + targetSize;
  return squareBottom > targetBottom && squareY < targetY && squareRight > targetRight && squareX < targetX;
}

var startgame = document.getElementById("startPause");

startPause.addEventListener("click", Start);

function Start(){
    console.log("Started");
    startPause.removeEventListener("click", Start);
    startPause .addEventListener("click", Stop);
    startPause.value = "Stop";
}

function Stop(){
    console.log("Stopped");
    startPause.removeEventListener("click", Stop);
    startPause.addEventListener("click", Start);
    startPause.value = "Start";
}
