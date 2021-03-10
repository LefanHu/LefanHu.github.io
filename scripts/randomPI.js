const canvas = document.getElementById("myCanvas");
const ctx = canvas.getContext("2d");

canvas.width = innerWidth > innerHeight ? innerHeight - 40 : innerWidth - 40;
canvas.height = canvas.width;

const FRAMES_PER_SEC = 60;

var points = [];
var numPoints = 1000;
var numPointsIn = 0;

class Point {
  constructor() {
    this.x = Math.random() * canvas.width;
    this.y = Math.random() * canvas.height;
  }

  draw() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, 5, 0, Math.PI * 2, false);
    var x = this.x - canvas.width / 2;
    var y = this.y - canvas.height / 2;
    if (Math.abs(Math.sqrt(x * x + y * y)) < canvas.width / 2) {
      ctx.fillStyle = "green";
    } else {
      ctx.fillStyle = "black";
    }
    ctx.fill();
  }
}

function draw() {
  //clear previous frame
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // draw all the points
  for (var i = 0; i < points.length; i++) {
    point = points[i];
    point.draw();
  }

  //draw circle
  ctx.beginPath();
  ctx.arc(
    canvas.width / 2,
    canvas.height / 2,
    canvas.width / 2,
    0,
    Math.PI * 2,
    false
  );
  ctx.lineWidth = 5;
  ctx.strokeStyle = "red";
  ctx.stroke();

  //show the statistics of dots
  drawStats();
}
function drawStats() {
  //draw statistics
  ctx.strokeStyle = "black";
  ctx.lineWidth = 1;
  ctx.font = "bold 24px Arial";
  ctx.fillStyle = "#FF0000";
  ctx.textAlign = "center";
  ctx.fillText(
    "IN: " + numPointsIn + " TOTAL: " + points.length,
    canvas.width / 2,
    canvas.height / 2
  );
  ctx.strokeText(
    "IN: " + numPointsIn + " TOTAL: " + points.length,
    canvas.width / 2,
    canvas.height / 2
  );
  ctx.fillText(
    "(IN/(TOTAL/4)): " +
      Math.round((numPointsIn / (points.length / 4)) * 100) / 100,
    canvas.width / 2,
    canvas.height / 2 + 30
  );
  ctx.strokeText(
    "(IN/(TOTAL/4)): " +
      Math.round((numPointsIn / (points.length / 4)) * 100) / 100,
    canvas.width / 2,
    canvas.height / 2 + 30
  );
}

function animate() {
  //create new point
  if (points.length < numPoints) {
    point = new Point();
    points.push(point);

    x = point.x - canvas.width / 2;
    y = point.y - canvas.height / 2;
    if (Math.abs(Math.sqrt(x * x + y * y)) < canvas.width / 2) {
      numPointsIn++;
    }
  }

  //draw all points
  draw();
}

setInterval(animate, 1000 / FRAMES_PER_SEC);
