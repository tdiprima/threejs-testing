# Set up camera

```js
// Camera defines the field of view
const camera = new THREE.PerspectiveCamera(
  55, // fov angle (in degrees)
  window.innerWidth / window.innerHeight, // aspect ratio
  0.1, // near plane
  1000 // far plane
);
```

<br>

# Camera size

[Why is **aspect** a property of both the **camera** *and* size of the **renderer**?](https://discourse.threejs.org/t/why-is-aspect-a-property-of-the-camera-and-size-of-the-renderer/13870)

`WebGLRenderer.setSize()` just defines the **resolution of the canvas** (by taking into account the pixel ratio).

When rendering with a perspective camera, it's recommended that its **aspect ratio** should always be **updated** as soon as the canvas is resized.

Otherwise the final image is distorted. Because the aspect ratio of the camera does not match the one of the canvas. Hence, always **do this when resizing:**

```js
camera.aspect = window.innerWidth / window.innerHeight;
camera.updateProjectionMatrix();

renderer.setSize( window.innerWidth, window.innerHeight );
```

<br>

# Camera position

[Camera position in Three JS](https://youtu.be/lSkC-EeStyQ)

```js
x = width / left and right // horizontal movement
y = height / top and bottom // vertical movement
z = depth / zoom (in or out)
```

<br>

# Difference between `updateMatrixWorld()` and `updateProjectionMatrix()`

One is a world 🌎, one is a camera (projection). 📽️

I thought, at first.  updateMatrixWorld works on Object3D.

But I'm here because: 

```js
function render() {
  camera.updateMatrixWorld();
}
```

It's not used that much:

```bash
ackk updateMatrixWorld
# Count  14
# Files   4
```

This one sparks joy. In everything.

```bash
ackk updateProjectionMatrix
# Count  68
# Files  a gazillion, at least
```

<br>

# updateProjectionMatrix() 📽️

After making changes to most camera properties, you will have to call [updateProjectionMatrix](http://127.0.0.1:5501/docs/#api/en/cameras/PerspectiveCamera.updateProjectionMatrix) for the changes to take effect.

We do it all the time when we resize the canvas.

```js
function onWindowResize() {
  camera.aspect = w / h;
  camera.updateProjectionMatrix();
  renderer.setSize(w, h);
}
```

<br>

# updateMatrixWorld() 🌎

**[From the docs:](https://threejs.org/docs/#api/en/core/Object3D)**

force - A boolean that can be used to **bypass** `.matrixWorldAutoUpdate`, to recalculate the world matrix of the object and descendants on the current frame.

Useful **if you cannot wait** for the renderer to update it on the next frame (assuming `.matrixWorldAutoUpdate` set to true).

Call it in `render()`.

For **picture-in-picture**, IDK. Cuz the stuff *in* the world is moving? 🤷‍♀️

When you **move camera via gui**, you update matrix world on every change in camera movement. 👍

<br>

# What is the purpose of glScissor?

[gamedev.stackexchange.com](https://gamedev.stackexchange.com/questions/40704/what-is-the-purpose-of-glscissor)

You almost always want to set the **scissor rectangle** to the same values as the **viewport**.

You use `glViewport()` to determine the **location** and **size** of the screen space **viewport** region.

> **screenspace** = The space available on a screen display.
> **`glViewport`** maps the projection coordinates to device coordinates, but does not clip.

That's where **scissor** in comes in. `glScissor()` defines a screen space rectangle **beyond which nothing is drawn**. Scissor test enabled.

The scissor rectangle can be used to **temporarily restrict drawing to a sub-rectangle** of the viewport, for special effects, UI elements, etc.

<br>

# Side by side

**OrbitControls** lets the user spin or orbit the camera around some point.

<br>

# camera.up

```js
camera.up = new THREE.Vector3(0, 0, 1);
camera.up.set(0, 0, 1);
```

Altering the `up` vector is done in only a few examples, and normally not necessary. This happens to accommodate the fact that certain models are defined in a coordinates system where the Z axis represents the vertical ("up") axis.

*Many thanks for the magic word "vertical".*

<br>

# lookAt()

The `lookAt()` method calls are necessary so the camera looks at the coordinates system's origin, or at the position of the scene. In most cases, the position value of scene is (0,0,0) (the origin).

<br><!-- http://tanrobby.github.io/note/opengl/gluLookAt.jpg -->

![Look At](../img/gluLookAt.jpg)

<br>

# controls.target vs camera.lookAt

[Controls.target vs camera.lookAt](https://discourse.threejs.org/t/controls-target-vs-camera-lookat/5086/6)

I used `camera.lookAt()` to set direction in which camera looks.

Reading on OrbitControls, I learned that `camera.lookAt()` should be replaced by<br>
`controls.target`.

What's the difference?

OrbitControls internally uses `Object3D.lookAt()` in order to look at the defined<br>
target location of focus (`OrbitControls.target`).

> When I use it, panning becomes an issue.<br>
> Target object doesn't pan with rest of the scene,<br>
> and is static while panning.<br>

That's the intended behavior since panning transforms the `OrbitControls.target` vector.<br>
Or in other words, the location of focus.

You also have to call `controls.update()` after changing the target.

OrbitControls ensures that the camera orbits (rotates) around the target.<br>
Rotation and zooming also happens with focus on target. (Focused on the defined target vector.)

<br>

# Articles

[visualization and camera](https://observablehq.com/@grantcuster/understanding-scale-and-the-three-js-perspective-camera)

[3D Camera Movement in Three.js – I Learned the Hard Way So You Don't Have To](https://blogs.perficient.com/2020/05/21/3d-camera-movement-in-three-js-i-learned-the-hard-way-so-you-dont-have-to/)


[three.js multiple camera](https://www.google.com/search?q=three.js+multiple+camera&oq=three.js+multiple+camera&aqs=chrome..69i57j0i22i30l2.2131j0j7&sourceid=chrome&ie=UTF-8)
