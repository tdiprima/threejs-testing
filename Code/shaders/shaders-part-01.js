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

const boxGeometry = new THREE.BoxGeometry(16, 16, 16, 16, 16, 16);

// PART 1 - BOILERPLATE CODE
// const boxMaterial = new THREE.MeshStandardMaterial({
//   color: 0xff0000,
//   wireframe: true
// });

// PART 2 - RE-WRITE BOILERPLATE CODE WITH A SHADER MATERIAL
// const boxMaterial = new THREE.ShaderMaterial({
//   wireframe: true,
//   vertexShader: `
//     void main()	{
//       // projectionMatrix, modelViewMatrix, position -> passed in from Three.js
//       gl_Position = projectionMatrix
//         * modelViewMatrix
//         * vec4(position.x, position.y, position.z, 1.0);
//     }
//     `,
//   fragmentShader: `
//     void main() {
//       gl_FragColor = vec4(1.0, 0.0, 0.0, 1.0);
//     }
//     `
// });

// PART 3 - BASICS OF GLSL SHADERS
const boxMaterial = new THREE.ShaderMaterial({
  wireframe: true,
  vertexShader: `
  void main()	{
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

// MESH, SCENE
const boxMesh = new THREE.Mesh(boxGeometry, boxMaterial);
test.scene.add(boxMesh);
