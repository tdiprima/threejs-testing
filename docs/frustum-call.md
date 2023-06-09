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

If you accidentally set `frustumCulled` to `true` for a mesh that should have been set to `false`, the mesh might not be rendered when it is outside the camera's frustum. This can lead to **undesired visual artifacts** or **missing objects** in your scene. It's important to use the appropriate value for `frustumCulled` based on your requirements.

It's worth noting that disabling frustum culling (`frustumCulled = false`) can have **performance implications**, especially if you have a large number of objects in your scene. Frustum culling is an optimization technique that helps reduce the number of objects that need to be processed and rendered, improving overall performance. Disabling it for all meshes in your scene may lead to decreased performance, particularly in complex scenes or on devices with limited resources.

## Mesh Frustum Culling

<span style="color:green;">Let's say the camera is rotating, and some object end up disappearing outside the frustum.  So when frustumCulled = true, does that mean that removed objects are then re-added to the scene when the camera turns and the object comes back into the frustum?  How would it know where the object is if it was removed via culling?</span>

<span style="color:green;font-weight:bold;">¡Estás cerca!</span>

When `frustumCulled` is set to `true`, objects that are outside the camera's frustum are indeed removed from the scene, and they **will not be automatically re-added** when they come back into the frustum.

The purpose of frustum culling is to optimize rendering performance by **skipping the rendering of objects** that are not visible. When an object is culled, it is not completely removed from memory, but rather excluded from the rendering process. The object's position, geometry, and other properties are still retained.

When the camera rotates and an object that was previously culled comes back into the frustum, you would need to **handle its visibility manually.**

You can do this by re-enabling the object for rendering in your code when it becomes visible again. One way to achieve this is by checking the object's bounding volume against the camera's frustum and **enabling** it if there is an **intersection.**

Here's a simplified example of how you can handle the visibility of an object based on frustum culling:

```javascript
// Inside your animation/render loop
function animate() {
  // Update camera and object transformations

  // Check if object is inside camera's frustum
  if (objectIsInsideFrustum(object, camera)) {
    object.visible = true; // Set object to be visible
  } else {
    object.visible = false; // Set object to be invisible
  }

  // Render the scene
  renderer.render(scene, camera);
}

// Helper function to check if object is inside camera's frustum
function objectIsInsideFrustum(object, camera) {
  const frustum = new THREE.Frustum();
  frustum.setFromProjectionMatrix(new THREE.Matrix4().multiplyMatrices(
    camera.projectionMatrix,
    camera.matrixWorldInverse
  ));

  return frustum.intersectsObject(object);
}
```

<br>

In this example, the `animate` function is called each frame of your animation/render loop. Inside the function, you update the camera and object transformations. Then, you check if the object is inside the camera's frustum using the `objectIsInsideFrustum` helper function, which creates a frustum and **checks for intersection** with the object's bounding volume. Based on the result, you set the `visible` property of the object accordingly.

By manually handling the visibility of the object, you can ensure that it is rendered or not based on its position relative to the camera's frustum.

<br>
