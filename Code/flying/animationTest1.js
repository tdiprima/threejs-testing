import * as THREE from "https://threejsfundamentals.org/threejs/resources/threejs/r132/build/three.module.js";
import { GLTFLoader } from "https://threejsfundamentals.org/threejs/resources/threejs/r132/examples/jsm/loaders/GLTFLoader.js";
import { OrbitControls } from "https://threejsfundamentals.org/threejs/resources/threejs/r132/examples/jsm/controls/OrbitControls.js";

console.log("%cthree.js rev", "color: #ccff00;", THREE.REVISION);

let camera;
let clock;
let container;
let controls;
let mixer;
let model;
let renderer;
let scene;

initScene();
animate();

function initScene() {
  scene = new THREE.Scene();
  camera = window._camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
  );
  // camera.position.set(0, 20, 50);
  camera.position.set(-101, 28, 3.8);

  clock = new THREE.Clock();
  renderer = new THREE.WebGLRenderer();
  controls = new OrbitControls(camera, renderer.domElement);
  controls.update();

  document.body.appendChild(renderer.domElement);
  renderer.setSize(window.innerWidth, window.innerHeight);
}

scene.background = new THREE.Color("#c7deea");

// LIGHT
let ambientLight = new THREE.HemisphereLight("white", "darkslategrey", 5);

let mainLight = new THREE.DirectionalLight("white", 4);
mainLight.position.set(10, 10, 10);

scene.add(ambientLight, mainLight);

// GLTF START
let GLTFloader = new GLTFLoader();

GLTFloader.load("/models/gltf/Parrot.glb", gltf => {
  model = gltf;

  mixer = new THREE.AnimationMixer(gltf.scene);

  mixer.clipAction(gltf.animations[0]).play();

  scene.add(model.scene);
});
// GLTF END

function animate() {
  requestAnimationFrame(animate);

  let delta = clock.getDelta();
  // console.log("delta", delta);

  if (mixer) {
    mixer.update(delta);
  }

  renderer.render(scene, camera);
}
