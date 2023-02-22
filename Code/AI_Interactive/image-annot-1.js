// TODO: CANVAS.addEventListener does not work. Using window for now.
let scene, camera, renderer, controls;
let texture, material, mesh;
let canvas, context;
let isDrawing = false;
let currentX = 0, currentY = 0;
let annotations = [];

function init() {
  scene = new THREE.Scene();

  camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 1000);
  camera.position.set(0, 0, 3);

  renderer = new THREE.WebGLRenderer();
  renderer.setSize(window.innerWidth, window.innerHeight);
  document.body.appendChild(renderer.domElement);

  controls = new THREE.OrbitControls(camera, renderer.domElement);

  // let loader = new THREE.TextureLoader();
  // loader.load("../portfolio/squirrel_portfolio/squirrel.jpg", function(texture) {
  //   texture.minFilter = THREE.LinearFilter;
  //   material = new THREE.MeshBasicMaterial({ map: texture });
  //   mesh = new THREE.Mesh(new THREE.PlaneGeometry(1, 1), material);
  //   console.log(mesh)
  //   scene.add(mesh);
  //   // Resize plane to fit image aspect ratio
  //   let aspect = texture.image.width / texture.image.height;
  //   mesh.scale.set(aspect, 1, 1);
  // });
  
  // Doing it like this instead, allowed the image to be drawn to the scene.  Because now "mesh" is defined.
  // See above - the log didn't print, so it hadn't even run yet, but we tried to use it.
  let texture = new THREE.TextureLoader().load("../portfolio/squirrel_portfolio/squirrel.jpg");
  texture.minFilter = THREE.LinearFilter;
  material = new THREE.MeshBasicMaterial({ map: texture });
  mesh = new THREE.Mesh(new THREE.PlaneGeometry(1, 1), material);
  scene.add(mesh);

  // Create canvas for drawing and annotations
  canvas = document.createElement("canvas");
  canvas.width = 1024; // window.innerWidth
  canvas.height = 1024; // window.innerHeight
  context = canvas.getContext("2d");
  context.strokeStyle = "#FF0000";
  context.lineWidth = 5;

  // Event listeners for drawing
  window.addEventListener("mousedown", startDrawing);
  window.addEventListener("mousemove", draw);
  window.addEventListener("mouseup", stopDrawing);
  window.addEventListener("mouseout", stopDrawing);

  // Add canvas to scene as texture
  let annotationTexture = new THREE.CanvasTexture(canvas);
  let annotationMaterial = new THREE.MeshBasicMaterial({
    map: annotationTexture,
    transparent: true
  });

  let annotationMesh = new THREE.Mesh(new THREE.PlaneGeometry(1, 1), annotationMaterial);
  annotationMesh.position.set(0, 0, -0.01);
  mesh.add(annotationMesh);

  // Event listener for annotations
  window.addEventListener("click", function(event) {
    // console.log("click");
    let x = event.offsetX / canvas.width;
    let y = 1 - (event.offsetY / canvas.height);
    annotations.push({
      x: x,
      y: y
    });
    drawAnnotations();
  });
}

function animate() {
  requestAnimationFrame(animate);
  controls.update();
  renderer.render(scene, camera);
}

function startDrawing(event) {
  // console.log("start");
  isDrawing = true;
  currentX = event.offsetX;
  currentY = event.offsetY;
}

function draw(event) {
  // console.log("draw");
  if (isDrawing) {
    let x = event.offsetX;
    let y = event.offsetY;
    context.beginPath();
    context.moveTo(currentX, currentY);
    context.lineTo(x, y);
    context.stroke();
    currentX = x;
    currentY = y;
  }
}

function stopDrawing(event) {
  // console.log("stop");
  isDrawing = false;
}

function drawAnnotations() {
  // console.log("draw a");
  context.clearRect(0, 0, canvas.width, canvas.height);
  for (let i = 0; i < annotations.length; i++) {
    let x = annotations[i].x * canvas.width;
    let y = (1 - annotations[i].y) * canvas.height;
    context.beginPath();
    context.arc(x, y, 5, 0, Math.PI * 2);
    context.fillStyle = "#FF0000";
    context.fill();
  }
}

init();
animate();
