import * as THREE from "three";

let draw = false;
console.log(THREE.REVISION)

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

// create a 2D canvas element
let canvas = document.createElement("canvas");
let context = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
// canvas.width = 1024;
// canvas.height = 1024;

context.strokeStyle = "#FF0000";
context.lineWidth = 5;

// add the canvas as a texture to a plane geometry
let texture = new THREE.Texture(canvas);
let material = new THREE.MeshBasicMaterial({ map: texture, side: THREE.DoubleSide });
let geometry = new THREE.PlaneGeometry(10, 10);
let mesh = new THREE.Mesh(geometry, material);
scene.add(mesh);

// allow the user to draw on the canvas
function onCanvasMouseDown(event) {
  draw = true;
  // console.log("%cdown", "color: #ccff00");
  let x = event.clientX - canvas.offsetLeft;
  let y = event.clientY - canvas.offsetTop;
  context.beginPath();
  context.moveTo(x, y);
}

function onCanvasMouseMove(event) {
  if (draw) {
    // console.log("%cmove", "color: deeppink");
    let x = event.clientX - canvas.offsetLeft;
    let y = event.clientY - canvas.offsetTop;
    context.lineTo(x, y);
    context.stroke();
    texture.needsUpdate = true;
  }
}

// canvas.addEventListener
// window.addEventListener
// document.addEventListener
document.addEventListener('mousemove', onCanvasMouseMove);
document.addEventListener('mousedown', onCanvasMouseDown);

// Add mouseup
document.addEventListener('mouseup', function() {
  draw = false;
  context.closePath();
  context.stroke();
});

(function render() {
  requestAnimationFrame(render);
  renderer.render(scene, camera);
})();
