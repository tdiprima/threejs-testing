## Set up camera

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

## Camera size

Why is **aspect** a property of both the **camera** *and* size of the **renderer**?

[Well?](https://discourse.threejs.org/t/why-is-aspect-a-property-of-the-camera-and-size-of-the-renderer/13870)

`WebGLRenderer.setSize()` just defines the **resolution of the canvas** (by taking into account the pixel ratio).

When rendering with a perspective camera, it's recommended that its **aspect ratio** should always be **updated** as soon as the canvas is resized.

Otherwise the final image is distorted. Because the aspect ratio of the camera does not match the one of the canvas. Hence, always **do this when resizing:**

```js
camera.aspect = window.innerWidth / window.innerHeight;
camera.updateProjectionMatrix();

renderer.setSize( window.innerWidth, window.innerHeight );
```

<br>

## Camera position

[Video](https://youtu.be/lSkC-EeStyQ)

```js
x = width / left and right // horizontal movement
y = height / top and bottom // vertical movement
z = depth / zoom (in or out)
```

<br>

## Difference between updateMatrixWorld() and updateProjectionMatrix()

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

## updateProjectionMatrix() 📽️

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



<br>

## What is the purpose of glScissor?

The Scissor Test discards Fragments that fall outside of a certain rectangular portion of the screen.

`glScissor()` defines a screen space rectangle beyond which nothing is drawn (if the scissor test is enabled).

[gamedev.stackexchange.com](https://gamedev.stackexchange.com/questions/40704/what-is-the-purpose-of-glscissor)

You almost always want to set the **scissor rectangle** to the same values as the **viewport**.

You use `glViewport()` to determine the **location** and **size** of the screen space **viewport** region.

> **screenspace** = The space available on a screen display.
> **`glViewport`** maps the projection coordinates to device coordinates, but does not clip.

That's where **scissor** in comes in. `glScissor()` defines a screen space rectangle **beyond which nothing is drawn**. Scissor test enabled.

The scissor rectangle can be used to **temporarily restrict drawing to a sub-rectangle** of the viewport, for special effects, UI elements, etc.

<br>

## Side by side

**OrbitControls** lets the user spin or orbit the camera around some point.

<br>

## camera.up

```js
camera.up = new THREE.Vector3(0, 0, 1);
camera.up.set(0, 0, 1);
```

Altering the `up` vector is done in only a few examples, and normally not necessary. This happens to accommodate the fact that certain models are defined in a coordinates system where the Z axis represents the vertical ("up") axis.

*Many thanks for the magic word "vertical".*

<br>




<br>

## Articles

[visualization and camera](https://observablehq.com/@grantcuster/understanding-scale-and-the-three-js-perspective-camera)

[3D Camera Movement in Three.js – I Learned the Hard Way So You Don't Have To](https://blogs.perficient.com/2020/05/21/3d-camera-movement-in-three-js-i-learned-the-hard-way-so-you-dont-have-to/)


[three.js multiple camera](https://www.google.com/search?q=three.js+multiple+camera&oq=three.js+multiple+camera&aqs=chrome..69i57j0i22i30l2.2131j0j7&sourceid=chrome&ie=UTF-8)
