const IMAGE = "https://threejs.org/examples/textures/uv_grid_opengl.jpg";

// Set up the scene, camera and renderer
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.z = 5;

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Load the image texture
const textureLoader = new THREE.TextureLoader();
textureLoader.load(IMAGE, (texture) => {
  const material = new THREE.MeshBasicMaterial({ map: texture });
  const geometry = new THREE.PlaneGeometry(2, 2);
  const mesh = new THREE.Mesh(geometry, material);
  scene.add(mesh);

  // Handle mouse move event to change pixel colors
  const canvas = document.createElement('canvas');
  const context = canvas.getContext('2d');
  let mouseDown = false;
  let pixelData;
  let color;

  mesh.addEventListener('mousedown', (event) => {
    mouseDown = true;
    pixelData = getPixelData(event, mesh, context);
    color = new THREE.Color(`rgb(${pixelData.data[0]}, ${pixelData.data[1]}, ${pixelData.data[2]})`);
    color.offsetHSL(0, 0.5, 0);
  });

  mesh.addEventListener('mousemove', (event) => {
    if (mouseDown) {
      const newPixelData = getPixelData(event, mesh, context);
      newPixelData.data[0] = color.r * 255;
      newPixelData.data[1] = color.g * 255;
      newPixelData.data[2] = color.b * 255;
      context.putImageData(newPixelData, 0, 0);
      texture.needsUpdate = true;
    }
  });

  mesh.addEventListener('mouseup', () => {
    mouseDown = false;
  });

  function getPixelData(event, mesh, context) {
    const uv = event.uv;
    const texture = mesh.material.map;
    const image = texture.image;
    canvas.width = image.width;
    canvas.height = image.height;
    context.drawImage(image, 0, 0);
    return context.getImageData(uv.x * image.width, uv.y * image.height, 1, 1);
  }
});

// Render the scene
const animate = () => {
  requestAnimationFrame(animate);
  renderer.render(scene, camera);
};
animate();
