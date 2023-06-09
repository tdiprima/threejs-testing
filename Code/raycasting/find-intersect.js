import * as THREE from "three";

let INTERSECTED;
let pointer = new THREE.Vector2();

let scene = new THREE.Scene();
scene.background = new THREE.Color(0x8973f8);

let camera = new THREE.PerspectiveCamera(70, window.innerWidth / window.innerHeight, 1, 1000);
camera.position.z = 10;

let container = document.createElement("div");
document.body.appendChild(container);

let renderer = new THREE.WebGLRenderer();
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
container.appendChild(renderer.domElement);

// It's basically the same as "simple", except we're changing its position, etc.
let object = new THREE.Mesh(
  new THREE.BoxGeometry(20, 20, 20),
  new THREE.MeshBasicMaterial({ color: 0x00ffbe })
);

object.position.x = 128;
object.position.y = 120;
object.position.z = -278;

object.rotation.x = 4;
object.rotation.y = 1;
object.rotation.z = 4;

object.scale.x = 1.5;
object.scale.y = 1.2;
object.scale.z = 1.2;

scene.add(object);

let raycaster = new THREE.Raycaster();

function onPointerMove(event) {
  pointer.x = (event.clientX / window.innerWidth) * 2 - 1;
  pointer.y = -(event.clientY / window.innerHeight) * 2 + 1;
}

document.addEventListener("mousemove", onPointerMove);

function check(material) {
  if (material.emissive) {
    material.emissive.setHex(INTERSECTED.currentHex);
  } else {
    material.color.setHex(INTERSECTED.currentHex);
  }
}

function check2(material) {
  if (material.emissive) {
    INTERSECTED.currentHex = INTERSECTED.material.emissive.getHex();
    material.emissive.setHex(0xff0000);
  } else {
    INTERSECTED.currentHex = material.color.getHex();
    material.color.setHex(0xff0000);
  }
}

// Can't access property "setHex", INTERSECTED.material.emissive is undefined.
// Because MeshLambertMaterial has an emissive property, but MeshBasicMaterial doesn't!
function findIntersection() {
  raycaster.setFromCamera(pointer, camera);

  let intersects = raycaster.intersectObjects(scene.children);

  if (intersects.length > 0) {
    if (INTERSECTED !== intersects[0].object) {
      if (INTERSECTED) {
        check(INTERSECTED.material);
      }
      INTERSECTED = intersects[0].object;
      check2(INTERSECTED.material);
      // console.log(INTERSECTED.position);
      // console.log(JSON.stringify(INTERSECTED));
    }
  } else {
    if (INTERSECTED) {
      check(INTERSECTED.material);
    }
    INTERSECTED = null;
  }
}

function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
}

window.addEventListener("resize", onWindowResize);

function render() {
  findIntersection();
  renderer.render(scene, camera);
}

function animate() {
  requestAnimationFrame(animate);
  render();
}

animate();
