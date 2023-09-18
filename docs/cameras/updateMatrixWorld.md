## Update Matrix World

<span style="color:#0000dd;">Can you give me an example where the camera is a child of another object, and we need to call <a href="lookAt.md">lookAt</a> and updateMatrixWorld?</span>

When the camera is a child of another object, you generally use `lookAt` and `updateMatrixWorld` to ensure that the camera's orientation is updated correctly relative to its parent's transformation matrix. When you apply transformations to the parent object, those transformations get applied to the camera as well. However, calling `lookAt` on the camera won't take into account the transformations of its parent unless you also call `updateMatrixWorld`.

Here's a simple example. Let's say you have a parent object (could be an empty `THREE.Object3D` or another mesh), and you want the camera to be its child...

(Basically, you do `lookAt` and `updateMatrixWorld` together.
<a href="../../Code/cameras/picture-in-picture.html">Picture in Picture</a> is an example.)

```javascript
// Create a scene, camera, and renderer
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Create a parent object
const parentObject = new THREE.Object3D();
scene.add(parentObject);

// Position and add the camera as a child
camera.position.set(0, 1, 5);
parentObject.add(camera);

// Create a geometry and material for a cube
const geometry = new THREE.BoxGeometry();
const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });

// Create a cube mesh and add it to the scene
const cube = new THREE.Mesh(geometry, material);
scene.add(cube);

// Make the camera look at the cube
camera.lookAt(cube.position);
camera.updateMatrixWorld(); // Update the camera's world matrix to consider parent transformations

// Animation loop
const animate = function () {
  requestAnimationFrame(animate);

  // Rotate the parent object (which also rotates the camera since it's a child)
  parentObject.rotation.y += 0.01;

  renderer.render(scene, camera);
};

animate();
```

In this example, you can call `updateMatrixWorld` immediately after `lookAt` to make sure that the camera's world matrix is updated based on its new target and its parent's current transformation. This is necessary because `lookAt` calculates the rotation to look at a point in world space, not object space.

If you know that the parent object (or any other ancestor) may have changed, and you want to ensure that the camera looks at the target correctly, you can call `camera.updateMatrixWorld()` in the animation loop, especially right before the `renderer.render(scene, camera);` line. This ensures that the camera's transformation is up-to-date when rendering.

## updateMatrixWorld() 🌎

**[From the docs:](https://threejs.org/docs/#api/en/core/Object3D)**

force - A boolean that can be used to **bypass** `.matrixWorldAutoUpdate`, to recalculate the world matrix of the object and descendants on the current frame.

Useful **if you cannot wait** for the renderer to update it on the next frame (assuming `.matrixWorldAutoUpdate` set to true).

Call it in `render()`.

For **picture-in-picture**, IDK. Cuz the stuff *in* the world is moving? 🤷‍♀️

When you **move camera via gui**, you update matrix world on every change in camera movement. 👍🏻

<br>
