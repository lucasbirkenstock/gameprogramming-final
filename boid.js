class Boid 
{
  constructor() 
  {
      this.position = createVector(random(width), random(height));
      this.velocity = p5.Vector.random2D();
      this.velocity.setMag(random(2, 4));
      this.acceleration = createVector();
      this.maxForce = 0.2;
      this.maxSpeed = 5;
      this.angle = this.velocity.heading();

      this.animations = 
      {
          north: [],
          northeast: [],
          east: [],
          southeast: [],
          south: [],
          southwest: [],
          west: [],
          northwest: []
      };

      this.currentAnimation = this.animations.south; // Default animation
      this.currentFrame = 0;
      this.frameDelay = 5;
      this.frameCounter = 0;
      this.spriteWidth = 50;
      this.spriteHeight = 50;
  }

  loadFrames(direction, animationPath, frameCount) 
  {
      // Loads frames for a specific direction
      if (!this.animations[direction]) 
      {
          console.error(`Invalid direction: ${direction}`);
          return;
      }

      for (let i = 0; i < frameCount; i++) 
      {
          this.animations[direction].push(loadImage(`${animationPath}/${i}.png`));
      }
  }

  determineDirection() 
  {
      // Determine the direction based on the angle
      const angle = this.angle;

      if (angle > -PI / 8 && angle <= PI / 8) 
      {
          return "east";
      } 
      else if (angle > PI / 8 && angle <= (3 * PI) / 8) 
      {
          return "southeast";
      } 
      else if (angle > (3 * PI) / 8 && angle <= (5 * PI) / 8) 
      {
          return "south";
      } 
      else if (angle > (5 * PI) / 8 && angle <= (7 * PI) / 8) 
      {
          return "southwest";
      } 
      else if (angle > (7 * PI) / 8 || angle <= -(7 * PI) / 8) 
      {
          return "west";
      } 
      else if (angle > -(7 * PI) / 8 && angle <= -(5 * PI) / 8) 
      {
          return "northwest";
      } 
      else if (angle > -(5 * PI) / 8 && angle <= -(3 * PI) / 8) 
      {
          return "north";
      } 
      else if (angle > -(3 * PI) / 8 && angle <= -PI / 8) 
      {
          return "northeast";
      }
  }

  update() 
  {
      this.position.add(this.velocity);
      this.velocity.add(this.acceleration);
      this.velocity.limit(this.maxSpeed);
      this.acceleration.mult(0);

      // Update the angle based on the velocity
      this.angle = this.velocity.heading();

      // Determine the current direction and switch animation frames
      const direction = this.determineDirection();
      this.currentAnimation = this.animations[direction];

      // Update frame for animation
      this.frameCounter++;
      if (this.frameCounter >= this.frameDelay) 
      {
          this.currentFrame = (this.currentFrame + 1) % this.currentAnimation.length;
          this.frameCounter = 0;
      }
  }

  show() 
  {
    push();
    translate(this.position.x, this.position.y);

    if (this.currentAnimation.length > 0) 
    {
        image(
            this.currentAnimation[this.currentFrame],
            -this.spriteWidth / 2,
            -this.spriteHeight / 2,
            this.spriteWidth,
            this.spriteHeight
        );
    }
    pop();
}


  edges() 
    {
        if (this.position.x > width) this.position.x = 0;
        else if (this.position.x < 0) this.position.x = width;
        if (this.position.y > height) this.position.y = 0;
        else if (this.position.y < 0) this.position.y = height;
    }

    flock(boids) 
    {
        let alignment = this.align(boids);
        let cohesion = this.cohesion(boids);
        let separation = this.separation(boids);
    
        alignment.mult(alignSlider.value());
        cohesion.mult(cohesionSlider.value());
        separation.mult(separationSlider.value());
    
        this.acceleration.add(alignment);
        this.acceleration.add(cohesion);
        this.acceleration.add(separation);
    }

    flock(boids) 
    {
        let alignment = this.align(boids);
        let cohesion = this.cohesion(boids);
        let separation = this.separation(boids);
    
        alignment.mult(alignSlider.value());
        cohesion.mult(cohesionSlider.value());
        separation.mult(separationSlider.value());
    
        this.acceleration.add(alignment);
        this.acceleration.add(cohesion);
        this.acceleration.add(separation);
    }

    align(boids) 
    {
      let perceptionRadius = 25;
      let steering = createVector();
      let total = 0;
      for (let other of boids) 
      {
        let d = dist(this.position.x, this.position.y, other.position.x, other.position.y);
        if (other != this && d < perceptionRadius) 
        {
          steering.add(other.velocity);
          total++;
        }
      }
      if (total > 0) 
      {
        steering.div(total);
        steering.setMag(this.maxSpeed);
        steering.sub(this.velocity);
        steering.limit(this.maxForce);
      }
      return steering;
    }
  
    separation(boids)
    {
      let perceptionRadius = 24;
      let steering = createVector();
      let total = 0;
      for (let other of boids) 
      {
        let d = dist(this.position.x, this.position.y, other.position.x, other.position.y);

        if (other != this && d < perceptionRadius) 
        {
          let diff = p5.Vector.sub(this.position, other.position);
          diff.div(d * d);
          steering.add(diff);
          total++;
        }
      }

      if (total > 0) 
      {
        steering.div(total);
        steering.setMag(this.maxSpeed);
        steering.sub(this.velocity);
        steering.limit(this.maxForce);
      }

      return steering;
    }
  
    cohesion(boids) 
    {
      let perceptionRadius = 50;
      let steering = createVector();
      let total = 0;
      for (let other of boids) 
      {
        let d = dist(this.position.x, this.position.y, other.position.x, other.position.y);
        
        if (other != this && d < perceptionRadius) 
        {
          steering.add(other.position);
          total++;
        }
      }

      if (total > 0) 
      {
        steering.div(total);
        steering.sub(this.position);
        steering.setMag(this.maxSpeed);
        steering.sub(this.velocity);
        steering.limit(this.maxForce);
      }
      
      return steering;
    }
}

