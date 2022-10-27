import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";

function main() {
  const poloBlue = "#88aacc";
  const tan = "#ccaa88";
  const stratos = "#000040";
  const checker = "../3d-model-load/assets/checker.png";

  document.querySelector("#info").innerHTML = "scissor function - draw 2 scenes with 2 cameras side by side";

  let canvas = document.querySelector("#c");
  let renderer = new THREE.WebGLRenderer({ canvas });
  let view1Elem = document.querySelector("#view1");
  let view2Elem = document.querySelector("#view2");

  let camera = new THREE.PerspectiveCamera(
    45, // fov
    2, // aspect
    5, // near
    100 // far
  );
  camera.position.set(0, 10, 20); // 10 up, 20 back

  let cameraHelper = new THREE.CameraHelper(camera);

  // Set OrbitControls to respond to the first view element only.
  let controls = new OrbitControls(camera, view1Elem);
  controls.target.set(0, 5, 0);
  controls.update();

  let camera2 = new THREE.PerspectiveCamera(
    60, // fov
    2, // aspect
    0.1, // near
    500, // far
  );
  camera2.position.set(40, 10, 30);
  camera2.lookAt(0, 5, 0);

  // The second OrbitControls is tied to the second camera and gets input from the second view element.
  let controls2 = new OrbitControls(camera2, view2Elem);
  controls2.target.set(0, 5, 0);
  controls2.update();

  let scene = new THREE.Scene();
  scene.background = new THREE.Color("black");

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
    mesh.rotation.x = Math.PI * -0.5;
    scene.add(mesh);
  }

  {
    let cubeSize = 4;
    let cubeGeo = new THREE.BoxGeometry(cubeSize, cubeSize, cubeSize);
    let cubeMat = new THREE.MeshPhongMaterial({ color: "#8AC" });
    let mesh = new THREE.Mesh(cubeGeo, cubeMat);
    mesh.position.set(cubeSize + 1, cubeSize / 2, 0);
    // x: move it right, from center
    // y: move it down-field, a bit
    scene.add(mesh);
  }

  {
    let sphereRadius = 3;
    let sphereWidthDivisions = 32;
    let sphereHeightDivisions = 16;
    let sphereGeo = new THREE.SphereGeometry(sphereRadius, sphereWidthDivisions, sphereHeightDivisions);
    let sphereMat = new THREE.MeshPhongMaterial({ color: "#CA8" });

    let mesh = new THREE.Mesh(sphereGeo, sphereMat);
    mesh.position.set(-sphereRadius - 1, sphereRadius + 2, 0); // -4, 5, 0
    // y = 0 => the plane cuts it in half. So we *at least* want y = sphereRadius...
    // x = 0 => puts it in the center of the viewport, so we wanna move it left a bit...

    scene.add(mesh);
  }

  {
    // https://r105.threejsfundamentals.org/threejs/threejs-lights-directional.html
    let light = new THREE.DirectionalLight(0xffffff, 1);
    light.position.set(0, 10, 0); // 10 up
    light.target.position.set(-5, 0, 0); // shine from right to left
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

  // Set the scissor and viewport to each div.
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

    // return the aspect
    return width / height;
  }

  /**
   * Render the scene from the point of view of each camera,
   * using the scissor function
   * to only render to part of the canvas.
   */
  function render() {
    resizeRendererToDisplaySize(renderer);

    // turn on the scissor
    renderer.setScissorTest(true);

    // render the original view
    {
      let aspect = setScissorForElement(view1Elem);

      // adjust the camera for this aspect
      camera.aspect = aspect;
      camera.updateProjectionMatrix();
      cameraHelper.update();

      // don't draw the camera helper in the original view
      cameraHelper.visible = false;

      scene.background.set(0x000000);

      // render
      renderer.render(scene, camera);
    }

    // render from the 2nd camera
    {
      let aspect = setScissorForElement(view2Elem);

      // adjust the camera for this aspect
      camera2.aspect = aspect;
      camera2.updateProjectionMatrix();

      // draw the camera helper in the 2nd view
      cameraHelper.visible = true;

      scene.background.set(stratos);

      renderer.render(scene, camera2);
    }

    requestAnimationFrame(render);
  }

  requestAnimationFrame(render);
}

main();
