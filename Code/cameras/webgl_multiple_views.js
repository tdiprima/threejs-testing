import * as THREE from "three";
import Stats from "/jsm/libs/stats.module.js";

let stats;
let scene;
let renderer;
let mouseX = 0;
let mouseY = 0;
let windowWidth;
let windowHeight;

// ARRAY OF 3 VIEWS (CAMERAS)
const views = [
  {
    left: 0,
    bottom: 0,
    width: 0.5, // half screen
    height: 1.0, // full height
    // background: new THREE.Color(0.5, 0.5, 0.7),
    background: "#a980c0", // Purple Mountain's Majesty
    eye: [0, 300, 1800], // camera position
    up: [0, 1, 0], // y is vertical
    fov: 30, // 30 degrees
    updateCamera(camera, scene, mouseX) {
      // LOOKING STRAIGHT AT IT.
      // Camera movement based on mouse position:
      // Mouse to the right, +2000; mouse to the left, -2000.
      camera.position.x += mouseX * 0.05; // x +=
      camera.position.x = Math.max(Math.min(camera.position.x, 2000), -2000);
      camera.lookAt(scene.position);
    }
  },
  {
    left: 0.5, // start mid-screen
    bottom: 0, // bottom
    width: 0.5, // half width
    height: 0.5, // half height (so, quarter-screen)
    // background: new THREE.Color(0.7, 0.5, 0.5),
    background: "#bb7d7f", // Old Rose
    eye: [0, 1800, 0],
    up: [0, 0, 1], // z is vertical
    fov: 45,
    updateCamera(camera, scene, mouseX) {
      // ABOVE & BEHIND, LOOKING DOWN.
      // Mouse to the right, -2000; to the left, +2000.
      camera.position.x -= mouseX * 0.05; // x -=
      camera.position.x = Math.max(Math.min(camera.position.x, 2000), -2000);
      camera.lookAt(camera.position.clone().setY(0));
    }
  },
  {
    left: 0.5,
    bottom: 0.5, // its bottom is half-height (if that makes sense)
    width: 0.5,
    height: 0.5,
    // background: new THREE.Color(0.5, 0.7, 0.7),
    background: "#71b4b3", // Neptune
    eye: [1400, 800, 1400],
    up: [0, 1, 0], // y is vertical
    fov: 60,
    updateCamera(camera, scene, mouseX) {
      // CAMERA IS OFF TO THE RIGHT, AT AN ANGLE.
      // Now we're gonna move y up and down.
      // To the right, -1600; to the left, +1600.
      camera.position.y -= mouseX * 0.05; // y -=
      camera.position.y = Math.max(Math.min(camera.position.y, 1600), -1600);
      camera.lookAt(scene.position);
    }
  }
];

init();
animate();

