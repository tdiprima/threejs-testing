let IMAGE = "/textures/images/uv_grid_opengl.jpg";

// Set up the scene, camera and renderer
let scene = new THREE.Scene();
let camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.z = 5;

let renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Load the image texture
let textureLoader = new THREE.TextureLoader();
textureLoader.load(IMAGE, texture => {
  let material = new THREE.MeshBasicMaterial({ map: texture });
  let geometry = new THREE.PlaneGeometry(2, 2);
  let mesh = new THREE.Mesh(geometry, material);
  scene.add(mesh);

  // Handle mouse events to change pixel colors
  let canvas = document.createElement("canvas");
  let context = canvas.getContext("2d");
  let mouseDown = false;
  let pixelData;
  let color;

  // TODO: Change what's listening
  mesh.addEventListener("mousedown", event => {
    console.log("%cmousedown", "color: #ccff00;");
    mouseDown = true;
    // Call the function that gets the pixel data and sets the color
    pixelData = getPixelData(event, mesh, context);
    color = new THREE.Color(`rgb(${pixelData.data[0]}, ${pixelData.data[1]}, ${pixelData.data[2]})`);
    color.offsetHSL(0, 0.5, 0);
  });

  mesh.addEventListener("mousemove", event => {
    console.log("%cmousemove", "color: #ff00cc;");
    // mousemove event is detected and the mouse button is down
    if (mouseDown) {
      // Call the function that changes the pixel colors
      let newPixelData = getPixelData(event, mesh, context);
      newPixelData.data[0] = color.r * 255;
      newPixelData.data[1] = color.g * 255;
      newPixelData.data[2] = color.b * 255;
      context.putImageData(newPixelData, 0, 0);
      texture.needsUpdate = true;
    }
  });

  mesh.addEventListener("mouseup", () => {
    // The mousedown flag is set to false.
    mouseDown = false;
  });

  function getPixelData(event, mesh, context) {
    let uv = event.uv;
    let texture = mesh.material.map;
    let image = texture.image;
    canvas.width = image.width;
    canvas.height = image.height;
    context.drawImage(image, 0, 0);
    return context.getImageData(uv.x * image.width, uv.y * image.height, 1, 1);
  }
});

// Render the scene
/* Resize Event */
window.addEventListener("resize", () => {
  renderer.setSize(window.innerWidth, window.innerHeight);
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.render(scene, camera);
});

/* Animate */
(function animate() {
  requestAnimationFrame(animate);
  renderer.render(scene, camera);
})();
