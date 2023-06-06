let scene, camera, renderer, controls;
let texture, material, mesh;
let canvas, context;
let isDrawing = false;
let currentX = 0, currentY = 0;
let annotations = [];
const imgUrl = "/Code/portfolio/squirrel_portfolio/squirrel.jpg";

function init() {
  scene = new THREE.Scene();

  camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 1000);
  camera.position.set(0, 0, 3);

  renderer = new THREE.WebGLRenderer();
  renderer.setSize(window.innerWidth, window.innerHeight);
  document.body.appendChild(renderer.domElement);

  // todo: uncomment controls
  // controls = new THREE.OrbitControls(camera, renderer.domElement);

  const loader = new THREE.TextureLoader();
  // loader.load(imgUrl, texture => {
  //   texture.minFilter = THREE.LinearFilter;
  //   material = new THREE.MeshBasicMaterial({ map: texture });
  //   mesh = new THREE.Mesh(new THREE.PlaneGeometry(1, 1), material);
  //   scene.add(mesh);
  //
  //   // Resize plane to fit image aspect ratio
  //   const aspect = texture.image.width / texture.image.height;
  //   console.log("aspect", aspect); // Aspect ratio is 1
  //   mesh.scale.set(aspect, 1, 1);
  // });

  let texture = loader.load(imgUrl);
  texture.minFilter = THREE.LinearFilter;
  material = new THREE.MeshBasicMaterial({ map: texture });
  mesh = new THREE.Mesh(new THREE.PlaneGeometry(1, 1), material);
  scene.add(mesh);

  // Create canvas for drawing and annotations
  canvas = document.createElement('canvas');
  canvas.width = window.innerWidth; // 1024
  canvas.height = window.innerHeight; // 1024
  context = canvas.getContext('2d');
  context.strokeStyle = '#FF0000';
  context.lineWidth = 5;

  function startDrawing(event) {
    isDrawing = true;
    currentX = event.offsetX;
    currentY = event.offsetY;
  }

  function stopDrawing(event) {
    isDrawing = false;
  }

  function drawAnnotations() {
    context.clearRect(0, 0, canvas.width, canvas.height);
    for (let i = 0; i < annotations.length; i++) {
      const x = annotations[i].x * canvas.width;
      const y = (1 - annotations[i].y) * canvas.height;
      context.beginPath();
      context.arc(x, y, 5, 0, Math.PI * 2);
      context.fillStyle = '#FF0000';
      context.fill();
    }
  }

  function draw(event) {
    if (isDrawing) {
      const x = event.offsetX;
      const y = event.offsetY;
      context.beginPath();
      context.moveTo(currentX, currentY);
      context.lineTo(x, y);
      context.stroke();
      currentX = x;
      currentY = y;
    }
  }

  // Event listeners for drawing
  // Changed: canvas.addEventListener
  renderer.domElement.addEventListener('mousedown', startDrawing);
  renderer.domElement.addEventListener('mousemove', draw);
  renderer.domElement.addEventListener('mouseup', stopDrawing);
  renderer.domElement.addEventListener('mouseout', stopDrawing);

  // Add canvas to scene as texture
  const annotationTexture = new THREE.CanvasTexture(canvas);
  const annotationMaterial = new THREE.MeshBasicMaterial({
    map: annotationTexture,
    transparent: true
  });

  const annotationMesh = new THREE.Mesh(new THREE.PlaneGeometry(1, 1), annotationMaterial);
  annotationMesh.position.set(0, 0, -0.01);
  mesh.add(annotationMesh);

  // Event listener for annotations
  renderer.domElement.addEventListener('click', event => {
    // todo: mousedown instead of click
    const x = event.offsetX / canvas.width;
    const y = 1 - event.offsetY / canvas.height;
    // const y = 1 - (event.offsetY / canvas.height);
    annotations.push({
      x: x,
      y: y
    });
    drawAnnotations();
  });
}

function animate() {
  requestAnimationFrame(animate);
  // todo: uncomment controls
  // controls.update();
  renderer.render(scene, camera);
}

init();
animate();
