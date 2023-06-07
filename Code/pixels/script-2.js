// Use texture loader, change colors on mouse move
let IMAGE = "uv_grid_opengl.jpg";
// let IMAGE = "https://threejs.org/examples/textures/uv_grid_opengl.jpg";

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
  // Create a mesh with the material containing the image texture
  let mesh = new THREE.Mesh(geometry, material);
  scene.add(mesh);
});

// Handle mouse move event to change pixel colors
window.addEventListener("mousemove", event => {
  // Get the mouse position in the scene
  let mouse = new THREE.Vector2(
    (event.clientX / window.innerWidth) * 2 - 1,
    -(event.clientY / window.innerHeight) * 2 + 1
  );

  let raycaster = new THREE.Raycaster();
  raycaster.setFromCamera(mouse, camera);

  // Use a Raycaster to find the intersected face of the mesh
  let intersects = raycaster.intersectObjects(scene.children, true);
  if (intersects.length > 0) {
    console.log("hello?");
    let face = intersects[0].face;
    let mesh = intersects[0].object;
    let uv = face.uv; // TODO: UV IS UNDEFINED
    let texture = mesh.material.map;
    // let pixelBuffer = new Uint8Array(4);

    texture.image.onload = () => {
      // TODO: IT NEVER GETS HERE.
      let canvas = document.createElement("canvas");
      canvas.width = texture.image.width;
      canvas.height = texture.image.height;

      let context = canvas.getContext("2d");
      context.drawImage(texture.image, 0, 0);

      // Extract the pixel color at the UV coordinate of the face
      let pixelData = context.getImageData(uv.x * texture.image.width, uv.y * texture.image.height, 1, 1);

      let color = new THREE.Color(`rgb(${pixelData.data[0]}, ${pixelData.data[1]}, ${pixelData.data[2]})`);
      color.offsetHSL(0, 0.5, 0);

      // Change to black because what the floof?
      pixelData.data[0] = 0;
      pixelData.data[1] = 0;
      pixelData.data[2] = 0;

      // Modify the color
      // pixelData.data[0] = color.r * 255;
      // pixelData.data[1] = color.g * 255;
      // pixelData.data[2] = color.b * 255;

      context.putImageData(pixelData, uv.x * texture.image.width, uv.y * texture.image.height);

      // Update the pixel color
      texture.image.src = canvas.toDataURL();
      texture.needsUpdate = true;
    };
  }
});

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
  // Render the scene
  renderer.render(scene, camera);
})();
