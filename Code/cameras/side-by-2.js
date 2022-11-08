import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";

function main() {
  const checker = "/textures/images/checker.png";

  document.querySelector("#info").innerHTML = "scissor function - draw 2 scenes with 2 cameras side by side";

  let canvas = document.querySelector("#c");
  let renderer = new THREE.WebGLRenderer({ canvas });
  let view1Elem = document.querySelector("#view1");
  let view2Elem = document.querySelector("#view2");

  // CAMERA 1
  let camera = new THREE.PerspectiveCamera(
    45, // field of view 45 degrees
    2,
    5,
    100 // far plane 100 units
  );

  camera.position.set(0, 10, 20); // 10 up, 20 back

  let cameraHelper = new THREE.CameraHelper(camera);

  // ORBIT CONTROL 1

  // Set OrbitControls #1 to respond to the first view element.
  let controls1 = new OrbitControls(camera, view1Elem);
  controls1.target.set(0, 5, 0); // Notice: 0, 5, 0
  controls1.update();

  // CAMERA 2
  let camera2 = new THREE.PerspectiveCamera(
    60, // 60 degrees
    2,
    0.1,
    500
  );

  camera2.position.set(40, 10, 30); // 40 right, 10 up, 30 back
  camera2.lookAt(0, 5, 0); // 5 up

  // ORBIT CONTROL 2
  // The second OrbitControls is tied to the second camera and gets input from
  // the second view element.
  let controls2 = new OrbitControls(camera2, view2Elem);
  controls2.target.set(0, 5, 0); // 5 up
  controls2.update();

  let scene = new THREE.Scene();
  scene.background = new THREE.Color("#000");

  scene.add(cameraHelper);

  {
    let planeSize = 40;

    let loader = new THREE.TextureLoader();

    let texture = loader.load(checker);
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

    // Planes default to being in the XY plane,
    // but the ground is in the XZ plane; so we rotate it.
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
    );

    scene.add(mesh);
  }

  {
    // https://r105.threejsfundamentals.org/threejs/threejs-lights-directional.html
    let light = new THREE.DirectionalLight("#fff", 1);

    light.position.set(0, 10, 0); // hang it from 10 units above

    // shines in the direction of its target
    light.target.position.set(-5, 0, 0); // shine from right to left

    scene.add(light);
    scene.add(light.target);

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

  // Set the SCISSOR and VIEWPORT to each div.
  function setScissorForElement(elem) {
    let canvasRect = canvas.getBoundingClientRect();
    let elemRect = elem.getBoundingClientRect();

    // compute a canvas relative rectangle
    let right = Math.min(elemRect.right, canvasRect.right) - canvasRect.left;
    let left = Math.max(0, elemRect.left - canvasRect.left);
    let bottom = Math.min(elemRect.bottom, canvasRect.bottom) - canvasRect.top;
    let top = Math.max(0, elemRect.top - canvasRect.top);

    // Note - this got screwed up, all because the CSS was missing.
    // Math.abs(bottom - top); // ensure positive number

    let width = Math.min(canvasRect.width, right - left);
    let height = Math.min(canvasRect.height, bottom - top);

    // setup the scissor to only render to that part of the canvas
    let positiveYUpBottom = canvasRect.height - bottom; // should be zero anyway
    renderer.setScissor(left, positiveYUpBottom, width, height);
    renderer.setViewport(left, positiveYUpBottom, width, height);

    // console.log(left, positiveYUpBottom, width, height);
    // throw DOMException; // hack, to get the darn thing to stop.

    // return the ASPECT
    return width / height;
  }

  /**
   * Render the scene from the point of view of each camera,
   * using the scissor function
   * to only render to part of the canvas.
   */
  function render() {
    resizeRendererToDisplaySize(renderer);

    // turn on the SCISSOR
    renderer.setScissorTest(true);

    // render the ORIGINAL VIEW
    {
      let aspect = setScissorForElement(view1Elem);

      // adjust the camera for this aspect
      camera.aspect = aspect;
      camera.updateProjectionMatrix();
      cameraHelper.update();

      // don't draw the camera helper in the original view
      cameraHelper.visible = false;

      scene.background.set("#000");

      // render
      renderer.render(scene, camera);
    }

    // render from the 2ND CAMERA
    {
      let aspect = setScissorForElement(view2Elem);

      // adjust the camera for this aspect
      camera2.aspect = aspect;
      camera2.updateProjectionMatrix();

      // draw the camera helper in the 2nd view
      cameraHelper.visible = true;

      scene.background.set("#000040"); // Stratos

      renderer.render(scene, camera2);
    }

    requestAnimationFrame(render);
  }

  requestAnimationFrame(render);
}

main();
