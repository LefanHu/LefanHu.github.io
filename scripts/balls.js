var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");

const FRAMES_PER_SEC = 60;

let balls = [];

ctx.canvas.width = window.innerWidth;
ctx.canvas.height = window.innerHeight;

class Ball {
  constructor(radius) {
    this.radius = radius;
    this.posX =
      Math.floor(Math.random() * (canvas.width - 2 * radius)) + radius;
    this.posY =
      Math.floor(Math.random() * (canvas.height - 2 * radius)) + radius;
    this.colour = "#" + Math.floor(Math.random() * 16777215).toString(16);
    this.dx = Math.ceil(Math.random() * 5) * (Math.random() < 0.5 ? -1 : 1);
    this.dy = Math.ceil(Math.random() * 5) * (Math.random() < 0.5 ? -1 : 1);
    console.log(this.colour);
  }
}

function draw() {
  ctx.fillStyle = "rgba(255, 255, 255, 0.2)";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  for (var i = 0; i < balls.length; i++) {
    ball = balls[i];
    ctx.beginPath();
    ctx.arc(ball.posX, ball.posY, ball.radius, 2 * Math.PI, false);
    ctx.fillStyle = ball.colour;
    ctx.fill();
    ctx.closePath();
  }
}

function update() {
  for (var i = 0; i < balls.length; i++) {
    ball = balls[i];
    ball.posX += ball.dx;
    ball.posY += ball.dy;

    radius = ball.radius;

    //collision with canvas edge
    if (ball.posX + radius > canvas.width || ball.posX - radius < 0) {
      ball.dx *= -1;
    }
    if (ball.posY + radius > canvas.height || ball.posY - radius < 0) {
      ball.dy *= -1;
    }
  }
}

function game() {
  draw();
  update();
}

function start() {
  ctx.canvas.width = window.innerWidth;
  ctx.canvas.height = window.innerHeight - 50;
  numBalls = 100;
  for (var i = 0; i < numBalls; i++) {
    radius = Math.floor(Math.random() * (40 - 5) + 5);
    balls.push(new Ball(radius, canvas.width, canvas.height));
  }
}

start();
setInterval(game, 1000 / FRAMES_PER_SEC);
