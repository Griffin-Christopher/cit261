/* AUTHOR : Christopher Griffin
 * 
 * DOM Manipulation
 * HTML5 Tags - Video, Audio, and Canvas
 * 
 */

// Audio Function Calls
function createAutoAudio()   { insertAudio("audioPlayer", true); }
function createManualAudio() { insertAudio("audioPlayer", false);  }

// Create Audio Player
function insertAudio(id, autoplay) {
  if (!getByID(id)) {
    // Create Audio Element
    var player = newElement("AUDIO");
    player.id = id;
    player.controls = true;
    // Link Audio Files
    player.appendChild(newElement("SOURCE"));
    player.firstChild.src  = "../assets/audio/audiosample.mp3";
    player.firstChild.type = "audio/mpeg";
    player.appendChild(newElement("SOURCE"));
    player.lastChild.src   = "../assets/audio/audiosample.ogg";
    player.lastChild.type  = "audio/ogg";
    player.appendChild(
        newText("Your browser does not support this audio format."));
    // Insert Audio Element
    getByID("audioControllers").insertAdjacentHTML("afterend", player.outerHTML);
  }
  if (autoplay) {
    getByID(id).play();
  } else {
    getByID(id).pause();
  }
}

// Video Function Calls
function createSmallVideo()  { insertVideo("videoPlayer", 426,  240); }
function createMediumVideo() { insertVideo("videoPlayer", 640,  360); }
function createLargeVideo()  { insertVideo("videoPlayer", 854,  480); }

// Create Video Player (240p | 360p | 480p)
function insertVideo(id, width, height) {
  if (!getByID(id)) {
    // Create Video Element
    var player = newElement("VIDEO");
    player.id = id;
    player.controls = true;
    // Link Audio Files
    player.appendChild(newElement("SOURCE"));
    player.firstChild.src  = "../assets/video/videosample.mp4";
    player.firstChild.type = "video/mp4";
    player.appendChild(newElement("SOURCE"));
    player.lastChild.src   = "../assets/video/videosample.webm";
    player.lastChild.type  = "video/webm";
    player.appendChild(
        newText("Your browser does not support this video format."));
    // Insert Video Element
    getByID("videoSizes").insertAdjacentHTML("afterend", player.outerHTML);
  }
  getByID(id).width  = width;
  getByID(id).height = height;
}

// Event Listeners
window.onload = function(){ // Wait for page to load!
  newEvent("drawLines",   "click", drawLines);
  newEvent("drawCircles", "click", drawCircles);
  newEvent("drawText",    "click", drawText);
  newEvent("draw3DText",  "click", draw3DText);
  newEvent("drawLGrad",   "click", drawLGrad);
  newEvent("drawRGrad",   "click", drawRGrad);
};

// Create/Reset 2D Canvas
function insertCanvas(id) {
  if (!getByID(id)) {
    // Creat Canvas Element
    var canvas = newElement ("CANVAS")
    canvas.id = id;
    canvas.width = 250;
    canvas.height = 250;
    // Insert Canvas Element
    getByID("canvasButtons").insertAdjacentHTML("afterend", canvas.outerHTML);
  } else {
    // Restore Blank Canvas
    var reset = getByID(id).getContext("2d");
    reset.clearRect(0, 0, 250, 250);
    reset.fillStyle = "#000000";
  }
}

// Canvas Lines
function drawLines() {
  insertCanvas("easel");
  var lines = getByID("easel").getContext("2d");
  lines.beginPath();
  lines.moveTo(0, 0);     // NW Corner
  lines.lineTo(250, 250); // SE Corner
  lines.moveTo(250, 0);   // NE Corner
  lines.lineTo(0, 250);   // SW Corner
  lines.stroke();         // Draw Path
}

// Canvas Circle
function drawCircles() {
  insertCanvas("easel");
  var circles = getByID("easel").getContext("2d");
  circles.beginPath();
  circles.arc(125, 100, 50, 0, 2*Math.PI); // Top Circle
  circles.stroke();
  circles.beginPath();
  circles.arc(85,  140, 50, 0, 2*Math.PI); // Bottom-left Circle
  circles.stroke(); 
  circles.beginPath();
  circles.arc(165, 140, 50, 0, 2*Math.PI); // Bottom-right Circle
  circles.stroke();
}

// Canvas Text
function drawText() {
  insertCanvas("easel");
  var text = getByID("easel").getContext("2d");
  text.font = "48px Lato";
  text.fillText("CIT 261", 30, 125); 
}

// Canvase 3D Text
function draw3DText() {
  insertCanvas("easel");
  var text = getByID("easel").getContext("2d");
  text.font = "48px Lato";
  text.strokeText("CIT 261", 30, 125); 
}

// Canvas Linear Gradient
function drawLGrad() {
  insertCanvas("easel");
  var linear = getByID("easel").getContext("2d");
  // Create Rainbow Fill Style
  var fill = linear.createLinearGradient(0, 0, 250, 250);
  fill.addColorStop(0.00, "red");
  fill.addColorStop(0.14, "orange");
  fill.addColorStop(0.28, "yellow");
  fill.addColorStop(0.43, "green");
  fill.addColorStop(0.57, "blue");
  fill.addColorStop(0.72, "white");
  fill.addColorStop(1.00, "violet");
  // Fill Canvas
  linear.fillStyle = fill;
  linear.fillRect(0, 0, 250, 250);
}

// Canvas Radial Gradient
function drawRGrad() {
  insertCanvas("easel");
  var radial = getByID("easel").getContext("2d");
  // Create Rainbow Fill Style
  var fill = radial.createRadialGradient(125, 125, 25, 125, 125, 175);
  fill.addColorStop(0.00, "white");
  fill.addColorStop(0.25, "black");
  fill.addColorStop(0.50, "white");
  fill.addColorStop(0.75, "black");
  fill.addColorStop(1.00, "white");
  // Fill Canvas
  radial.fillStyle = fill;
  radial.fillRect(0, 0, 250, 250);
  }