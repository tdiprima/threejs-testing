import "./style.css"
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

// Setup

let scene = new THREE.Scene();

let camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000); // mimics what human eyeballs would see

let renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector("#bg")
});

renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);

camera.position.setZ(30);

renderer.render(scene, camera);

// Torus ring shape

let geometry = new THREE.TorusGeometry(10, 3, 16, 100);

let material = new THREE.MeshStandardMaterial({color: 0xFF6347}); // 0x = "hexidecimal literal"

let torus = new THREE.Mesh(geometry, material);
scene.add(torus);

// Lights

let pointLight = new THREE.PointLight(0xffffff); // add a "lightbulb"
pointLight.position.set(5, 5, 5); // move it away from the center

let ambientLight = new THREE.AmbientLight(0xffffff);
scene.add(pointLight, ambientLight);

// Helpers

let lightHelper = new THREE.PointLightHelper(pointLight);
let gridHelper = new THREE.GridHelper(200, 50);
scene.add(lightHelper, gridHelper);

// Interactions

let controls = new OrbitControls(camera, renderer.domElement); // listen to dom events on mouse


// Animation Loop

function animate() {
  requestAnimationFrame(animate);

  torus.rotation.x += 0.01;
  torus.rotation.y += 0.005;
  torus.rotation.z += 0.01;

  controls.update();

  renderer.render(scene, camera);
}
animate();
