let flock = [];
let alignSlider, cohesionSlider, separationSlider, radiusSlider, collisionSlider, showCollisionRad;

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

function setup() {
  createCanvas(800, 600);

  widthOfLabel = 280;

  alignSlider = createSlider(0, 2, 1.5, 0.1);
  alignSlider.position(20, height + 20); 
  let alignLabel = createDiv('Alignment');
  alignLabel.position(alignSlider.x + alignSlider.width + 10, alignSlider.y);

  cohesionSlider = createSlider(0, 2, 1, 0.1);
  cohesionSlider.position(20 + (1*widthOfLabel), height +20);
  let cohesionLabel = createDiv('Cohesion');
  cohesionLabel.position(cohesionSlider.x + cohesionSlider.width + 10, cohesionSlider.y);

  separationSlider = createSlider(0, 2, 2, 0.1);
  separationSlider.position(20 + (2*widthOfLabel), height +20);
  let separationLabel = createDiv('Separation');
  separationLabel.position(separationSlider.x + separationSlider.width + 10, separationSlider.y);

  radiusSlider = createSlider(0, 2, 1, 0.1);
  radiusSlider.position(20 + (3*widthOfLabel), height +20);
  let radiusLabel = createDiv('Perception Radius');
  radiusLabel.position(radiusSlider.x + radiusSlider.width + 10, radiusSlider.y);

  collisionSlider = createSlider(0.1, 2, 1, 0.1);
  collisionSlider.position(20 + (4*widthOfLabel), height +20);
  let collisionLabel = createDiv('Collision Radius');
  collisionLabel.position(collisionSlider.x + collisionSlider.width + 10, collisionSlider.y);

  window.x = document.createElement("INPUT");
  x.setAttribute("type", "checkbox");
  x.style.position = "absolute"; 
  x.style.left = (20 + 1 * widthOfLabel) + "px";
  x.style.top = (height + 60) + "px";
  let showCollisionRad = createDiv('Show Collision Radius');
  showCollisionRad.position(20 + 1 * widthOfLabel + 30, height + 60);
  document.body.appendChild(x);
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
