let flock = [];
let alignSlider, cohesionSlider, separationSlider;

// Preload animation frames
function preload() {
  for (let i = 0; i < 100; i++) {
    let boid = new Boid();
    boid.loadFrames('TenderBud/walk_S', 4); // Adjust path and frame count
    flock.push(boid);
  }
}

function setup() {
  createCanvas(600, 400);
  alignSlider = createSlider(0, 2, 1.5, 0.1);
  cohesionSlider = createSlider(0, 2, 1, 0.1);
  separationSlider = createSlider(0, 2, 2, 0.1);
}

function draw() {
  background(0);
  for (let boid of flock) {
    boid.edges();
    boid.flock(flock);
    boid.update();
    boid.show();
  }
}
