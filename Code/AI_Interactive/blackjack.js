import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

let scene = new THREE.Scene();

let camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 1, 1000);
camera.position.set(2, 3, 5);

let renderer = new THREE.WebGLRenderer({
  antialias: true,
});
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setClearColor(0x101010);
document.body.appendChild(renderer.domElement);

let controls = new OrbitControls(camera, renderer.domElement);

let light = new THREE.DirectionalLight(0xffffff, 1);
light.position.setScalar(10);
scene.add(light);

let planeGeometry = new THREE.PlaneGeometry(60, 20, 1, 1);

let texture = new THREE.TextureLoader().load('uv_grid_opengl.jpg');

let planeMaterial = new THREE.MeshLambertMaterial({ map: texture });

let plane = new THREE.Mesh(planeGeometry, planeMaterial);
plane.receiveShadow = true;

// rotate and position the plane
plane.rotation.x = -0.5 * Math.PI;
plane.position.set(0, 0, 0);

// add the plane to the scene
scene.add(plane);

(function render() {
  requestAnimationFrame(render);
  controls.update();
  renderer.render(scene, camera);
})();
