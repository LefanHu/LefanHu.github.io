const canvas = document.getElementById("myCanvas");
const ctx = canvas.getContext("2d");

canvas.width = innerWidth;
canvas.height = innerHeight;

const FRAMES_PER_SEC = 60;
const NUM_DOTS = 150;
const MAX_SPEED = 10;
const BORDER = 20;
const CONNECT_DISTANCE = 100;

var particles = [];

var mouse = {
  x: null,
  y: null,
  effectRadius: 200,
};

class Particle {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.dx = Math.random() * 2 + 2 * (Math.random() < 0.5 ? -1 : 1);
    this.dy = Math.random() * 2 + 2 * (Math.random() < 0.5 ? -1 : 1);
    this.radius = 5;
    this.color = "#" + Math.floor(Math.random() * 16777215).toString(16);
  }

  draw() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
    ctx.fillStyle = this.color;
    ctx.fill();
  }

  update() {
    //too fast
    if (Math.sqrt(this.dx * this.dx + this.dy * this.dy) > MAX_SPEED) {
      this.dx *= 0.95;
      this.dy *= 0.95;
    }

    //updates position
    this.x += this.dx;
    this.y += this.dy;

    //bounce off the wall
    if (this.x > canvas.width - BORDER || this.x - BORDER < 0) {
      this.dx *= -1;
    }
    if (this.y > canvas.height - BORDER || this.y - BORDER < 0) {
      this.dy *= -1;
    }

    //detects if the mouse is closeby
    var distX = this.x - mouse.x;
    var distY = this.y - mouse.y;
    var dist = Math.sqrt(distX * distX + distY * distY);
    //dot is close enough to be affected
    if (dist < mouse.effectRadius) {
      if (this.x < BORDER + 5 || this.x > canvas.width - BORDER - 5) {
        //do nothing
      } else if (this.y < BORDER + 5 || this.y > canvas.height - BORDER - 5) {
        //do nothing
      } else {
        this.x < mouse.x ? (this.x -= 2) : (this.x += 2);
        this.y < mouse.y ? (this.y -= 2) : (this.y += 2);
      }
    }
  }
}

function animate() {
  //clear previous frame
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  //connect dots together
  connectDots();

  //update&draw all particle positions
  for (var i = 0; i < particles.length; i++) {
    particle = particles[i];
    particle.update();
    particle.draw();
  }

  //draw the mouse as a red dot
  drawMouse();
}

function connectDots() {
  for (var i = 0; i < particles.length; i++) {
    particleOne = particles[i];
    oneX = particleOne.x;
    oneY = particleOne.y;
    for (var j = i + 1; j < particles.length; j++) {
      particleTwo = particles[j];
      twoX = particleTwo.x;
      twoY = particleTwo.y;
      dist = Math.sqrt(
        (oneX - twoX) * (oneX - twoX) + (oneY - twoY) * (oneY - twoY)
      );
      if (dist < CONNECT_DISTANCE) {
        drawLine(oneX, oneY, twoX, twoY, particleOne.color);
        console.log("line drew");
      }
    }
  }
}

function drawLine(x1, y1, x2, y2, color) {
  ctx.beginPath();
  ctx.moveTo(x1, y1);
  ctx.lineTo(x2, y2);
  ctx.strokeStyle = color;
  ctx.lineWidth = 3;
  ctx.stroke();
}

function drawMouse() {
  ctx.beginPath();
  ctx.arc(mouse.x, mouse.y, 5, 0, Math.PI * 2, false);
  ctx.fillStyle = "red";
  ctx.fill();
}

function init() {
  for (var i = 0; i < NUM_DOTS; i++) {
    x = Math.random() * (canvas.width - 2 * BORDER) + BORDER;
    y = Math.random() * (canvas.height - 2 * BORDER) + BORDER;
    particles.push(new Particle(x, y));
  }
}

addEventListener("mousemove", (event) => {
  mouse.x = event.clientX;
  mouse.y = event.clientY;
});

setInterval(animate, 1000 / FRAMES_PER_SEC);
init();
