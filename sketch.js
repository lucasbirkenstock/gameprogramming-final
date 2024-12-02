let flock = [];
let alignSlider, cohesionSlider, separationSlider;

// Preload animation frames
function preload() 
{
  for (let i = 0; i < 50; i++) 
  {
    let boid = new Boid();

    // Load frames for cardinal directions
        boid.loadFrames('north', 'TenderBud/walk_N', 4);
        boid.loadFrames('south', 'TenderBud/walk_S', 4);
        boid.loadFrames('east', 'TenderBud/walk_E', 4);
        boid.loadFrames('west', 'TenderBud/walk_W', 4);

        // Load frames for intercardinal directions
        boid.loadFrames('northeast', 'TenderBud/walk_NE', 4);
        boid.loadFrames('southeast', 'TenderBud/walk_SE', 4);
        boid.loadFrames('southwest', 'TenderBud/walk_SW', 4);
        boid.loadFrames('northwest', 'TenderBud/walk_NW', 4);
    flock.push(boid);
  }
}

function setup() 
{
  createCanvas(600, 400);
  alignSlider = createSlider(0, 2, 1.5, 0.1);
  cohesionSlider = createSlider(0, 2, 1, 0.1);
  separationSlider = createSlider(0, 2, 2, 0.1);
}

function draw() 
{
  background(0);
  for (let boid of flock) 
  {
    boid.edges();
    boid.flock(flock);
    boid.update();
    boid.show();
  }
}
