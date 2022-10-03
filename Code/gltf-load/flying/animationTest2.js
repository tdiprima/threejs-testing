import * as THREE from "https://threejsfundamentals.org/threejs/resources/threejs/r132/build/three.module.js";
import { GLTFLoader } from "https://threejsfundamentals.org/threejs/resources/threejs/r132/examples/jsm/loaders/GLTFLoader.js";
import { OrbitControls } from "https://threejsfundamentals.org/threejs/resources/threejs/r132/examples/jsm/controls/OrbitControls.js";

console.log("%cthree.js rev", "color: #ccff00;", THREE.REVISION);

let clock, controls, scene, camera, renderer, mixer, container, model;

initScene();
animate();

function initScene() {
  scene = new THREE.Scene();
  camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
  );

  clock = new THREE.Clock();
  renderer = new THREE.WebGLRenderer();
  controls = new OrbitControls(camera, renderer.domElement);
  controls.update();

  container = document.getElementById("container");

  container.appendChild(renderer.domElement);
  renderer.setSize(window.innerWidth, window.innerHeight);
}

scene.background = new THREE.Color("#f8edeb");

// LIGHT
const light = new THREE.DirectionalLight(0xffffff, 1);
light.position.set(2, 2, 5);

// HELPERS
const axesHelper = new THREE.AxesHelper(5);
let gridHelper = new THREE.GridHelper(30, 30);

scene.add(light, axesHelper, gridHelper);

// GLTF START
const GLTFloader = new GLTFLoader();

var newMaterial = new THREE.MeshStandardMaterial({color: "#e76f51"});

GLTFloader.load("https://richardlundquist.github.io/library/alice_TEST2.glb", function (gltf) {
  model = gltf;

  mixer = new THREE.AnimationMixer(gltf.scene);

  mixer.clipAction(gltf.animations[0]).play();

  scene.add(model.scene);
});
// GLTF END

camera.position.set(0, 20, 50);

function animate() {
  requestAnimationFrame(animate);

  let delta = clock.getDelta() * 4;
  // let time = clock.elapsedTime;

  if (mixer) {
    // mixer.update(clock.getDelta());
    mixer.update(delta);
  }

  renderer.render(scene, camera);

}