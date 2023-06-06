import * as THREE from "three";
// import { OrbitControls } from "three/addons/controls/OrbitControls.js";
// todo: makes dots, but no image.

let scene, camera, renderer;
let mesh, texture, canvasTexture, canvas, context, isDrawing;
let currentX = 0, currentY = 0;
let annotations = [];
const imgUrl = "/Code/portfolio/squirrel_portfolio/squirrel.jpg";

scene = new THREE.Scene();

camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.z = 2;

renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// const controls = new THREE.OrbitControls(camera, renderer.domElement);

// The trick to getting the image to show, is to do the wrong thing
// (not connect the canvas with the image). But then you get no annotations.
const loader = new THREE.TextureLoader();

loader.load(
  imgUrl,
  function(texture) {
    const geometry = new THREE.PlaneGeometry(1, 1);
    canvas = document.createElement("canvas");
    canvas.width = texture.image.width;
    canvas.height = texture.image.height;
    context = canvas.getContext("2d");
    canvasTexture = new THREE.CanvasTexture(canvas);

    // TODO: see, you'd flip this to see the image.
    const material = new THREE.MeshBasicMaterial({ map: canvasTexture });
    // const material = new THREE.MeshBasicMaterial({ map: texture });

    mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);
  },
  undefined,
  function(error) {
    console.error("An error happened", error);
  }
);

isDrawing = false;
// const element = canvas;
const element = window;

element.addEventListener("mousedown", startDrawing);
element.addEventListener("mousemove", draw);
element.addEventListener("mouseup", stopDrawing);

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
  if (!mesh) return;
  context.clearRect(0, 0, canvas.width, canvas.height);
  for (let i = 0; i < annotations.length; i++) {
    let x = annotations[i].x * canvas.width;
    let y = (1 - annotations[i].y) * canvas.height;
    context.beginPath();
    context.arc(x, y, 5, 0, Math.PI * 2);
    context.fillStyle = "#FF0000";
    context.fill();
  }
  canvasTexture.needsUpdate = true;
}

// Allow user to add annotations by clicking anywhere on the canvas.
window.addEventListener("mousedown", addAnnotation);

/*
function addAnnotation(event) {
  if (!mesh) return;
  let rect = event.target.getBoundingClientRect();
  let x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
  let y = -((event.clientY - rect.top) / rect.height) * 2 + 1;
  let intersection = getIntersection(x, y);
  if (intersection) {
    let annotation = {
      x: intersection.uv.x,
      y: intersection.uv.y
    };
    annotations.push(annotation);
  }
}
*/

function getIntersection(x, y) {
  const raycaster = new THREE.Raycaster();
  raycaster.setFromCamera({ x, y }, camera);
  const intersects = raycaster.intersectObjects([mesh]);
  if (intersects.length > 0) {
    return intersects[0];
  } else {
    return null;
  }
}

function addAnnotationMesh(annotation) {
  // Create small red plane at specified position and add it to mesh object.
  let geometry = new THREE.PlaneGeometry(0.2, 0.2);
  let material = new THREE.MeshBasicMaterial({ color: 0xff0000 });
  let annotationMesh = new THREE.Mesh(geometry, material);

  annotationMesh.position.set(
    annotation.x * canvas.width - canvas.width / 2,
    canvas.height / 2 - annotation.y * canvas.height,
    0.01
  );
  mesh.add(annotationMesh);
}

function addAnnotation(event) {
  if (!mesh) return;
  let rect = event.target.getBoundingClientRect();
  let x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
  let y = -((event.clientY - rect.top) / rect.height) * 2 + 1;
  let intersection = getIntersection(x, y);

  // Calculate the intersection point of the click with the plane
  if (intersection) {
    let annotation = {
      x: intersection.uv.x,
      y: intersection.uv.y
    };

    // Add annotation to the annotations array.
    annotations.push(annotation);

    // Create red plane at annotation position.
    addAnnotationMesh(annotation);
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
  drawAnnotations();
})();