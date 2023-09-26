<span style="font-size:30px;">🤘 🎸 💀 ⚡️</span>

## Understanding depthWrite

`depthWrite` is a property you can set on a material to control how it interacts with the depth buffer. You can think of the depth buffer as a big invisible screen that helps the computer figure out what should be in front of what.

Imagine you're stacking toy blocks. The depth buffer helps the computer remember which block is in front and which one is behind so that it can show them correctly on the screen. When you set "depthWrite" to `true`, it's like telling the computer, "Hey, this block is important. Remember its position so you can figure out what goes in front and what goes behind." When you set it to `false`, you're saying, "Don't bother remembering this block's position for stacking. Just show it."

Here's some example code to show how this works:

```javascript
// Setup scene, camera, and renderer
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Add a cube that writes to the depth buffer
const geometry1 = new THREE.BoxGeometry();
const material1 = new THREE.MeshBasicMaterial({ color: 0x00ff00, depthWrite: true });
const cube1 = new THREE.Mesh(geometry1, material1);
cube1.position.set(0, 0, -5);
scene.add(cube1);

// Add a second cube that does NOT write to the depth buffer
const geometry2 = new THREE.BoxGeometry();
const material2 = new THREE.MeshBasicMaterial({ color: 0xff0000, depthWrite: false, transparent: true, opacity: 0.5 });
const cube2 = new THREE.Mesh(geometry2, material2);
cube2.position.set(1, 0, -4);  // Positioned a bit closer to the camera than the green cube
scene.add(cube2);

// Setup camera position
camera.position.z = 5;

// Animation
const animate = function () {
  requestAnimationFrame(animate);

  cube1.rotation.x += 0.01;
  cube1.rotation.y += 0.01;

  cube2.rotation.x += 0.01;
  cube2.rotation.y += 0.01;

  renderer.render(scene, camera);
};

animate();
```

<br>

In this code, we have two cubes. The green one (`cube1`) has `depthWrite: true`, and the red one (`cube2`) has `depthWrite: false`. Even though the red cube is closer to the camera, it appears as if it's behind the green one, because it's not being written to the depth buffer.

Try running this code and you'll see how the `depthWrite` property can change the way objects are displayed in 3D space!

### So... in a way it's kinda like setting z-index, except there's no value; it's just yes or no.

Exactly, you've got it! In web development, you can use `z-index` to layer different elements on top of each other. Higher `z-index` values appear in front of lower ones. In the 3D world of Three.js, the depth buffer works as the "z-index" but for 3D objects.

However, unlike `z-index`, where you can set specific values to indicate which layer goes where, `depthWrite` is more like a "yes or no" switch. When it's set to `true`, the object participates in the depth sorting, like being part of the "z-index game." When it's `false`, the object is saying, "I don't want to play the z-index game; just put me where I am without worrying about who is in front or behind."

Great observation!

<br>
