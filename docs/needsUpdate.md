## Where to set needsUpdate

<span style="color:#0000dd;">If I need to set "needsUpdate = true" in three.js, what object do I do that on?  The scene or the mesh or what?</span>

In Three.js, the property `needsUpdate` is not a built-in property of any specific object like the scene or mesh. Instead, it is commonly used with certain objects or properties to signal that they need to be updated or refreshed.

Here are a few **common use cases** where `needsUpdate` can be used:

1. **Geometry:** If you modify the vertices or faces of a `THREE.Geometry` object directly (not recommended), you can set `geometry.verticesNeedUpdate` or `geometry.elementsNeedUpdate` to `true` to indicate that the geometry needs to be updated.

2. **Material:** When using `THREE.ShaderMaterial` or custom shaders, you might need to set `material.needsUpdate` to `true` if you modify the shader code or any uniforms that affect the rendering.

3. **Texture:** If you modify the data of a texture directly (e.g., by manipulating its `.image` property), you should set `texture.needsUpdate` to `true` to ensure that the changes are reflected in the rendering.

So... mainly with **ShaderMaterial.**

It's important to note that `needsUpdate` is not a universal property in Three.js. Its usage and availability depend on the specific object or property you are working with. Therefore, you'll need to refer to the documentation or **inspect the specific object you are working with** to determine whether it has a `needsUpdate` property and how to use it correctly.

## Example

Here's a script that uses `needsUpdate` to update the position of a mesh:

```javascript
// Create a scene, camera, and renderer
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Create a cube
const geometry = new THREE.BoxGeometry();
const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
const cube = new THREE.Mesh(geometry, material);
scene.add(cube);

// Update the position of the cube
function updateCubePosition() {
  cube.position.x += 0.01;
  cube.position.y += 0.01;
  cube.position.z += 0.01;
  cube.rotation.x += 0.01;
  cube.rotation.y += 0.01;
  cube.rotation.z += 0.01;

  cube.needsUpdate = true; // Signal that the mesh needs to be updated
}

// Render loop
function animate() {
  requestAnimationFrame(animate);
  updateCubePosition();
  renderer.render(scene, camera);
}
animate();
```

<br>

In this example, we create a simple cube mesh and add it to the scene. The `updateCubePosition()` function is called inside the render loop (`animate()`), which updates the position and rotation of the cube every frame.

To indicate that the mesh needs to be updated, we set `cube.needsUpdate = true;` inside the `updateCubePosition()` function. This tells Three.js that the position and rotation of the cube have changed and need to be updated before the next frame is rendered.

By using `needsUpdate`, Three.js efficiently <mark>**updates only the parts of the scene that have changed, improving performance.**</mark> However, it's important to note that `needsUpdate` is not needed for all properties. It's typically used for specific cases where you need to manually signal that an object or property needs to be updated.

<br>

