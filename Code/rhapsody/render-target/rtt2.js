// https://gamedevelopment.tutsplus.com/tutorials/quick-tip-how-to-render-to-a-texture-in-threejs--cms-25686

//// This is the basic scene setup ////
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(70, window.innerWidth / window.innerHeight, 1, 1000);

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

//// This is where we create our off-screen render target ////

// Create a different scene to hold our buffer objects
const bufferScene = new THREE.Scene();

// Create the texture that will store our result
const bufferTexture = new THREE.WebGLRenderTarget(window.innerWidth, window.innerHeight, {
  minFilter: THREE.LinearFilter,
  magFilter: THREE.NearestFilter
});

////
//// Add anything you want to render/capture in bufferScene here ////
////

// Let's create a red box
const redMaterial = new THREE.MeshBasicMaterial({ color: 0xf06565 });
const boxGeometry = new THREE.BoxGeometry(5, 5, 5);
const boxObject = new THREE.Mesh(boxGeometry, redMaterial);
boxObject.position.z = -10;
bufferScene.add(boxObject); // We add it to the bufferScene instead of the normal scene!

// And a blue plane behind it
const blueMaterial = new THREE.MeshBasicMaterial({ color: 0x7074ff });
const plane = new THREE.PlaneGeometry(window.innerWidth, window.innerHeight);
const planeObject = new THREE.Mesh(plane, blueMaterial);
planeObject.position.z = -15;
bufferScene.add(planeObject); // We add it to the bufferScene instead of the normal scene!

// Now we use our bufferTexture as a material to render it onto our main scene
const boxMaterial = new THREE.MeshBasicMaterial({ map: bufferTexture });
const boxGeometry2 = new THREE.BoxGeometry(5, 5, 5);
const mainBoxObject = new THREE.Mesh(boxGeometry2, boxMaterial);
mainBoxObject.position.z = -10;
scene.add(mainBoxObject);

// Render everything!
function render() {
  requestAnimationFrame(render);

  // Make the box rotate on box axes
  boxObject.rotation.y += 0.01;
  boxObject.rotation.x += 0.01;

  // Rotate the main box too
  mainBoxObject.rotation.y += 0.01;
  mainBoxObject.rotation.x += 0.01;

  // Render onto our off-screen texture
  renderer.render(bufferScene, camera, bufferTexture);

  // Finally, draw to the screen
  renderer.render(scene, camera);
}

render();
