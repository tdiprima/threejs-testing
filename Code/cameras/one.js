import * as THREE from "three";
import {OrbitControls} from "three/addons/controls/OrbitControls.js";

function main() {
  let canvas = document.querySelector("#c");
  let renderer = new THREE.WebGLRenderer({ canvas });

  let camera = new THREE.PerspectiveCamera(
    45, // field of view 45 degrees
    2,
    0.1,
    100 // far plane 100 units
  );
  camera.position.set(0, 10, 20); // move the camera 10 units up and 20 units back

  // A CameraHelper draws the frustum for a Camera.
  let cameraHelper = new THREE.CameraHelper(camera);

  // OrbitControls let the user spin or orbit the camera around some point.
  let controls = new OrbitControls(camera, canvas);
  controls.target.set(0, 5, 0); // set the target to orbit around to 5 units above the origin
  controls.update(); // call controls.update so the controls will use the new target

  let scene = new THREE.Scene();
  scene.background = new THREE.Color("black");

  scene.add(cameraHelper);

  {
    let planeSize = 40;

    let loader = new THREE.TextureLoader();
    let texture = loader.load("/textures/images/checker.png");
    texture.wrapS = THREE.RepeatWrapping;
    texture.wrapT = THREE.RepeatWrapping;
    texture.magFilter = THREE.NearestFilter;
    let repeats = planeSize / 2;
    texture.repeat.set(repeats, repeats);

    let planeGeo = new THREE.PlaneGeometry(planeSize, planeSize);
    let planeMat = new THREE.MeshPhongMaterial({
      map: texture,
      side: THREE.DoubleSide,
    });
    let mesh = new THREE.Mesh(planeGeo, planeMat);
    mesh.rotation.x = Math.PI * -0.5; // Planes default to being in the XY plane, but the ground is in the XZ plane; so we rotate it.
    scene.add(mesh);
  }

  {
    let cubeSize = 4;
    let cubeGeo = new THREE.BoxGeometry(cubeSize, cubeSize, cubeSize);
    let cubeMat = new THREE.MeshPhongMaterial({ color: "#8AC" });
    let mesh = new THREE.Mesh(cubeGeo, cubeMat);
    mesh.position.set(cubeSize + 1, cubeSize / 2, 0);
    scene.add(mesh);
  }

  {
    let sphereRadius = 3;
    let sphereWidthDivisions = 32;
    let sphereHeightDivisions = 16;
    let sphereGeo = new THREE.SphereGeometry(sphereRadius, sphereWidthDivisions, sphereHeightDivisions);
    let sphereMat = new THREE.MeshPhongMaterial({ color: "#CA8" });
    let mesh = new THREE.Mesh(sphereGeo, sphereMat);
    mesh.position.set(-sphereRadius - 1, sphereRadius + 2, 0);
    scene.add(mesh);
  }

  {
    // A DirectionalLight is often used to represent the sun.
    let light = new THREE.DirectionalLight(0xffffff, 1);
    light.position.set(0, 10, 0);
    light.target.position.set(-5, 0, 0); // shines in the direction of its target
    scene.add(light);
    scene.add(light.target);

    let helper = new THREE.DirectionalLightHelper(light);
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
      // Anytime the camera's settings change we need to call the camera's updateProjectionMatrix function.
      camera.updateProjectionMatrix();
    }

    renderer.render(scene, camera);

    requestAnimationFrame(render);
  }

  requestAnimationFrame(render);
}

main();
