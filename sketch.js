
let ghost;
let score = 0;
let duration = 30;
let startTime;
let state = 'start';
let spawnEvery = 60;

// Create the game canvas
function setup() {
  createCanvas(480, 360);
  spawnGhost();
}

// Draw the background
function drawBackground() {
  background(15, 10, 35);

  // Moon
  noStroke();
  fill(255, 245, 180);
  ellipse(400, 65, 55, 55);

  // Small stars
  fill(255);
  ellipse(60, 45, 3, 3);
  ellipse(140, 80, 3, 3);
  ellipse(250, 40, 3, 3);
  ellipse(320, 110, 3, 3);
  ellipse(180, 120, 3, 3);

  // Ground
  fill(35, 90, 55);
  rect(0, 300, 480, 60);

  // Small grass
  stroke(60, 130, 65);
  line(40, 300, 45, 290);
  line(100, 300, 105, 292);
  line(350, 300, 355, 290);
  line(430, 300, 435, 292);
  noStroke();
}

// Main game screen
function draw() {
  drawBackground();

  // Start screen
  if (state === 'start') {
    textAlign(CENTER, CENTER);
    fill(255);
    textSize(28);
    text('Ghost Catcher', width / 2, 145);

    textSize(18);
    text('Click to start', width / 2, 190);
    return;
  }

  // Game over screen
  if (state === 'over') {
    textAlign(CENTER, CENTER);
    fill(255);
    textSize(26);
    text('Game Over!', width / 2, 140);

    textSize(20);
    text('Score: ' + score, width / 2, 180);
    text('Click to retry', width / 2, 220);
    return;
  }

  // Timer
  let elapsed = (millis() - startTime) / 1000;
  let timeLeft = max(0, duration - elapsed);

  if (timeLeft <= 0) {
    state = 'over';
    return;
  }

  // Create a new ghost every 60 frames
  if (frameCount % spawnEvery === 0) {
    spawnGhost();
  }

  // Draw ghost
  drawGhost(ghost.x, ghost.y);

  // Show score
  textAlign(LEFT, TOP);
  fill(255);
  textSize(16);
  text('Score: ' + score, 12, 10);

  // Show timer
  textAlign(RIGHT, TOP);
  text('Time: ' + ceil(timeLeft), width - 12, 10);
}

// Mouse controls
function mousePressed() {

  // Start or restart game
  if (state === 'start' || state === 'over') {
    state = 'play';
    score = 0;
    startTime = millis();
    spawnGhost();
    return;
  }

  // Catch ghost by clicking it
  if (dist(mouseX, mouseY, ghost.x, ghost.y) < 30) {
    score++;
    spawnGhost();
  }
}

// Create ghost at random position
function spawnGhost() {
  ghost = {
    x: random(40, width - 40),
    y: random(60, 260)
  };
}

// Draw a simple ghost shape
function drawGhost(x, y) {
  // Ghost body
  noStroke();
  fill(220, 255, 230);
  ellipse(x, y, 50, 55);

  // Eyes
  fill(20);
  ellipse(x - 10, y - 5, 6, 8);
  ellipse(x + 10, y - 5, 6, 8);
}
