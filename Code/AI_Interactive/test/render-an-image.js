import * as THREE from "three";

let isDrawing = false;
let currentX = 0, currentY = 0;
let annotations = [];

let scene = new THREE.Scene();

let camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 1, 1000);
camera.position.z = 10;

let renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setClearColor(0x101010);
document.body.appendChild(renderer.domElement);

let light = new THREE.DirectionalLight(0xffffff, 2);
light.position.setScalar(10);
scene.add(light);

let planeGeometry = new THREE.PlaneGeometry(10, 10, 1, 1);

let texture = new THREE.TextureLoader().load("../pixels/uv_grid_opengl.jpg");

let planeMaterial = new THREE.MeshLambertMaterial({ map: texture });

let plane = new THREE.Mesh(planeGeometry, planeMaterial);

// add the plane to the scene
scene.add(plane);

// Create canvas for drawing and annotations
let canvas = document.createElement("canvas");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
// canvas.width = 1024;
// canvas.height = 1024;

let context = canvas.getContext("2d");
context.strokeStyle = "#FF0000";
context.lineWidth = 5;

// Event listeners for drawing
canvas.addEventListener("mousedown", startDrawing);
canvas.addEventListener("mousemove", draw);
canvas.addEventListener("mouseup", stopDrawing);
canvas.addEventListener("mouseout", stopDrawing);

// Add canvas to scene as texture
let annotationTexture = new THREE.CanvasTexture(canvas);
let annotationMaterial = new THREE.MeshBasicMaterial({
  map: annotationTexture,
  transparent: true
});

let annotationMesh = new THREE.Mesh(new THREE.PlaneGeometry(1, 1), annotationMaterial);
annotationMesh.position.set(0, 0, -0.01);
console.log("plane", plane);
plane.add(annotationMesh);

// Event listener for annotations
canvas.addEventListener("click", function(event) {
  console.log("%cclick", "color: #ccff00;");
  let x = event.offsetX / canvas.width;
  let y = 1 - (event.offsetY / canvas.height);
  annotations.push({
    x: x,
    y: y
  });
  drawAnnotations();
});

function startDrawing(event) {
  isDrawing = true;
  currentX = event.offsetX;
  currentY = event.offsetY;
}

function draw(event) {
  if (isDrawing) {
    let x = event.offsetX;
    let y = event.offsetY;
    context.beginPath();
    context.moveTo(currentX, currentY);
    context.lineTo(x, y);
    context.stroke();
    currentX = x;
    currentY = y;
  }
}

function stopDrawing(event) {
  isDrawing = false;
}

function drawAnnotations() {
  context.clearRect(0, 0, canvas.width, canvas.height);
  for (let i = 0; i < annotations.length; i++) {
    let x = annotations[i].x * canvas.width;
    let y = (1 - annotations[i].y) * canvas.height;
    context.beginPath();
    // context.arc(x, y, 5, 0, Math.PI * 2);
    context.arc(x, y, 50, 0, Math.PI * 2);
    context.fillStyle = "#FF0000";
    context.fill();
  }
}

(function render() {
  requestAnimationFrame(render);
  renderer.render(scene, camera);
})();
