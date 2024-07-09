// Batool AL Tameemi, Intro to IM Week 3 homework
// Generative art work

let circles = [];
let backgroundColors = [];
let lines = [];
let numCircles = 21; // Number of circles

function setup() {
  createCanvas(windowWidth, windowHeight); // Create a canvas that fills the entire window
  noStroke(); // Disable stroke (borders) for shapes
  frameRate(60); // Set the frame rate to 60 frames per second

  // Add the RGB values of the colors from the painting to the backgroundColors array
  backgroundColors.push(color(226, 216, 203)); // Light beige
  backgroundColors.push(color(146, 125, 75)); // Dark beige
  backgroundColors.push(color(130, 165, 150)); // Greenish gray
  // Add more background colors as needed

  // Array of hex colors for the circles
  let circleColors = ["#c7999b", "#b8bbaf", "#8e4040", "#82a596", "#e4c95b", "#585e3a", "#364664", "#694350", "#282927"];

  for (let i = 0; i < numCircles; i++) {
    let x = random(width); // Random x-coordinate within canvas width
    let y = random(height); // Random y-coordinate within canvas height
    let radius = random(10, 80); // Random radius between 10 and 80 pixels

    // Randomly select a color from the circleColors array
    let fillColor = color(random(circleColors));
    
    // Generate a random stroke weight for the circle (border thickness)
    let strokeWeightValue = random(1, 5);
    
    let xspeed = random(-2, 2); // Random horizontal speed
    let yspeed = random(-2, 2); // Random vertical speed
    
    // Create an instance of AnimatedCircle and add it to the circles array
    circles.push(new AnimatedCircle(x, y, radius, fillColor, strokeWeightValue, xspeed, yspeed));
  }

  // Create animated lines
  for (let i = 0; i < 8; i++) {
    let x1 = random(width); // Random x-coordinate for the starting point of the line
    let y1 = random(height); // Random y-coordinate for the starting point of the line
    let x2 = random(width); // Random x-coordinate for the ending point of the line
    let y2 = random(height); // Random y-coordinate for the ending point of the line
    let lineColor = color(0, 0, 0); // Black color for lines
    let lineWeight = random(1, 5); // Random stroke weight for lines
    let lineLength = random(50, 200); // Random length for lines

    // Create an instance of AnimatedLine and add it to the lines array
    lines.push(new AnimatedLine(x1, y1, x2, y2, lineColor, lineWeight, lineLength));
  }
}

function draw() {
  // Adjust canvas size if window is resized
  resizeCanvas(windowWidth, windowHeight);

  for (let i = 0; i < backgroundColors.length; i++) {
    fill(backgroundColors[i]); // Fill the background with one of the background colors
    noStroke();
    rect(0, i * (height / backgroundColors.length), width, height / backgroundColors.length);
    // Draw a colored rectangle for each background color
  }

  for (let circle of circles) {
    circle.move(); // Move each animated circle
    circle.display(); // Display each animated circle
  }

  for (let line of lines) {
    line.move(); // Move each animated line
    line.display(); // Display each animated line
  }
  
  // Draw a single black-bordered transparent circle inside
  strokeWeight(8); // Set the stroke weight (border thickness) for the ellipse
  stroke(0); // Set the stroke color to black
  noFill(); // Don't fill the ellipse with color
  ellipse(width / 2, height / 2, 400, 400); // Draw the ellipse at the center of the canvas
}

function mousePressed() {
  // Calculate the index of the background color based on the mouse click position
  let index = int(mouseY / (height / backgroundColors.length));
  fill(backgroundColors[index]); // Fill with the selected background color
  rect(0, index * (height / backgroundColors.length), width, height / backgroundColors.length);
  // Draw a colored rectangle based on the mouse click position
}

// AnimatedCircle class definition
class AnimatedCircle {
  constructor(x, y, radius, fillColor, strokeWeightValue, xspeed, yspeed) {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.fillColor = fillColor;
    this.strokeWeightValue = strokeWeightValue; // Store stroke weight
    this.xspeed = xspeed;
    this.yspeed = yspeed;
    this.fillColor = color(red(fillColor), green(fillColor), blue(fillColor), 200); // Set the alpha value to 150 for transparency
    this.damping = 0.98; // Damping factor for gradual speed reduction
  }

  move() {
    // Update the x-coordinate based on speed
    this.x += this.xspeed;
    // this.xspeed *= this.damping; // Apply damping to reduce speed over time

    // Update the y-coordinate based on speed
    this.y += this.yspeed;
    // this.yspeed *= this.damping; // Apply damping to reduce speed over time

    // Bounce off walls
    if (this.x - this.radius <= 0 || this.x + this.radius >= width) {
      this.xspeed *= -1;
    }
    if (this.y - this.radius <= 0 || this.y + this.radius >= height) {
      this.yspeed *= -1;
    }
  }

  display() {
    strokeWeight(this.strokeWeightValue); // Set the stroke weight
    stroke(0); // Set the stroke color to black
    fill(this.fillColor); // Fill with the specified color
    ellipse(this.x, this.y, this.radius * 2, this.radius * 2); // Draw the circle
  }
}

// AnimatedLine class definition
class AnimatedLine {
  constructor(x1, y1, x2, y2, lineColor, lineWeight, lineLength) {
    this.x1 = x1;
    this.y1 = y1;
    this.x2 = x2;
    this.y2 = y2;
    this.lineColor = lineColor;
    this.lineWeight = lineWeight;
    this.speed = random(0.5, 2); // Random line animation speed
    this.lineLength = lineLength; // Length of the line

    // Calculate initial direction vector
    let dx = this.x2 - this.x1;
    let dy = this.y2 - this.y1;
    let distance = sqrt(dx * dx + dy * dy);
    this.dx = dx / distance;
    this.dy = dy / distance;
  }

  move() {
    // Move the lines
    this.x1 += this.speed * this.dx;
    this.y1 += this.speed * this.dy;
    this.x2 += this.speed * this.dx;
    this.y2 += this.speed * this.dy;

    // Reset lines when they go off-screen
    if (this.x1 > width || this.y1 > height || this.x2 > width || this.y2 > height) {
      this.x1 = random(width);
      this.y1 = random(height);
      this.x2 = random(width);
      this.y2 = random(height);
    }
  }

  display() {
    strokeWeight(this.lineWeight); // Set the stroke weight
    stroke(this.lineColor); // Set the stroke color
    line(this.x1, this.y1, this.x1 + this.lineLength * this.dx, this.y1 + this.lineLength * this.dy); // Draw the line
  }
}

