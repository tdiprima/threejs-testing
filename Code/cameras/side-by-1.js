import * as THREE from "three";
import { OrbitControls } from "three/examples/controls/OrbitControls.js";

function main() {
  const checker = "/textures/images/checker.png";

  let canvas = document.querySelector("#c");
  let renderer = new THREE.WebGLRenderer({ canvas });

  // CAMERA
  let camera = new THREE.PerspectiveCamera(
    45, // field of view 45 degrees
    2,
    0.1,
    100 // far plane 100 units
  );

  // camera.position.z = 20;
  camera.position.set(0, 10, 20); // move the camera 10 units up and 20 units back

  // A CameraHelper draws the frustum for a Camera.
  let cameraHelper = new THREE.CameraHelper(camera);

  // ORBIT CONTROL

  // OrbitControls let the user spin or orbit the camera around some point.
  let controls = new OrbitControls(camera, canvas);
  controls.target.set(0, 5, 0); // set the target to rotate 5 units above the origin
  controls.update(); // call controls.update so the controls will use the new target

  let scene = new THREE.Scene();
  scene.background = new THREE.Color("#000");

  scene.add(cameraHelper);

  {
    let planeSize = 40;

    let loader = new THREE.TextureLoader();

    let texture = loader.load(checker);
    texture.wrapS = THREE.RepeatWrapping; // how the texture is wrapped horizontally
    texture.wrapT = THREE.RepeatWrapping; // how the texture is wrapped vertically
    texture.magFilter = THREE.NearestFilter; // how the texture is sampled

    let repeats = planeSize / 2;
    texture.repeat.set(repeats, repeats);

    let planeGeo = new THREE.PlaneGeometry(planeSize, planeSize);

    let planeMat = new THREE.MeshPhongMaterial({
      map: texture,
      side: THREE.DoubleSide,
    });

    let mesh = new THREE.Mesh(planeGeo, planeMat);

    // Planes default to being in the XY plane, but the ground is in the XZ plane; so we rotate it.
    // All rotations take place around the object's point of origin.
    // So basically, we're changing the pivot point (x = -1.57).
    mesh.rotation.x = Math.PI * -0.5;

    scene.add(mesh);
  }

  {
    let cubeSize = 4;
    let cubeGeo = new THREE.BoxGeometry(
      4,
      4,
      4
    );

    let cubeMat = new THREE.MeshPhongMaterial({ color: "#8AC" }); // Polo Blue #88aacc
    let mesh = new THREE.Mesh(cubeGeo, cubeMat);
    mesh.position.set(
      cubeSize + 1,
      cubeSize / 2,
      0
    );
    // x: move it right, from center
    // y: move it down-field, a bit

    scene.add(mesh);
  }

  {
    let sphereRadius = 3;
    let sphereGeo = new THREE.SphereGeometry(
      3,
      32,
      16
    );

    let sphereMat = new THREE.MeshPhongMaterial({ color: "#CA8" }); // Tan #ccaa88

    let mesh = new THREE.Mesh(sphereGeo, sphereMat);
    mesh.position.set(
      -sphereRadius - 1,
      sphereRadius + 2,
      0
    ); // -4, 5, 0

    // y = 0 => the plane cuts it in half. So we *at least* want y = sphereRadius...
    // x = 0 => puts it in the center of the viewport, so we wanna move it left a bit...

    scene.add(mesh);
  }

  {
    // A DirectionalLight is often used to represent the sun.
    let light = new THREE.DirectionalLight("#fff", 1);

    light.position.set(0, 10, 0); // hang it from 10 units above

    // The DirectionalLight points from its position to target.position
    light.target.position.set(-5, 0, 0); // effect: shine from right to left

    // For the target's position to be changed, it must be added to the scene:
    scene.add(light.target);

    scene.add(light);

    // LIGHT HELPER
    let helper = new THREE.DirectionalLightHelper(light, 1, "#ffff00");
    scene.add(helper);
    helper.update();
  }

  function resizeRendererToDisplaySize(renderer) {
    const canvas = renderer.domElement;
    let width = canvas.clientWidth;
    let height = canvas.clientHeight;
    let needResize = canvas.width !== width || canvas.height !== height;
    if (needResize) {
      renderer.setSize(width, height, false);
    }
    return needResize;
  }

  function render() {
    if (resizeRendererToDisplaySize(renderer)) {
      const canvas = renderer.domElement;
      camera.aspect = canvas.clientWidth / canvas.clientHeight;
      // Anytime the camera's settings change, we need to call the camera's
      // updateProjectionMatrix function.
      camera.updateProjectionMatrix();
    }

    renderer.render(scene, camera);

    requestAnimationFrame(render);
  }

  requestAnimationFrame(render);
}

main();
