import * as THREE from "three";
import SceneInit from "./SceneInit.js";

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
// const boxGeometry = new THREE.BoxGeometry(16, 16, 16, 16, 16, 16);
// const boxMaterial = new THREE.MeshStandardMaterial({
//   color: 0xff0000,
//   wireframe: true
// });
// const boxMesh = new THREE.Mesh(boxGeometry, boxMaterial);
// test.scene.add(boxMesh);

// part 3 - basics of glsl shaders
const boxGeometry = new THREE.BoxGeometry(16, 16, 16, 16, 16, 16);
const boxMaterial = new THREE.ShaderMaterial({
  wireframe: true,
  vertexShader: `
  void main()	{
    // projectionMatrix, modelViewMatrix, position -> passed in from three.js

    // gl_Position = projectionMatrix
    //   * modelViewMatrix
    //   * vec4(position.x, position.y, position.z, 1.0);

    // gl_Position = projectionMatrix
    //   * modelViewMatrix
    //   * vec4(position.x, sin(position.z), position.z, 1.0);

    // gl_Position = projectionMatrix
    //   * modelViewMatrix
    //   * vec4(position.x, sin(position.z) + position.y, position.z, 1.0);

    // gl_Position = projectionMatrix
    //   * modelViewMatrix
    //   * vec4(position.x, sin(position.z / 4.0) + position.y, position.z, 1.0);

    gl_Position = projectionMatrix
      * modelViewMatrix
      * vec4(position.x, 4.0 * sin(position.z / 4.0) + position.y, position.z, 1.0);
  }
  `,
  fragmentShader: `
  void main() {
    // gl_FragColor = vec4(1.0, 0.0, 0.0, 1.0);
    gl_FragColor = vec4(0.0, 1.0, 0.0, 1.0);
  }
  `
});

const boxMesh = new THREE.Mesh(boxGeometry, boxMaterial);
test.scene.add(boxMesh);
