import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";

let scene = new THREE.Scene();
let camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.z = 5;

let renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

let controls = new OrbitControls(camera, renderer.domElement);
controls.target.set(0, 0, 0);
controls.update();

let hemisphereLight = new THREE.HemisphereLight(0xffffff, 0x000000, 1);
scene.add(hemisphereLight);

let pointLight = new THREE.PointLight(0xffffff, 1);
pointLight.position.set(0, 10, 0);
scene.add(pointLight);

// Create a Level of Detail object
let lod = new THREE.LOD();

// Easily switch between materials
function getMaterial(type, color, geometry) {
  const opts = { color: color, wireframe: true };
  let material;
  if (type === 1) {
    material = new THREE.MeshStandardMaterial(opts);
  } else
  if (type === 2) {
    material = new THREE.MeshPhongMaterial(opts);
  } else {
    material = new THREE.MeshBasicMaterial(opts);
  }
  return new THREE.Mesh(geometry, material);
}

// Create different levels of detail (meshes or geometries)
let highDetailGeometry = new THREE.SphereGeometry(1, 32, 32);
let highDetailMesh = getMaterial(0, 0xff0000, highDetailGeometry);

let mediumDetailGeometry = new THREE.SphereGeometry(1, 16, 16);
let mediumDetailMesh = getMaterial(0, 0x00ff00, mediumDetailGeometry);

let lowDetailGeometry = new THREE.SphereGeometry(1, 8, 8);
let lowDetailMesh = getMaterial(0, 0x0000ff, lowDetailGeometry);

// Add each level of detail to the LOD object
lod.addLevel(highDetailMesh, 0);    // Distance = 0 or closer
lod.addLevel(mediumDetailMesh, 50); // Distance between 0 and 100
lod.addLevel(lowDetailMesh, 100);   // Distance between 100 and 200

// Add the LOD object to the scene
scene.add(lod);

window.addEventListener("resize", function() {
  renderer.setSize(window.innerWidth, window.innerHeight);
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.render(scene, camera);
});

(function animate() {
  requestAnimationFrame(animate);
  controls.update();
  renderer.render(scene, camera);
})();
