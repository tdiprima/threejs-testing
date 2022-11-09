// Three JS Template
console.clear();
console.log(`%cREV ${THREE.REVISION}`, "color: #ccff00;");
// ----------------------------------------------------------------- BASIC parameters
const tintColor = "#000";
let renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);

if (window.innerWidth > 800) {
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFSoftShadowMap;
  renderer.shadowMap.needsUpdate = true;
}
//---

document.body.appendChild(renderer.domElement);

window.addEventListener("resize", onWindowResize, false);

function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
}

let camera = new THREE.PerspectiveCamera(20, window.innerWidth / window.innerHeight, 1, 500);
camera.position.set(0, 2, 14);

let scene = new THREE.Scene();
let city = new THREE.Object3D();
let smoke = new THREE.Object3D();
let town = new THREE.Object3D();

let createCarPos = true;
let uSpeed = 0.001;

// ----------------------------------------------------------------- FOG background
let skyColor = "#f02050";
// let skyColor = "#F2F111";
// let skyColor = "#FF6347";
scene.background = new THREE.Color(skyColor);
scene.fog = new THREE.Fog(skyColor, 10, 16);

// ----------------------------------------------------------------- RANDOM Function
function mathRandom(num = 8) {
  let numValue = -Math.random() * num + Math.random() * num;
  return numValue;
}

// ----------------------------------------------------------------- CHANGE building colors
let setTintNum = true;
function setTintColor() {
  if (setTintNum) {
    setTintNum = false;
    // tintColor = 0x000000;
  } else {
    setTintNum = true;
    // tintColor = 0x000000;
  }
  // tintColor = 0x222222; // Dark, dark gray.
  return tintColor;
}

// ----------------------------------------------------------------- CREATE City
function init() {
  let segments = 2;
  for (let i = 1; i < 100; i++) {
    let geometry = new THREE.CubeGeometry(1, 0, 0, segments, segments, segments);
    let material = new THREE.MeshStandardMaterial({
      color: setTintColor(),
      wireframe: false,
      // shading: THREE.SmoothShading,
      flatShading: true,
      side: THREE.DoubleSide
    });

    let wmaterial = new THREE.MeshLambertMaterial({
      color: "#ffffff",
      wireframe: true,
      transparent: true,
      opacity: 0.03,
      side: THREE.DoubleSide
    });

    let cube = new THREE.Mesh(geometry, material);
    cube.add(new THREE.Mesh(geometry, wmaterial)); // "w floor"
    cube.castShadow = true;
    cube.receiveShadow = true;
    cube.rotationValue = 0.1 + Math.abs(mathRandom(8));

    let floor = new THREE.Mesh(geometry, material);
    floor.scale.y = 0.05;
    cube.scale.y = 0.1 + Math.abs(mathRandom(8));

    let cubeWidth = 0.9;
    cube.scale.x = cube.scale.z = cubeWidth + mathRandom(1 - cubeWidth);
    cube.position.x = Math.round(mathRandom());
    cube.position.z = Math.round(mathRandom());

    floor.position.set(cube.position.x, 0, cube.position.z);

    town.add(floor);
    town.add(cube);
  }
  // ----------------------------------------------------------------- Particular
  let gmaterial = new THREE.MeshToonMaterial({ color: 0xffff00, side: THREE.DoubleSide });
  let gparticular = new THREE.CircleGeometry(0.01, 3);
  let aparticular = 5;

  // PARTICLES
  for (let h = 1; h < 300; h++) {
    let particular = new THREE.Mesh(gparticular, gmaterial);
    particular.position.set(mathRandom(aparticular), mathRandom(aparticular), mathRandom(aparticular));
    particular.rotation.set(mathRandom(), mathRandom(), mathRandom());
    smoke.add(particular);
  }

  let pmaterial = new THREE.MeshPhongMaterial({
    color: 0x000000,
    side: THREE.DoubleSide,
    opacity: 0.9,
    transparent: true
  });

  let pgeometry = new THREE.PlaneGeometry(60, 60);
  let pelement = new THREE.Mesh(pgeometry, pmaterial);
  pelement.rotation.x = (-90 * Math.PI) / 180;
  pelement.position.y = -0.001;
  pelement.receiveShadow = true;

  city.add(pelement);
}

