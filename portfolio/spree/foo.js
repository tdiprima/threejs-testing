// import "./style.css"
// import * as THREE from "three";

// Setup

let scene = new THREE.Scene(); // container

let camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000); // mimics what human eyeballs would see

// renders graphics to scene
let renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector("#bg")
});

renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight); // full-screen canvas

// camera positioned in middle of scene
// move it along Z axis
camera.position.setZ(30);

// Draw!
renderer.render(scene, camera);

// So far we have a blank screen.  Add an object.
let geometry = new THREE.TorusGeometry(10, 3, 16, 100); // like a big 3D ring.
// see: CylinderGeometry, etc.

// Define a material, to give it color or texture.
let material = new THREE.MeshBasicMaterial({color: 0xFF6347, wireframe: true}); // "wrapping paper" for a geometry.

let torus = new THREE.Mesh(geometry, material);
scene.add(torus);

// To see it, we need to re-render the screen.
// renderer.render(scene, camera);


// Animation Loop

function animate() {
  requestAnimationFrame(animate);
  renderer.render(scene, camera);
}
animate();