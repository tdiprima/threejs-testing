import * as THREE from "three";
import SceneInit from './SceneInit.js';

const test = new SceneInit("myThreeJsCanvas");

test.initialize();
test.animate();

const axesHelper = new THREE.AxesHelper(16);
test.scene.add(axesHelper);

// NORMAL
// const boxGeometry = new THREE.BoxGeometry(16, 16, 16);
// const boxMaterial = new THREE.MeshNormalMaterial();
// const boxMesh = new THREE.Mesh(boxGeometry, boxMaterial);
// test.scene.add(boxMesh);

// part 1 - boilerplate code
const boxGeometry = new THREE.BoxGeometry(16, 16, 16, 16, 16, 16);
const boxMaterial = new THREE.MeshStandardMaterial({
  color: 0xff0000,
  wireframe: true
});

const boxMesh = new THREE.Mesh(boxGeometry, boxMaterial);
test.scene.add(boxMesh);