function init() {
  const container = document.getElementById("container");

  // SET UP VIEWS & CAMERAS
  for (let ii = 0; ii < views.length; ++ii) {
    const view = views[ii];

    const camera = new THREE.PerspectiveCamera(
      view.fov,
      window.innerWidth / window.innerHeight,
      1,
      10000
    );

    camera.position.fromArray(view.eye);
    camera.up.fromArray(view.up);
    view.camera = camera;
    // console.log("camera", JSON.stringify(view));
  }

  scene = new THREE.Scene();

  const light = new THREE.DirectionalLight(0xffffff); // White light
  light.position.set(0, 0, 1);
  scene.add(light);

  // SHADOW - MAKE 3 SQUARES; UNDERNEATH EACH ICOSAHEDRON.
  const canvas = document.createElement("canvas");
  canvas.width = 128;
  canvas.height = 128;

  const context = canvas.getContext("2d");

  // ADD COLOR GRADIENT, SO IT'S NOT "SQUARE"
  const xx = canvas.width / 2;
  const yy = canvas.height / 2;

  // Draw a rectangle and fill with a radial/circular gradient:
  const gradient = context.createRadialGradient(
    xx, // x0
    yy, // y0
    0, // r0
    xx, // x1
    yy, // y1
    xx // r1
  );

  gradient.addColorStop(
    0.1, // position of the color stop (0 = start)
    "rgba(0,0,0,0.15)" // transparent-ish black
  );

  gradient.addColorStop(
    1, // end position
    "rgba(0,0,0,0)" // transparent
  );

  // Fill with gradient
  context.fillStyle = gradient;
  context.fillRect(0, 0, canvas.width, canvas.height);

  const shadowTexture = new THREE.CanvasTexture(canvas);

  const shadowMaterial = new THREE.MeshBasicMaterial({
    map: shadowTexture,
    transparent: true
  });

  const sizeOfShadow = 300;
  const shadowGeo = new THREE.PlaneGeometry(
    sizeOfShadow, // Width along the X axis.
    sizeOfShadow, // Width along the Y axis.
    1,
    1
  );

  let shadowMesh;

  // SHADOW 1 (middle)
  shadowMesh = new THREE.Mesh(shadowGeo, shadowMaterial);
  shadowMesh.position.y = -250;
  shadowMesh.rotation.x = -Math.PI / 2; // Quarter of a rotation
  scene.add(shadowMesh);

  // SHADOW 2 (left)
  shadowMesh = new THREE.Mesh(shadowGeo, shadowMaterial);
  shadowMesh.position.x = -400;
  shadowMesh.position.y = -250;
  shadowMesh.rotation.x = -Math.PI / 2;
  // Otherwise, it looks like a circle sticking out underneath the icosahedron.
  scene.add(shadowMesh);

  // SHADOW 3 (right)
  shadowMesh = new THREE.Mesh(shadowGeo, shadowMaterial);
  shadowMesh.position.x = 400;
  shadowMesh.position.y = -250;
  shadowMesh.rotation.x = -Math.PI / 2; // Make it look "flat" underneath.
  scene.add(shadowMesh);
  // END SHADOW

  const radius = 200;

  // ICOSAHEDRON1. Polyhedron with 20 faces.
  const geometry1 = new THREE.IcosahedronGeometry(radius, 1);

  const count = geometry1.attributes.position.count;
  geometry1.setAttribute("color", new THREE.BufferAttribute(new Float32Array(count * 3), 3));

  // ICOSAHEDRON2
  const geometry2 = geometry1.clone();

  // ICOSAHEDRON3
  const geometry3 = geometry1.clone();

  // COLOR ROUTINE
  const positions1 = geometry1.attributes.position;
  const positions2 = geometry2.attributes.position;
  const positions3 = geometry3.attributes.position;

  const colors1 = geometry1.attributes.color;
  const colors2 = geometry2.attributes.color;
  const colors3 = geometry3.attributes.color;

  let color = new THREE.Color();

  for (let i = 0; i < count; i++) {

    color.setHSL((positions1.getY(i) / radius + 1) / 2, 1.0, 0.5);
    colors1.setXYZ(i, color.r, color.g, color.b);

    color.setHSL(0, (positions2.getY(i) / radius + 1) / 2, 0.5);
    colors2.setXYZ(i, color.r, color.g, color.b);

    color.setRGB(1, 0.8 - (positions3.getY(i) / radius + 1) / 2, 0);
    colors3.setXYZ(i, color.r, color.g, color.b);

  }
  // END COLOR ROUTINE

  // MESH PHONG MATERIAL
  const material = new THREE.MeshPhongMaterial({
    color: 0xffffff,
    flatShading: true,
    vertexColors: true,
    shininess: 0
  });

  // WIRE FRAME = MESH BASIC MATERIAL
  const wireframeMaterial = new THREE.MeshBasicMaterial({
    color: 0x000000,
    wireframe: true,
    transparent: true
  });

  // ADD #1 (left)
  let mesh = new THREE.Mesh(geometry1, material);
  let wireframe = new THREE.Mesh(geometry1, wireframeMaterial);
  mesh.add(wireframe);
  mesh.position.x = -400; // position
  // mesh.rotation.x = -1.87; // rotation
  scene.add(mesh);

  // ADD #2 (right)
  mesh = new THREE.Mesh(geometry2, material);
  wireframe = new THREE.Mesh(geometry2, wireframeMaterial);
  mesh.add(wireframe);
  mesh.position.x = 400;
  scene.add(mesh);

  // ADD #3 (middle)
  mesh = new THREE.Mesh(geometry3, material);
  wireframe = new THREE.Mesh(geometry3, wireframeMaterial);
  mesh.add(wireframe);
  scene.add(mesh);

  // RENDERER
  renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setSize(window.innerWidth, window.innerHeight);
  container.appendChild(renderer.domElement);

  stats = new Stats();
  container.appendChild(stats.dom);

  document.addEventListener("mousemove", onDocumentMouseMove);
}

function onDocumentMouseMove(event) {
  mouseX = event.clientX - windowWidth / 2;
  mouseY = event.clientY - windowHeight / 2;
}

function updateSize() {
  if (windowWidth !== window.innerWidth || windowHeight !== window.innerHeight) {
    windowWidth = window.innerWidth;
    windowHeight = window.innerHeight;
    renderer.setSize(windowWidth, windowHeight);
  }
}

function animate() {
  render();
  stats.update();
  requestAnimationFrame(animate);
}

function render() {
  updateSize();

  // FOR EACH VIEW:
  // Update cameras and set Scissor & Viewport
  for (let ii = 0; ii < views.length; ++ii) {
    const view = views[ii];
    const camera = view.camera;

    view.updateCamera(camera, scene, mouseX, mouseY);

    const left = Math.floor(windowWidth * view.left);
    const bottom = Math.floor(windowHeight * view.bottom);
    const width = Math.floor(windowWidth * view.width);
    const height = Math.floor(windowHeight * view.height);

    renderer.setViewport(left, bottom, width, height);
    renderer.setScissor(left, bottom, width, height);
    renderer.setScissorTest(true); // SCISSOR TEST = ON
    renderer.setClearColor(view.background);

    camera.aspect = width / height;
    camera.updateProjectionMatrix();

    renderer.render(scene, camera);
  }
}
