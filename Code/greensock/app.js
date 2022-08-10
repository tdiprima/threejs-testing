let scene = new THREE.Scene();

let camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.z = 5;

let renderer = new THREE.WebGLRenderer({antialias: true});
renderer.setClearColor("#e5e5e5");
renderer.setSize(window.innerWidth, window.innerHeight);

document.body.appendChild(renderer.domElement);

window.addEventListener('resize', () => {
  renderer.setSize(window.innerWidth, window.innerHeight);
  camera.aspect = window.innerWidth / window.innerHeight;

  camera.updateProjectionMatrix();
});

let raycaster = new THREE.Raycaster();
let mouse = new THREE.Vector2();

let geometry = new THREE.BoxGeometry(1, 1, 1); // x, y, z scale
let material = new THREE.MeshLambertMaterial({color: 0xffcc00});
let mesh = new THREE.Mesh(geometry, material);

scene.add(mesh);

let light = new THREE.PointLight(0xffffff, 1, 500);
light.position.set(10, 0, 25);
scene.add(light);

let render = function () {
  requestAnimationFrame(render);

  renderer.render(scene, camera);
};

function onMouseMove(event) {
  event.preventDefault();

  // This is how we get our mouse position
  mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
  mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

  raycaster.setFromCamera(mouse, camera);

  let intersects = raycaster.intersectObjects(scene.children, true);
  for (let i = 0; i < intersects.length; i++) {
    intersects[i].object.material.color.set(0xff0000);
  }
}

render();

this.tl = new TimelineMax({paused: true});
this.tl.to(mesh.scale, 1, {x: 2, ease: Expo.easeOut});
this.tl.to(mesh.scale, 0.5, {x: 0.5, ease: Expo.easeOut});
this.tl.to(mesh.position, 0.5, {x: 2, ease: Expo.easeOut});
this.tl.to(mesh.position, 0.5, {y: Math.PI * 0.5, ease: Expo.easeOut});
document.body.addEventListener("click", () => {
  this.tl.play();
});

window.addEventListener('mousemove', onMouseMove);

