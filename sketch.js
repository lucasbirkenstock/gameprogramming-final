const flock = [];

let alignSlider, cohesionSlider, separationSlider;

// Global variables for sprite and dimensions
let tenderBudSprite;
let spriteWidth = 50; // Adjust dimensions to match the sprite
let spriteHeight = 50;

// Preload function to load assets before the sketch starts
function preload() {
  tenderBudSprite = loadImage('TenderBud/idle/0.png'); 
}

function setup() {
  createCanvas(600, 400);
  alignSlider = createSlider(0, 2, 1.5, 0.1);
  cohesionSlider = createSlider(0, 2, 1, 0.1);
  separationSlider = createSlider(0, 2, 2, 0.1);
  for (let i = 0; i < 300; i++) {
    flock.push(new Boid());
  }
}

function draw() {
  background(0);
  for (let boid of flock) {
    boid.edges();
    boid.flock(flock);
    boid.update();
    boid.show();
  }

  let colors = [];
  colorMode(HSB, 255);
  for (let i = 0; i < flock.length; i += 3) {
    let r = map(flock[i].velocity.mag(), 0, 5, 0, 255);
    let g = map(flock[i + 1].velocity.mag(), 0, 5, 0, 255);
    let b = map(flock[i + 2].velocity.mag(), 0, 5, 0, 255);
    colors.push(color(r, g, b));
  }

  let w = width / colors.length;
  let h = 100;
  colors.sort((a, b) => hue(a) - hue(b));
  for (let i = 0; i < colors.length; i++) {
    let c = colors[i];
    fill(c);
    noStroke();
    rect(i * w, height - h, w, h);
  }
}
