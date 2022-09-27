// <script src="/build/three.min.js"></script>
const tau = Math.PI * 2;

let scene = new THREE.Scene();
scene.background = new THREE.Color(0x444444);

let camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 50);
camera.position.z = 30;

let renderer = new THREE.WebGLRenderer({antialias: true});
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

let data = {
  radius: 10,
  segments: 10,
  thetaStart: 0,
  thetaLength: tau
};

let geometry = new THREE.CircleGeometry(data.radius, data.segments, data.thetaStart, data.thetaLength);

let group = new THREE.Group();
let lineMaterial = new THREE.LineBasicMaterial({color: 0xff0000, transparent: false, opacity: 1});
group.add(new THREE.LineSegments(geometry, lineMaterial));
scene.add(group);

let material = new THREE.MeshBasicMaterial({color: 0x0000ff});
let circle = new THREE.Mesh(geometry, material);
scene.add(circle);

function animate() {
  requestAnimationFrame(animate);
  renderer.render(scene, camera);
}

animate();

window.addEventListener("resize", function () {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
}, false);
