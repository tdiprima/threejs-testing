// Load image and change colors, use image.onload()
let IMAGE = "uv_grid_opengl.jpg";

let scene = new THREE.Scene();
let camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.z = 5;

let renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Create a new image object
let image = new Image();

// todo: note, anytime anyone wants an image
// image.src = "https://example.com/image.png";

// Set the source of the image
image.src = IMAGE;

// Wait for the image to load
image.onload = function() {
  // Create a canvas element
  let canvas = document.createElement("canvas");
  canvas.width = image.width;
  canvas.height = image.height;

  // Get the 2D context of the canvas
  let context = canvas.getContext("2d");

  // Draw the image on the canvas
  context.drawImage(image, 0, 0);

  // Get the pixel data of the canvas
  let imageData = context.getImageData(0, 0, canvas.width, canvas.height);
  let data = imageData.data;

  // Manipulate each pixel
  for (let i = 0; i < data.length; i += 4) {
    // Manipulate the red, green, blue, and alpha values as desired
    // For example, set the red value to 255 to create a red tint
    data[i] = 255;

    // Get the red, green, blue, and alpha values of the pixel
    // let red = data[i];
    // let green = data[i + 1];
    // let blue = data[i + 2];
    // let alpha = data[i + 3];

    // Alternatively, invert the colors by subtracting the current values from 255
    // data[i] = 255 - red;
    // data[i + 1] = 255 - green;
    // data[i + 2] = 255 - blue;
  }

  // Set the modified pixel data back on the canvas
  context.putImageData(imageData, 0, 0);

  // Create a new texture from the modified canvas
  let texture = new THREE.Texture(canvas);
  texture.needsUpdate = true;

  // Use the texture in a material
  let material = new THREE.MeshBasicMaterial({
    map: texture
  });

  let geometry = new THREE.PlaneGeometry(5, 5);

  // Create a mesh and add it to the scene
  let mesh = new THREE.Mesh(geometry, material);
  scene.add(mesh);
};

/* Resize Event */
window.addEventListener("resize", function() {
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
