const canvas = document.getElementById("myCanvas");
const ctx = canvas.getContext("2d");
const FRAMES_PER_SEC = 60;

var leftPaddle = {
  x: 20,
  y: canvas.height / 2,
  dy: 0,
  speed: 10,
  width: 15,
  height: 80,
  score: 0,
};

var rightPaddle = {
  x: canvas.width - 20 - 15,
  y: canvas.height / 2,
  dy: 0,
  speed: 10,
  width: 15,
  height: 80,
  score: 0,
};

var ball = {
  width: 40,
  height: 40,
  x: canvas.width / 2,
  y: canvas.height / 2,
  dx: 3 * (Math.random() < 0.5 ? -1 : 1),
  dy: 3 * (Math.random() < 0.5 ? -1 : 1),
};

function collides(obj1, obj2) {
  return (
    obj1.x < obj2.x + obj2.width &&
    obj1.x + obj1.width > obj2.x &&
    obj1.y < obj2.y + obj2.height &&
    obj1.y + obj1.height > obj2.y
  );
}

function drawScore() {
  ctx.font = "256px Arial";
  ctx.fillStyle = "#0095DD";
  ctx.textAlign = "center";
  ctx.fillText(
    leftPaddle.score + ":" + rightPaddle.score,
    canvas.width / 2,
    canvas.height / 2
  );
}

function update() {
  //play against a wall
  rightPaddle.y = ball.y;
  //wall play against wall
  //leftPaddle.y = ball.y;

  //detect collisions
  if (collides(leftPaddle, ball)) {
    ball.dx *= -1;
    ball.x += leftPaddle.width;
    //increase speed of ball
    ball.dx *= 1.2;
    ball.dy *= 1.2;
  }
  if (collides(rightPaddle, ball)) {
    ball.dx *= -1;
    ball.x -= rightPaddle.width;
    ball.dx *= 1.2;
    ball.dy *= 1.2;
  }

  //move ball
  ball.x += ball.dx;
  ball.y += ball.dy;

  //bounce ball
  radius = ball.height / 2;
  if (ball.y < 0 || ball.y + radius * 2 > canvas.height) ball.dy *= -1;

  //round end
  if (ball.x < 0 || ball.x + radius * 2 > canvas.width) {
    //increment scores
    ball.x < 0 ? leftPaddle.score++ : rightPaddle.score++;

    //disallow movement
    ball.dx = 0;
    ball.dy = 0;
    leftPaddle.speed = 0;
    rightPaddle.speed = 0;

    //reset ball position
    ball.x = canvas.width / 2 - ball.width / 2;
    ball.y = canvas.height / 2 - ball.height / 2;
  }

  //move paddle
  rightPaddle.y += rightPaddle.dy;
  leftPaddle.y += leftPaddle.dy;

  //prevent paddles from going beyond canvas
  if (rightPaddle.y + leftPaddle.height > canvas.height)
    rightPaddle.y = canvas.height - rightPaddle.height;
  else if (rightPaddle.y < 0) rightPaddle.y = 0;

  if (leftPaddle.y + leftPaddle.height > canvas.height)
    leftPaddle.y = canvas.height - leftPaddle.height;
  else if (leftPaddle.y < 0) leftPaddle.y = 0;
}

function drawFrame() {
  //clear canvas
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  //draw score
  drawScore();

  //draw ball
  radius = ball.height / 2;
  ctx.beginPath();
  ctx.arc(
    ball.x + radius,
    ball.y + radius,
    ball.height / 2,
    2 * Math.PI,
    false
  );
  ctx.fillStyle = "black";
  ctx.fill();
  ctx.closePath();

  //draw ball hitbox
  //ctx.fillRect(ball.x, ball.y, ball.width, ball.height);

  //draw paddles
  ctx.beginPath();
  ctx.fillStyle = "black";
  ctx.fillRect(leftPaddle.x, leftPaddle.y, leftPaddle.width, leftPaddle.height);
  ctx.fillRect(
    rightPaddle.x,
    rightPaddle.y,
    rightPaddle.width,
    rightPaddle.height
  );

  //draw goal zones
  ctx.fillStyle = "#FF0000";
  ctx.fillRect(0, 0, 10, canvas.height);
  ctx.fillRect(canvas.width - 10, 0, 10, canvas.height);
}

function game() {
  update();
  drawFrame();
}

// listen to keyboard events to move the paddles
document.addEventListener("keydown", function (e) {
  // up arrow key
  if (e.which === 38) {
    rightPaddle.dy = -rightPaddle.speed;
  }
  // down arrow key
  else if (e.which == 40) {
    rightPaddle.dy = rightPaddle.speed;
  }

  // w key
  if (e.which === 87) {
    leftPaddle.dy = -leftPaddle.speed;
  }
  // a key
  else if (e.which === 83) {
    leftPaddle.dy = leftPaddle.speed;
  }

  // space key to restart
  if (e.which == 32) {
    //reset ball position
    ball.x = canvas.width / 2;
    ball.y = canvas.height / 2;

    //reallow movement
    ball.dx = 3;
    ball.dy = -3;
    leftPaddle.speed = 10;
    rightPaddle.speed = 10;
  }
});

// listen to keyboard events to stop the paddle if key is released
document.addEventListener("keyup", function (e) {
  if (e.which === 38 || e.which === 40) {
    rightPaddle.dy = 0;
  }

  if (e.which === 83 || e.which === 87) {
    leftPaddle.dy = 0;
  }
});

setInterval(game, 1000 / FRAMES_PER_SEC);
