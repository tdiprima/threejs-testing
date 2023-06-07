import * as THREE from "three";
// import { OrbitControls } from "three/addons/controls/OrbitControls.js";
// TODO: I put everything inside the texture loader. Still doesn't wanna draw.
// Sometimes these things don't work if you haven't added a resize handler, so I'll add one.

let scene, camera, renderer, controls;
let material, mesh;
let canvas, context;
let isDrawing = false;
let currentX = 0, currentY = 0;
let annotations = [];
const imgUrl = "/Code/portfolio/squirrel_portfolio/squirrel.jpg";

scene = new THREE.Scene();

camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 1000);
camera.position.set(0, 0, 3);

renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// controls = new THREE.OrbitControls(camera, renderer.domElement);

let loader = new THREE.TextureLoader();
loader.load(imgUrl, function(texture) {
  texture.minFilter = THREE.LinearFilter;
  material = new THREE.MeshBasicMaterial({ map: texture });
  mesh = new THREE.Mesh(new THREE.PlaneGeometry(1, 1), material);
  scene.add(mesh);

  // Resize plane to fit image aspect ratio
  let aspect = texture.image.width / texture.image.height;
  mesh.scale.set(aspect, 1, 1);

  // Create canvas for drawing and annotations
  canvas = document.createElement("canvas");
  canvas.width = window.innerWidth; // 1024; texture.image.width;
  canvas.height = window.innerHeight; // 1024; texture.image.height;

  context = canvas.getContext("2d");
  context.strokeStyle = "#FF0000";
  context.lineWidth = 5;

  // const element = canvas;
  const element = window;

  // Event listeners for drawing
  element.addEventListener("mousedown", startDrawing);
  element.addEventListener("mousemove", draw);
  element.addEventListener("mouseup", stopDrawing);
  element.addEventListener("mouseout", stopDrawing);

  // A CanvasTexture is used for the drawing and annotation canvas
  let annotationTexture = new THREE.CanvasTexture(canvas);

  let annotationMaterial = new THREE.MeshBasicMaterial({
    map: annotationTexture,
    transparent: true
  });

  let annotationMesh = new THREE.Mesh(new THREE.PlaneGeometry(1, 1), annotationMaterial);
  annotationMesh.position.set(0, 0, -0.01);
  mesh.add(annotationMesh);

  // Event listener for annotations
  element.addEventListener("click", function(event) {
    let x = event.offsetX / canvas.width;
    let y = 1 - (event.offsetY / canvas.height);
    annotations.push({
      x: x,
      y: y
    });
    drawAnnotations();
  });
});

function startDrawing(event) {
  // Set a flag that indicates whether the user is currently drawing.
  console.log("%cstartDrawing", "color: deeppink");
  isDrawing = true;
  currentX = event.offsetX;
  currentY = event.offsetY;
}

function draw(event) {
  // Handles the actual drawing on the canvas
  if (isDrawing) {
    console.log("%cisDrawing", "color: #ccff00;");
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
  // Unset a flag that indicates whether the user is currently drawing.
  console.log("%cstopDrawing", "color: #ff00cc;");
  isDrawing = false;
}

function drawAnnotations() {
  console.log("%cdrawAnnotations", "color: #997fff;");
  // Clear the canvas
  context.clearRect(0, 0, canvas.width, canvas.height);

  // Redraw any annotations that have been added.
  for (let i = 0; i < annotations.length; i++) {
    let x = annotations[i].x * canvas.width;
    let y = (1 - annotations[i].y) * canvas.height;

    // Annotations are represented as red circles.
    context.beginPath();
    context.arc(x, y, 5, 0, Math.PI * 2);
    context.fillStyle = "#FF0000";
    context.fill();
  }
}

/* Resize Event */
window.addEventListener("resize", function() {
  renderer.setSize(window.innerWidth, window.innerHeight);
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.render(scene, camera);
});

/* Animate */
(function animate() {
  requestAnimationFrame(animate);
  // controls.update();
  renderer.render(scene, camera);
})();
