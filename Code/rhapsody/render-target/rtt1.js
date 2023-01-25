// https://discourse.threejs.org/t/how-to-get-texture-color-at-intersection-with-raycast/38631/8
import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";

let width = window.innerWidth;
let height = window.innerHeight;

// Initialize renderer
const renderer = new THREE.WebGLRenderer();
renderer.setSize(width, height);
renderer.autoClear = false;
document.body.appendChild(renderer.domElement);

// Scene / Raycaster / Camera / Controls
const scene = new THREE.Scene();

const cameraRTT = new THREE.OrthographicCamera(
  window.innerWidth / -2,
  window.innerWidth / 2,
  window.innerHeight / 2,
  window.innerHeight / -2,
  -10000,
  10000
);
cameraRTT.position.z = 100;

const sceneScreen = new THREE.Scene();

const renderTargetTexture = new THREE.WebGLRenderTarget(window.innerWidth, window.innerHeight, {
  minFilter: THREE.LinearFilter,
  magFilter: THREE.NearestFilter,
  format: THREE.RGBAFormat,
  type: THREE.FloatType
});

const materialScreen = new THREE.ShaderMaterial({
  uniforms: { tDiffuse: { value: renderTargetTexture.texture } },
  vertexShader: document.getElementById('vertexShader').textContent,
  fragmentShader: document.getElementById('fragment_shader_screen').textContent,
  depthWrite: false
});

const plane = new THREE.PlaneGeometry(window.innerWidth, window.innerHeight);
const quad = new THREE.Mesh(plane, materialScreen); // signature mismatch
quad.position.z = -100;
sceneScreen.add(quad);

// const rayCaster = new THREE.Raycaster();
// ( origin, direction, near = 0, far = Infinity )
const rayCaster = new THREE.Raycaster(undefined, undefined, 0, undefined);
const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 10000);
camera.position.copy(new THREE.Vector3(100, 100, 100));
camera.lookAt(new THREE.Vector3(0, 0, 0));
scene.add(camera);
const controls = new OrbitControls(camera, renderer.domElement);

// Global variables
const mouse = new THREE.Vector2();
let planeMesh;
let textureData;

const imgPath = 'https://cdn.pixabay.com/photo/2022/05/23/13/16/bird-7216181_1280.jpg';

// Load texture; initialize planeMesh, textureData, and renderTargetTexture.
new THREE.TextureLoader().load(imgPath, texture => {
  textureData = texture;

  planeMesh = new THREE.Mesh(
    new THREE.PlaneGeometry(texture.image.width, texture.image.height),
    new THREE.MeshBasicMaterial({ map: texture })
  );

  scene.add(planeMesh);
});

resize();
animate();

function resize() {
  renderer.setSize(width, height);
  camera.aspect = width / height;
  camera.updateProjectionMatrix();
}

function animate() {
  renderer.clear();
  renderer.render(scene, camera);
  requestAnimationFrame(animate);
  controls.update();
}

window.addEventListener('resize', resize);

window.addEventListener('pointerup', event => {
  // To calculate pages scrolling coordinates:
  const scrollLeft = window.pageXOffset || document.documentElement.scrollLeft;
  const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

  mouse.x = ((event.clientX - renderer.domElement.offsetLeft + scrollLeft) / renderer.domElement.width) * 2 - 1;
  mouse.y = -((event.clientY - renderer.domElement.offsetTop + scrollTop) / renderer.domElement.height) * 2 + 1;

  rayCaster.setFromCamera(mouse, camera);
  const intersections = rayCaster.intersectObject(planeMesh);

  if (intersections.length > 0) {
    // renderer.domElement.width, instead of window.innerWidth
    mouse.x = parseInt(renderer.domElement.width / 2 + (mouse.x * renderer.domElement.width) / 2);
    mouse.y = parseInt(renderer.domElement.height / 2 + (mouse.y * renderer.domElement.height) / 2);

    renderer.clear();

    // Render first scene into texture
    renderer.setRenderTarget(renderTargetTexture);
    renderer.clear();
    renderer.render(scene, camera); // See webgl_rtt.html, line 251.

    // Render full screen quad with generated texture
    renderer.setRenderTarget(null);
    renderer.render(sceneScreen, cameraRTT);

    const read = new Float32Array(4);
    renderer.readRenderTargetPixels(renderTargetTexture, mouse.x, mouse.y, 1, 1, read);
    const r = parseInt(read[0] * 255); // signature mismatch
    const g = parseInt(read[1] * 255);
    const b = parseInt(read[2] * 255);
    console.log(`X:${mouse.x} Y:${mouse.y} RGB: [${r},${g},${b}] Color: %c     `, `background:rgb(${r},${g},${b});`);
  }
});