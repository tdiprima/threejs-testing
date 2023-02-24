import * as THREE from "three";

let isDrawing = false;
let planeMaterial;
console.log(THREE.REVISION);

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

{
  // create a plane geometry with a texture
  let planeGeometry = new THREE.PlaneGeometry(10, 10, 1, 1);
  let texture = new THREE.TextureLoader().load("../pixels/uv_grid_opengl.jpg");
  // planeMaterial = new THREE.MeshBasicMaterial({ map: texture, side: THREE.DoubleSide });
  planeMaterial = new THREE.MeshLambertMaterial({
    map: texture,
    side: THREE.DoubleSide
  });
  let plane = new THREE.Mesh(planeGeometry, planeMaterial);
  scene.add(plane);
}

// {
//   let textureLoader = new THREE.TextureLoader();
//   // load the texture
//   textureLoader.load('../pixels/uv_grid_opengl.jpg', function (texture) {
//     // create a plane geometry with a texture
//     let geometry = new THREE.PlaneGeometry(10, 10);
//     let material = new THREE.MeshBasicMaterial({map: texture, side: THREE.DoubleSide});
//     let mesh = new THREE.Mesh(geometry, material);
//     scene.add(mesh);
//   });
// }

// Create a canvas element and add it as a texture to the plane geometry
let canvas = document.createElement('canvas');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let context = canvas.getContext("2d");

let canvasTexture = new THREE.CanvasTexture(canvas);
planeMaterial.map = canvasTexture;

context.strokeStyle = "#FF0000";
context.lineWidth = 5;

// allow the user to draw on the canvas
function onCanvasMouseDown(event) {
  isDrawing = true;
  // console.log("%cdown", "color: #ccff00");
  let x = event.clientX - canvas.offsetLeft;
  let y = event.clientY - canvas.offsetTop;
  context.beginPath();
  context.moveTo(x, y);
  // canvas.addEventListener('mousemove', onCanvasMouseMove); // MOVED
}

function onCanvasMouseMove(event) {
  if (isDrawing) {
    // console.log("%cmove", "color: deeppink");
    let x = event.clientX - canvas.offsetLeft;
    let y = event.clientY - canvas.offsetTop;
    context.lineTo(x, y);
    context.stroke();
    canvasTexture.needsUpdate = true;
  }
}

// canvas.addEventListener
// window.addEventListener
// document.addEventListener
document.addEventListener('mousemove', onCanvasMouseMove);
document.addEventListener('mousedown', onCanvasMouseDown);

// Add mouseup
document.addEventListener('mouseup', function() {
  isDrawing = false;
  context.closePath();
  context.stroke();
});

(function render() {
  requestAnimationFrame(render);
  renderer.render(scene, camera);
})();
