<span style="font-size:30px;">🤘 🎸 💀 ⚡️</span>

### Bueno, "depthWrite"

Whether rendering this material has any effect on the depth buffer. Default is true.

**When drawing 2D overlays** it can be useful to disable the depth writing in order to layer several things together without creating z-index artifacts.

## DepthWrite Demo & Artifacts

<span style="color:#0000dd;">I want to know what "wrong" looks like.</span>

Certainly! I can provide you with an example of how to use `depthWrite: false` and demonstrate the difference when it's set to `true`.

The `depthWrite` property determines whether the material **writes to the depth buffer** during rendering.

When set to `false`, it allows objects with this material to be rendered **on top of other objects** regardless of their actual position in 3D space.

Here's an example that demonstrates the usage of `depthWrite: false`:

```javascript
// Set up the scene, camera, and renderer
let scene = new THREE.Scene();
let camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
let renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Create a cube geometry and material with depthWrite set to false
let geometry = new THREE.BoxGeometry(1, 1, 1);
let material = new THREE.MeshBasicMaterial({
  color: 0x00ff00,
  depthWrite: false
});
let cube = new THREE.Mesh(geometry, material);
scene.add(cube);

// Create another cube behind the first one
let geometry2 = new THREE.BoxGeometry(1, 1, 1);
let material2 = new THREE.MeshBasicMaterial({
  color: 0xff0000
});
let cube2 = new THREE.Mesh(geometry2, material2);
cube2.position.z = -2;
scene.add(cube2);

// Position the camera
camera.position.z = 5;

// Render the scene
function animate() {
  requestAnimationFrame(animate);

  // Rotate the cubes
  cube.rotation.x += 0.01;
  cube.rotation.y += 0.01;
  cube2.rotation.x -= 0.01;
  cube2.rotation.y -= 0.01;

  renderer.render(scene, camera);
}
animate();
```

<br>

In this example, we have two cubes. The first cube (green) has `depthWrite` set to `false`, allowing it to be rendered on top of the second cube. The second cube (red) has `depthWrite` set to `true` by default.

When you run this code, you'll notice that the [2nd] cube appears on top of the [1st] cube, even though it's positioned behind it in 3D space. This is because `depthWrite` is set to `false`, preventing the first cube from updating the depth buffer and effectively disabling depth testing for that object.

Now, if you change `depthWrite: false` to `depthWrite: true` for the first cube's material, and run the code again, you'll see that the **rendering order** is now determined by the **actual position** of the cubes in 3D space. The second cube will be rendered on top, obscuring the first cube, as it is closer to the camera.

By setting `depthWrite` to `true`, you reintroduce the default behavior where **objects are rendered based on their depth values,** avoiding the "artifacts" that can occur when objects are simply layered on top of each other without considering their positions in 3D space.

## Updating the depth buffer & disabling depth testing

When we render objects in a 3D scene, the computer keeps track of how far away each pixel is from the camera. It does this using a special memory area called the "depth buffer." The depth buffer stores the distance information for each pixel on the screen.

Now, when we say "**updating** the depth buffer," it means that when an object is rendered, the computer checks if the object's pixels are closer to the camera than the pixels that are already in the depth buffer. If they are closer, the computer updates the depth buffer with the new closer distances.

<mark>**Depth testing**</mark>, on the other hand, is a process that happens during rendering. It compares the depth value of a pixel being rendered with the value stored in the depth buffer at the same location. If the pixel being rendered is closer to the camera (has a smaller depth value), it passes the test and gets displayed. If it's farther away (has a larger depth value), it fails the test and gets hidden because there's already something closer in that pixel's location.

> If I would've used orbit controls, this might have been readily apparent.

So, when `depthWrite` is set to `false` for an object's material, it means that the object doesn't update the depth buffer. This effectively disables the depth testing for that object. As a result, the object will be rendered on top of everything else, regardless of its actual position in the 3D scene.

Eso es lo que quiero decir. Según él, el cubo verde debería estar delante del rojo. Pero está detrás.

Lo entendió al revés antes, así que voy a ignorarlo.

<br>
