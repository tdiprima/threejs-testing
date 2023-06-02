const IMAGE = "uv_grid_opengl.jpg";
let scene, camera, renderer;

// Create a new image object
var image = new Image();

// Set the source of the image
// image.src = "https://example.com/image.png";
image.src = IMAGE;

// Wait for the image to load
image.onload = function() {

  // Create a canvas element
  var canvas = document.createElement("canvas");
  canvas.width = image.width;
  canvas.height = image.height;

  // Get the 2D context of the canvas
  var context = canvas.getContext("2d");

  // Draw the image on the canvas
  context.drawImage(image, 0, 0);

  // Get the pixel data of the canvas
  var imageData = context.getImageData(0, 0, canvas.width, canvas.height);
  var data = imageData.data;

  // Manipulate each pixel
  for (var i = 0; i < data.length; i += 4) {
    // Manipulate the red, green, blue, and alpha values as desired
    // For example, set the red value to 255 to create a red tint
    data[i] = 255;

    // Get the red, green, blue, and alpha values of the pixel
    // var red = data[i];
    // var green = data[i + 1];
    // var blue = data[i + 2];
    // var alpha = data[i + 3];

    // Alternatively, invert the colors by subtracting the current values from 255
    // data[i] = 255 - red;
    // data[i + 1] = 255 - green;
    // data[i + 2] = 255 - blue;
  }

  // Set the modified pixel data back on the canvas
  context.putImageData(imageData, 0, 0);

  // Create a new texture from the modified canvas
  var texture = new THREE.Texture(canvas);
  texture.needsUpdate = true;

  // Use the texture in a material
  var material = new THREE.MeshBasicMaterial({
    map: texture
  });

  // TODO: DOESN'T WORK BECAUSE THERE'S NO GEOMETRY, SCENE, CAMERA, RENDERER,
  //  NO LIGHTS, NOTHING.  AND WHERE'S OUR ANIMATE FUNCTION??

  scene = new THREE.Scene();
  camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
  camera.position.z = 5;

  renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setSize(window.innerWidth, window.innerHeight);
  document.body.appendChild(renderer.domElement);

  const geometry = new THREE.PlaneGeometry(5, 5);

  // Create a mesh and add it to the scene
  var mesh = new THREE.Mesh(geometry, material);
  scene.add(mesh);
};

const animate = () => {
  requestAnimationFrame(animate);
  renderer.render(scene, camera);
};
animate();