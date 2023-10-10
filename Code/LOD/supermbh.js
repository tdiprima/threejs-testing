import * as THREE from "three";
import { OrbitControls } from "three/examples/controls/OrbitControls.js";

// Setup scene, camera, and renderer
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

let controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.target.set(0, 0, 0);
controls.update();

// Create different levels of detail (meshes)
function getMaterial(color, geometry) {
  const material = new THREE.MeshBasicMaterial({ color, wireframe: true });
  return new THREE.Mesh(geometry, material);
}

// Create a Level of Detail object
let lod = new THREE.LOD();

let highDetailGeometry = new THREE.SphereGeometry(1, 32, 32);
let highDetailMesh = getMaterial(0xff0000, highDetailGeometry);

let mediumDetailGeometry = new THREE.SphereGeometry(1, 16, 16);
let mediumDetailMesh = getMaterial(0x00ff00, mediumDetailGeometry);

let lowDetailGeometry = new THREE.SphereGeometry(1, 8, 8);
let lowDetailMesh = getMaterial(0x0000ff, lowDetailGeometry);

// Add each level of detail to the LOD object
lod.addLevel(highDetailMesh, 0);    // Distance = 0 or closer
lod.addLevel(mediumDetailMesh, 50); // Distance between 0 and 100
lod.addLevel(lowDetailMesh, 100);   // Distance between 100 and 200

// Add the LOD object to the scene
scene.add(lod);

// Camera position
camera.position.z = 150;

// Animation
const animate = function () {
  requestAnimationFrame(animate);
  controls.update();
  renderer.render(scene, camera);
};

animate();
