import * as THREE from "three";
import SceneInit from "./SceneInit.js";

const test = new SceneInit("myThreeJsCanvas");
test.initialize();
test.animate();

const axesHelper = new THREE.AxesHelper(16);
test.scene.add(axesHelper);

// define uniform data
const uniformData = {
  u_time: {
    type: "f",
    value: test.clock.getElapsedTime()
  }
};
const render = () => {
  uniformData.u_time.value = test.clock.getElapsedTime();
  window.requestAnimationFrame(render);
};
render();

const boxGeometry = new THREE.BoxGeometry(24, 4, 24, 24, 4, 24);

// GLSL SHADER WITH UNIFORM VARIABLES
// const boxMaterial = new THREE.ShaderMaterial({
//   wireframe: true,
//   uniforms: uniformData,
//   vertexShader: `
//   uniform float u_time;
//
//   void main() {
//     vec4 result;
//
//     // bobbin - cuz it's bobbin up and down
//     // result = vec4(position.x, position.y + sin(u_time), position.z, 1.0);
//
//     // convert box into a 2D sine wave plane
//     // result = vec4(position.x, sin(position.z), position.z, 1.0);
//     // result = vec4(position.x, sin(position.z + u_time), position.z, 1.0);
//
//     // change the 2D sine wave plane into a wavy box
//     // result = vec4(position.x, sin(position.z) + position.y, position.z, 1.0);
//     // result = vec4(position.x, sin(position.z + u_time) + position.y, position.z, 1.0);
//
//     // change how wavy the box is by updating frequency
//     // result = vec4(position.x, sin(position.z/4.0) + position.y, position.z, 1.0);
//     // result = vec4(position.x, sin((position.z)/4.0 + u_time) + position.y, position.z, 1.0);
//
//     // change the amplitude of the box's waves
//     // result = vec4(position.x, 4.0*sin(position.z/4.0) + position.y, position.z, 1.0);
//     result = vec4(position.x, 4.0*sin(position.z/4.0 + u_time) + position.y, position.z, 1.0);
//
//     gl_Position = projectionMatrix * modelViewMatrix * result;
//   }
//   `,
//   fragmentShader: `
//   uniform float u_time;
//   void main() {
//     // gl_FragColor = vec4(1.0, 0.0, 0.0, 1.0);
//     // gl_FragColor = vec4(sin(u_time), 0.0, 0.0, 1.0); // black for really long time, so...
//     gl_FragColor = vec4(abs(sin(u_time)), 0.0, 0.0, 1.0); // always goes between 0 and 1
//   }`
// });

// VARYING VARIABLES
const boxMaterial = new THREE.ShaderMaterial({
  wireframe: true,
  uniforms: uniformData,
  vertexShader: `
    varying vec3 pos;
    uniform float u_time;

    void main()	{
      vec4 result;
      pos = position;

      result = vec4(
        position.x,
        4.0 * sin(position.z / 4.0 + u_time) + position.y,
        position.z,
        1.0
      );

      gl_Position = projectionMatrix
        * modelViewMatrix
        * result;
    }
    `,
  fragmentShader: `
    varying vec3 pos;
    uniform float u_time;
    void main() {
      if (pos.x >= 0.0) {
        // gl_FragColor = vec4(1.0, 0.0, 0.0, 1.0);
        // between 0 and 1 red:
        gl_FragColor = vec4(abs(sin(u_time)), 0.0, 0.0, 1.0);
      } else {
        // gl_FragColor = vec4(0.0, 1.0, 0.0, 1.0);
        // between 0 and 1 green:
        gl_FragColor = vec4(0.0, abs(cos(u_time)), 0.0, 1.0);
      }
    }
    `
});

const boxMesh = new THREE.Mesh(boxGeometry, boxMaterial);
test.scene.add(boxMesh);
