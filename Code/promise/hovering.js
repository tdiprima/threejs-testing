// diffmerge promise/hovering.js 3d-model-load/animation/hovering.html
import * as THREE from "three";
import { OrbitControls } from "/jsm/controls/OrbitControls.js";
import { GLTFLoader } from "/jsm/loaders/GLTFLoader.js";

console.log(`%cREV: ${THREE.REVISION}`, "color: #ccff00;");

let scene = new THREE.Scene();
scene.background = new THREE.Color(0xc7deea);

let camera = window._camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 10000);
// window._camera.position

let p = { x: -93.91188531607672, y: 22.037651253352788, z: 8.740520894388773 };
camera.position.x = p.x;
camera.position.y = p.y;
camera.position.z = p.z;

let renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

let controls = new OrbitControls(camera, renderer.domElement);

let light = new THREE.HemisphereLight(0xffffff, 0xffffff, 1);
scene.add(light);

// The "await" keyword means "wait here until the model has loaded".
let loader = new GLTFLoader();

// HERE.
let loadedData = await loader.loadAsync("/models/gltf/Parrot.glb");
console.log("%cloadedData", "color: #ff00cc;", loadedData);

scene.add(loadedData.scene);

const model = loadedData.scene.children[0];
const clip = loadedData.animations[0];

const mixer = new THREE.AnimationMixer(model);
const action = mixer.clipAction(clip);
action.play();

// model.tick = (delta) => mixer.update(delta);

let clock = new THREE.Clock();
function animate() {
  requestAnimationFrame(animate);
  let delta = clock.getDelta();

  if (mixer) {
    mixer.update(delta);
  }
  renderer.render(scene, camera);
}

animate();

window.addEventListener("resize", onWindowResize);

function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
}
