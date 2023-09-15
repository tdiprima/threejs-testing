## The Blondie Function

The `frustumCulled` property is used to determine whether a mesh should be automatically **culled (removed)** if it is outside the camera's frustum. By default, the `frustumCulled` property is set to `true`, meaning that meshes are culled when they are not visible.

Here's an example of setting `frustumCulled` to `false` for a mesh:

```javascript
const geometry = new THREE.BoxGeometry(1, 1, 1);
const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
const mesh = new THREE.Mesh(geometry, material);

mesh.frustumCulled = false; // Disable frustum culling for this mesh

scene.add(mesh);
```

<br>

In this example, we create a simple green box mesh and set its `frustumCulled` property to `false`. This means that the mesh will not be culled even if it is outside the camera's frustum.

Frustum culling is an **optimization technique** that helps reduce the number of objects that need to be processed and rendered, improving overall performance.

If you accidentally set `frustumCulled` to `true` for a mesh that should have been set to `false`, the mesh might not be rendered when it is outside the camera's frustum.

This can lead to undesired visual artifacts <span style="color:deeppink;">(The "what the hell is that?" factor)</span> or missing objects in your scene. It's important to use the appropriate value for `frustumCulled` based on your requirements.

It's worth noting that disabling frustum culling (`frustumCulled = false`) can have performance implications, especially if you have a large number of objects in your scene. 

Disabling it for all meshes in your scene may lead to **decreased performance,** particularly in complex scenes or on devices with limited resources.

## Mesh Frustum Culling

<span style="color:#0000dd;">Let's say the camera is rotating, and some object end up disappearing outside the frustum.  So when frustumCulled = true, does that mean that removed objects are then re-added to the scene when the camera turns and the object comes back into the frustum?  How would it know where the object is if it was removed via culling?</span>

<span style="color:#0000dd;font-weight:bold;">¡Estás cerca!</span>
<!--You are close!-->

When `frustumCulled` is set to `true`, objects that are outside the camera's frustum are indeed removed from the scene, and they **will <mark>not</mark> be automatically re-added** when they come back into the frustum.

The purpose of frustum culling is to optimize rendering performance by skipping the rendering of objects that are not visible.

When an object is culled, it is not completely removed from memory, but rather ***excluded from the rendering process.*** The object's position, geometry, and other properties are still retained.

When the camera rotates and an object that was previously culled comes back into the frustum, you would need to **handle its visibility manually.**

You can do this by re-enabling the object for rendering in your code when it becomes visible again. One way to achieve this is by checking the object's bounding volume against the camera's frustum and **enabling** it if there is an **intersection.**

Here's a simplified example of how you can handle the visibility of an object based on frustum culling:

Creating a new instance of `THREE.Frustum` and a new `THREE.Matrix4` every time `objectIsInsideFrustum` is called could indeed introduce overhead, especially if this function is being called frequently (for example, inside an animation loop).

If the camera's parameters (like position, field of view, etc.) are not changing every frame, then you could reduce overhead by making the frustum a global variable that you update only when the camera's parameters change. This would prevent unnecessary object creation and garbage collection.

## Global Frustum Optimization

[In response to old Henry's code.] Creating a new instance of `THREE.Frustum` and a new `THREE.Matrix4` every time `objectIsInsideFrustum` is called could indeed introduce overhead, especially if this function is being called frequently (for example, inside an animation loop).

If the camera's parameters (like position, field of view, etc.) are not changing every frame, then you could reduce overhead by making the frustum a global variable that you update only when the camera's parameters change. This would prevent unnecessary object creation and garbage collection.

Here's an example that makes `frustum` a global variable and updates it only when needed:

```javascript
let frustum = new THREE.Frustum();

// Function to update the frustum when the camera changes
function updateFrustum(camera) {
  frustum.setFromProjectionMatrix(
    new THREE.Matrix4().multiplyMatrices(
      camera.projectionMatrix,
      camera.matrixWorldInverse
    )
  );
}

// Inside your animation/render loop
function animate() {
  // Update camera and object transformations

  // Assuming some condition to know if camera changed
  if (cameraHasChanged(camera)) {
    updateFrustum(camera);
  }

  // Check if object is inside camera's frustum
  if (frustum.intersectsObject(object)) {
    object.visible = true; // Set object to be visible
  } else {
    object.visible = false; // Set object to be invisible
  }

  // Render the scene
  renderer.render(scene, camera);
}

// Helper function to check if the camera has changed
// You would implement this based on how your camera can change
function cameraHasChanged(camera) {
  // Implement your own logic here
}
```

This approach assumes that you have a way to determine whether the camera has changed since the last frame. The `cameraHasChanged` function is a placeholder for whatever logic you'd use to determine that.

However, if the camera or its properties are changing frequently, then creating a new frustum might be inevitable for accurate culling.

One thing to note is that modern JavaScript engines are quite good at <mark>**optimizing frequently called code and handling garbage collection,**</mark> so the difference might not be hugely noticeable unless you're working with a very complex scene or are CPU-bound. However, optimizing your code as suggested could still be beneficial, especially for applications that need to run smoothly on less powerful hardware.

By manually handling the visibility of the object, you can ensure that it is rendered or not based on its position relative to the camera's frustum.

<br>
