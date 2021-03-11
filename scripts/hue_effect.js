const canvas = document.getElementById("myCanvas");
const ctx = canvas.getContext("2d");

canvas.width = innerWidth;
canvas.height = innerHeight;

const FRAMES_PER_SEC = 60;
const NUM_DOTS = 150;
const BORDER = 20;
const CONNECT_DISTANCE = 120;

const particles = [];
var hue = 0;

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
    this.radius = Math.random() * (30 - 10) + 5;
    this.color = hue;
  }

  draw() {
    ctx.fillStyle = "hsl(" + this.color + ", 100%, 50%";
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
    ctx.fill();
  }

  update() {
    //updates position
    this.x += this.dx;
    this.y += this.dy;

    //decrease the size
    if (this.radius > 1) this.radius -= 0.3;
  }
}

function animate() {
  //clear previous frame
  //ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = "rgba(0, 0, 0, 0.02)";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  //update&draw all particle positions
  for (var i = 0; i < particles.length; i++) {
    particle = particles[i];
    if (particle.radius < 2) {
      particles.splice(i, 1);
    } else {
      particle.update();
      particle.draw();
    }
  }

  //draw the mouse as a red dot
  drawMouse();

  //change the hue a bit
  hue += 1;
}

function drawMouse() {
  ctx.beginPath();
  ctx.arc(mouse.x, mouse.y, 5, 0, Math.PI * 2, false);
  ctx.fillStyle = "red";
  ctx.fill();
}

addEventListener("mousemove", (event) => {
  mouse.x = event.clientX;
  mouse.y = event.clientY;
  for (var i = 0; i < 2; i++) {
    particles.push(new Particle(mouse.x, mouse.y));
  }
});

setInterval(animate, 1000 / FRAMES_PER_SEC);
init();