// ----------------------------------------------------------------- MOUSE function
let raycaster = new THREE.Raycaster();
let mouse = new THREE.Vector2();

function onMouseMove(event) {
  event.preventDefault();
  mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
  mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
}

function onDocumentTouchStart(event) {
  if (event.touches.length == 1) {
    event.preventDefault();
    mouse.x = event.touches[0].pageX - window.innerWidth / 2;
    mouse.y = event.touches[0].pageY - window.innerHeight / 2;
  }
}

function onDocumentTouchMove(event) {
  if (event.touches.length == 1) {
    event.preventDefault();
    mouse.x = event.touches[0].pageX - window.innerWidth / 2;
    mouse.y = event.touches[0].pageY - window.innerHeight / 2;
  }
}

window.addEventListener("mousemove", onMouseMove, false);
window.addEventListener("touchstart", onDocumentTouchStart, false);
window.addEventListener("touchmove", onDocumentTouchMove, false);

// ----------------------------------------------------------------- Lights
let ambientLight = new THREE.AmbientLight(0xffffff, 4);

let lightFront = new THREE.SpotLight(
  0xffffff,
  20, // intensity
  10  // distance
);

let lightBack = new THREE.PointLight(0xffffff, 0.5);

// let spotLightHelper = new THREE.SpotLightHelper(lightFront);
// scene.add( spotLightHelper );

lightFront.rotation.x = (45 * Math.PI) / 180;
lightFront.rotation.z = (-45 * Math.PI) / 180;

lightFront.position.set(5, 5, 5);

lightFront.castShadow = true;

const size = 6000;
const vec = new THREE.Vector2( size, size );
lightFront.shadow.mapSize = vec;

lightFront.penumbra = 0.1;
lightBack.position.set(0, 6, 0);

smoke.position.y = 2;

scene.add(ambientLight);
city.add(lightFront);
scene.add(lightBack);
scene.add(city);
city.add(smoke);
city.add(town);

// ----------------------------------------------------------------- GRID Helper
let gridHelper = new THREE.GridHelper(60, 120, "#ff0000", "#000000");
city.add(gridHelper);

// ----------------------------------------------------------------- LINES world
// CARS; HOMER 3D ZOOM LINES
let createCars = function(cScale = 2, cPos = 20, cColor = 0xffff00) {
  let cMat = new THREE.MeshToonMaterial({ color: cColor, side: THREE.DoubleSide });
  let cGeo = new THREE.CubeGeometry(1, cScale / 40, cScale / 40);
  let cElem = new THREE.Mesh(cGeo, cMat);
  let cAmp = 3;

  if (createCarPos) {
    createCarPos = false;
    cElem.position.x = -cPos;
    cElem.position.z = mathRandom(cAmp);

    TweenMax.to(cElem.position, 3, { x: cPos, repeat: -1, yoyo: true, delay: mathRandom(3) });
  } else {
    createCarPos = true;
    cElem.position.x = mathRandom(cAmp);
    cElem.position.z = -cPos;
    cElem.rotation.y = (90 * Math.PI) / 180;

    TweenMax.to(cElem.position, 5, { z: cPos, repeat: -1, yoyo: true, delay: mathRandom(3), ease: Power1.easeInOut });
  }
  cElem.receiveShadow = true;
  cElem.castShadow = true;
  cElem.position.y = Math.abs(mathRandom(5));
  city.add(cElem);
};

let generateLines = function() {
  for (let i = 0; i < 60; i++) {
    createCars(0.1, 20);
  }
};

// ----------------------------------------------------------------- ANIMATE
let animate = function() {
  requestAnimationFrame(animate);

  city.rotation.y -= (mouse.x * 8 - camera.rotation.y) * uSpeed;
  city.rotation.x -= (-(mouse.y * 2) - camera.rotation.x) * uSpeed;

  if (city.rotation.x < -0.05) city.rotation.x = -0.05;
  else if (city.rotation.x > 1) city.rotation.x = 1;

  smoke.rotation.y += 0.01;
  smoke.rotation.x += 0.01;

  camera.lookAt(city.position);
  renderer.render(scene, camera);
};

// ----------------------------------------------------------------- START functions
generateLines();
init();
animate();
