import * as THREE from "three";
import {OrbitControls} from "three/addons/controls/OrbitControls.js";

function main() {
  let canvas = document.querySelector("#c");
  let renderer = new THREE.WebGLRenderer({ canvas });

  let fov = 45;
  let aspect = 2; // the canvas default
  let near = 0.1;
  let far = 100;
  let camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
  camera.position.set(0, 10, 20);

  let cameraHelper = new THREE.CameraHelper(camera);

  let controls = new OrbitControls(camera, canvas);
  controls.target.set(0, 5, 0);
  controls.update();

  let scene = new THREE.Scene();
  scene.background = new THREE.Color("black");

  scene.add(cameraHelper);

  {
    let planeSize = 40;

    let loader = new THREE.TextureLoader();
    let texture = loader.load("../3d-model-load/assets/checker.png");
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
    let color = 0xffffff;
    let intensity = 1;
    let light = new THREE.DirectionalLight(color, intensity);
    light.position.set(0, 10, 0);
    light.target.position.set(-5, 0, 0);
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
      camera.updateProjectionMatrix();
    }

    renderer.render(scene, camera);

    requestAnimationFrame(render);
  }

  requestAnimationFrame(render);
}

main();
