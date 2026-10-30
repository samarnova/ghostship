
let ghost;
let score = 0;
let duration = 15;
let startTime;
let state = 'start';
let spawnEvery = 50;

// Create the game canvas
function setup() {
  createCanvas(480, 360);
  spawnGhost();

  noCursor();
}

// Draw the background
function drawBackground() {
  // Sinister dark midnight blue sky
  background(15, 10, 35);

  // // Moon
  noStroke();
  fill(230, 239, 102);
  ellipse(400, 65, 55, 55);

  // --- SINISTER FOGGY CLOUDS (Drawn over moon, behind stars) ---
  // Large, low-opacity dark gray shapes blending together
  fill(40, 35, 60, 120); // 120 transparency makes it misty
  ellipse(370, 75, 160, 40); 
  ellipse(440, 60, 120, 30);
  
  // Lower floating fog bank
  fill(30, 25, 45, 90);
  ellipse(150, 180, 300, 60);
  ellipse(320, 220, 400, 70);

  // // Small stars
  fill(255);
  ellipse(60, 45, 3, 3);
  ellipse(140, 80, 3, 3);
  ellipse(250, 40, 3, 3);
  ellipse(320, 110, 3, 3);
  ellipse(180, 120, 3, 3);

// --- SPOOKY TOMBSTONES (R.I.P.) ---
  noStroke();
  
  // Tombstone 1 (Left side)
  fill(80, 80, 85); // Dark stone gray
  rect(80, 260, 30, 40, 8, 8, 0, 0); // Rounded top edges
  fill(30, 30, 35); // Dark text color
  textSize(8);
  textAlign(CENTER);
  text("R.I.P.", 95, 282);

  // Tombstone 2 (Right side, slightly smaller/further back)
  fill(65, 65, 70); 
  rect(280, 265, 26, 35, 6, 6, 0, 0);
  fill(25, 25, 30);
  textSize(7);
  text("R.I.P.", 293, 285);

  // // Ground
  fill(19, 90, 45);
  rect(0, 300, 480, 60);

  // // Small grass
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
    text('Click spacebar to retry', width / 2, 220);
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

    // --- DRAW CUSTOM NET CURSOR ---
  push(); // Protects your other game styling
  stroke(200); // Light gray metallic color for the net frame
  strokeWeight(3);
  noFill();
  
  // 1. Draw the circular rim of the net centered on the mouse
  ellipse(mouseX, mouseY, 40, 40);
  
  // 2. Draw the mesh grids inside the net rim
  strokeWeight(1);
  stroke(200, 200, 200, 150); // Slightly see-through grid lines
  line(mouseX - 20, mouseY, mouseX + 20, mouseY); // Horizontal center
  line(mouseX, mouseY - 20, mouseX, mouseY + 20); // Vertical center
  line(mouseX - 14, mouseY - 14, mouseX + 14, mouseY + 14); // Diagonal 1
  line(mouseX - 14, mouseY + 14, mouseX + 14, mouseY - 14); // Diagonal 2
  
  // 3. Draw the wooden handle sticking out
  stroke(139, 69, 19); // Brown color for wood handle
  strokeWeight(4);
  // Draws a handle pointing down and to the right from the rim
  line(mouseX + 14, mouseY + 14, mouseX + 35, mouseY + 35); 
  
  pop(); // Restores original styling settings

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

// Check for Spacebar press to restart the game
function keyPressed() {
  // If the spacebar is pressed and the game state is 'over' or 'start'
  if (key === ' ' && (state === 'over' || state === 'start')) {
    state = 'play';
    score = 0;
    startTime = millis();
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

// Draw an arcade ghost with furious angry eyes and sharp teeth
function drawGhost(x, y) {
  noStroke();
  
  // Spooky arcade purple body color
  fill(125, 25, 25); 
  
  let w = 50;  // Total width of the ghost
  let h = 35;  // Height of the straight body block
  
  // 1. Rounded dome head
  arc(x, y, w, w, PI, 0);
  
  // 2. Straight body rectangle directly under the head
  rect(x - w/2, y, w, h);
  
  // 3. Three classic arcade bottom skirt curves
  ellipse(x - w/3, y + h, w/3, 15);
  ellipse(x, y + h, w/3, 15);
  ellipse(x + w/3, y + h, w/3, 15);

  // 4. Furious Arcade Eyes (Slightly squished/angled whites)
  fill(255);
  ellipse(x - 10, y - 2, 14, 16); 
  ellipse(x + 10, y - 2, 14, 16); 
  
  // 5. Angry Blue Pupils (Looking up and inward at the threat)
  fill(0, 0, 255);
  ellipse(x - 8, y - 4, 6, 6); 
  ellipse(x + 8, y - 4, 6, 6); 

  // 6. HEAVY BLACK ANGRY EYEBROWS (Matches the screenshot angle)
  stroke(0); // Solid black eyebrows
  strokeWeight(4.5);
  strokeCap(PROJECT); // Makes the ends blocky and sharp
  // Left eyebrow slanting down toward the center nose area
  line(x - 19, y - 12, x - 3, y - 6);
  // Right eyebrow slanting down toward the center nose area
  line(x + 19, y - 12, x + 3, y - 6);
  
  // Reset stroke for the mouth parts
  noStroke();

  // 7. Horrifying Wide Open Mouth Cavity
  fill(20); // Dark pitch-black void inside the mouth
  rect(x - 16, y + 10, 32, 14, 4); 

  // 8. Sharp Rows of Teeth (Triangles)
  fill(255, 240, 240); 
  // Top row pointing down
  triangle(x - 14, y + 10, x - 10, y + 10, x - 12, y + 15);
  triangle(x - 7,  y + 10, x - 3,  y + 10, x - 5,  y + 16);
  triangle(x + 3,  y + 10, x + 7,  y + 10, x + 5,  y + 16);
  triangle(x + 10, y + 10, x + 14, y + 10, x + 12, y + 15);
  
  // Bottom row pointing up
  triangle(x - 12, y + 24, x - 8,  y + 24, x - 10, y + 19);
  triangle(x - 4,  y + 24, x,   y + 24, x - 2,  y + 18);
  triangle(x,   y + 24, x + 4,  y + 24, x + 2,  y + 18);
  triangle(x + 8,  y + 24, x + 12, y + 24, x + 10, y + 19);
}
