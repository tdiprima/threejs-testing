let scene, camera, renderer, controls;
let mesh, texture, canvasTexture, canvas, context;
let annotations = [];
let intersection;
let isDrawing = false;

function init() {
  scene = new THREE.Scene();

  camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
  camera.position.z = 1;

  renderer = new THREE.WebGLRenderer();
  renderer.setSize(window.innerWidth, window.innerHeight);
  document.body.appendChild(renderer.domElement);

  controls = new THREE.OrbitControls(camera, renderer.domElement);

  // Either way.  The trick to getting the image to show, is to
  // do the wrong thing (not connect the canvas with the image)!
  const loader = new THREE.TextureLoader();
  loader.load("/Code/portfolio/squirrel_portfolio/squirrel.jpg",
    function(texture) {
      const geometry = new THREE.PlaneGeometry(1, 1);

      canvas = document.createElement("canvas");
      canvas.width = texture.image.width;
      canvas.height = texture.image.height;

      context = canvas.getContext("2d");
      canvasTexture = new THREE.CanvasTexture(canvas);

      // TODO: TESTING
      // const material = new THREE.MeshBasicMaterial({ map: canvasTexture });
      const material = new THREE.MeshBasicMaterial({ map: texture });
      mesh = new THREE.Mesh(geometry, material);
      scene.add(mesh);
    },
    undefined,
    function(error) {
      console.error("An error happened", error);
    }
  );

  /*
  {
    canvas = document.createElement("canvas");
    // canvas.width = 1024;
    // canvas.height = 1024;
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    context = canvas.getContext("2d");
    canvasTexture = new THREE.CanvasTexture(canvas);
    const material = new THREE.MeshBasicMaterial({ map: canvasTexture });

    let texture = new THREE.TextureLoader().load("/Code/portfolio/squirrel_portfolio/squirrel.jpg");
    texture.minFilter = THREE.LinearFilter;
    let material1 = new THREE.MeshBasicMaterial({ map: texture });
    mesh = new THREE.Mesh(new THREE.PlaneGeometry(1, 1), material1);
    scene.add(mesh);
  }
  */

  window.addEventListener("mousedown", startDrawing);
  window.addEventListener("mousemove", draw);
  window.addEventListener("mouseup", stopDrawing);
}

function startDrawing(event) {
  isDrawing = true;
  currentX = event.offsetX;
  currentY = event.offsetY;
}

function draw(event) {
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
  isDrawing = false;
}

function animate() {
  requestAnimationFrame(animate);
  controls.update();
  renderer.render(scene, camera);
  drawAnnotations();
}

function drawAnnotations() {
  if (!mesh) {
    return;
  }

  context.clearRect(0, 0, canvas.width, canvas.height);
  for (let i = 0; i < annotations.length; i++) {
    let x = annotations[i].x * canvas.width;
    let y = (1 - annotations[i].y) * canvas.height;
    context.beginPath();
    context.arc(x, y, 5, 0, Math.PI * 2);
    context.fillStyle = "#FF0000";
    context.fill();
  }
  canvasTexture.needsUpdate = true;
}

window.addEventListener("mousedown", addAnnotation);

// TODO
// document.getElementById("text-input").addEventListener("blur", addAnnotation)

function addAnnotation(event) {
  if (!mesh) {
    return;
  }
  let rect = event.target.getBoundingClientRect();
  let x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
  let y = -((event.clientY - rect.top) / rect.height) * 2 + 1;
  // Global variable (yes, I forget why)
  intersection = getIntersection(x, y);
  if (intersection) {
    let annotation = {
      x: intersection.uv.x,
      y: intersection.uv.y
    };
    annotations.push(annotation);
  }
}

function getIntersection(x, y) {
  const raycaster = new THREE.Raycaster();
  raycaster.setFromCamera({ x, y }, camera);
  const intersects = raycaster.intersectObjects([mesh]);
  if (intersects.length > 0) {
    return intersects[0];
  } else {
    return null;
  }
}

function addAnnotationMesh(annotation) {
  let geometry = new THREE.PlaneGeometry(0.2, 0.2);
  let material = new THREE.MeshBasicMaterial({ color: 0xff0000 });
  let annotationMesh = new THREE.Mesh(geometry, material);
  annotationMesh.position.set(
    annotation.x * canvas.width - canvas.width / 2,
    canvas.height / 2 - annotation.y * canvas.height,
    0.01
  );
  mesh.add(annotationMesh);
}

function addAnnotation(event) {
  if (!mesh) {
    return;
  }
  let rect = event.target.getBoundingClientRect();
  let x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
  let y = -((event.clientY - rect.top) / rect.height) * 2 + 1;
  let intersection = getIntersection(x, y);
  if (intersection) {
    let annotation = {
      x: intersection.uv.x,
      y: intersection.uv.y
    };
    annotations.push(annotation);
    addAnnotationMesh(annotation);
  }
}

init();
animate();