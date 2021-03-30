const canvas = document.getElementById("myCanvas");
const ctx = canvas.getContext("2d");
const mouse = {
  x: 0,
  y: 0,
};
const FRAMES_PER_SEC = 60;

canvas.width = innerWidth;
canvas.height = innerHeight;

var projectiles = [];

class Entity {
  constructor(x, y, radius, color) {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.color = color;
  }

  draw() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
    ctx.fillStyle = this.color;
    ctx.fill();
    ctx.closePath();
  }
}

class Projectile {
  constructor(x, y, radius, velocity) {
    this.x = x;
    this.y = y;
    this.velocity = velocity;
    this.radius = radius;
    this.color = "blue";
  }

  update() {
    this.x += this.velocity.x;
    this.y += this.velocity.y;
  }

  draw() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
    ctx.fillStyle = this.color;
    ctx.fill();
    ctx.closePath();
  }
}

function draw() {
  //clear previous frames
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  //draw projectiles
  for (var i = 0; i < projectiles.length; i++) {
    projectiles[i].draw();
  }

  //draw player
  player.draw();

  //draw crosshair
  ctx.beginPath();
  ctx.fillStyle = "red";
  ctx.arc(mouse.x, mouse.y, 5, 0, Math.PI * 2, false);
  ctx.fill();
  ctx.closePath();
}

function update() {
  //update projectile positions
  for (var i = 0; i < projectiles.length; i++) {
    projectile = projectiles[i];
    projectile.update();
    if (projectile.x > canvas.width || projectile.x < 0) {
      //remove projectile
      projectiles.splice(i, 1);
    }
    if (projectile.y > canvas.height || projectile.y < 0) {
      //remove projectile
      projectiles.splice(i, 1);
    }
  }
}

function game() {
  update();
  draw();
}

function init() {
  player = new Entity(canvas.width / 2, canvas.height / 2, 20, 0, 0, "white");
  setInterval(game, 1000 / FRAMES_PER_SEC);
}

addEventListener("click", (event) => {
  const angle = Math.atan(
    (event.clientY - player.y) / (event.clientX - player.x)
  );
  const velocity = {
    x: (event.clientX - player.x) / 10,
    y: (event.clientY - player.y) / 10,
  };
  const projectile = new Projectile(player.x, player.y, 10, velocity);
  projectiles.push(projectile);
});

addEventListener("mousemove", (event) => {
  mouse.x = event.clientX;
  mouse.y = event.clientY;
});

init();
