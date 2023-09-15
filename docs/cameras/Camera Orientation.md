## Camera Orientation

<span style="color:#0000dd;">Does the camera automatically look at the origin (0, 0, 0) by default, or is it better to set camera.lookAt after initializing the camera?</span>

```js
camera.lookAt(new THREE.Vector3(0, 0, 0));
```

In Three.js, when you create a new camera using `THREE.PerspectiveCamera` or `THREE.OrthographicCamera`, the camera is positioned so that its local -Z axis points towards the origin `(0, 0, 0)` by default. In other words, the camera "looks at" the origin initially.

However, it's often a good practice to explicitly set the `lookAt` method to ensure that the camera is oriented as you intend, especially if you're going to be moving the camera or changing its orientation during the course of your program.

Here's a basic example:

```javascript
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.set(0, 1, 5);  // Setting the camera position
camera.lookAt(new THREE.Vector3(0, 0, 0));  // Ensuring the camera looks at the origin
```

By explicitly calling `lookAt`, you make the behavior of your program more predictable and easier to understand.

Also, when you're moving the camera dynamically, you may need to call `camera.lookAt()` again to update its orientation.

If the camera is a child of another object, you will also often need to call `updateMatrixWorld` to ensure that the changes propagate correctly:

```javascript
camera.lookAt(new THREE.Vector3(0, 0, 0));
camera.updateMatrixWorld();
```

So, while not strictly necessary at initialization if you're happy with the default orientation, using `lookAt` can be a good habit.

## camera.position.set

![](../img/x-y-z-1.png)

When you set `camera.position.set(0, 1, 5)`, you're positioning the camera in 3D space according to the Cartesian coordinate system used in Three.js:

- `x = 0`: The camera is aligned with the Y-Z plane, meaning it is directly en frente de the origin along the X-axis.
- `y = 1`: The camera is 1 unit above the X-Z plane. In human terms, you could think of it as being "1 unit above the ground."
- `z = 5`: The camera is 5 units away from the origin along the Z-axis. In the default Three.js coordinate system, positive Z-values extend "out of the screen," so the camera would be placed 5 units "in front of" the origin, looking back towards it.

In more intuitive terms, imagine you are standing 5 meters away from an object, directly in front of it. If you then elevate yourself 1 meter above the ground, that would be your "camera position" in this case. You would be looking back towards the object (the origin, in this case), which is how the `lookAt(0, 0, 0)` function orients the camera.

## updateMatrixWorld

<span style="color:#0000dd;">Can you give me an example where the camera is a child of another object, and we need to call lookAt and updateMatrixWorld?</span>

When the camera is a child of another object, you generally use `lookAt` and `updateMatrixWorld` to ensure that the camera's orientation is updated correctly relative to its parent's transformation matrix. When you apply transformations to the parent object, those transformations get applied to the camera as well. However, calling `lookAt` on the camera won't take into account the transformations of its parent unless you also call `updateMatrixWorld`.

Here's a simple example. Let's say you have a parent object (could be an empty `THREE.Object3D` or another mesh), and you want the camera to be its child:

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

<br>
