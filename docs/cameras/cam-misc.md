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



<br>

# Camera position

[Camera position in Three JS](https://youtu.be/lSkC-EeStyQ)

```text
x = width / left and right // horizontal movement
y = height / top and bottom // vertical movement
z = depth / zoom (in or out)
```

<br>

# What is the purpose of glScissor?

[gamedev.stackexchange.com](https://gamedev.stackexchange.com/questions/40704/what-is-the-purpose-of-glscissor)

You almost always want to set the scissor rectangle to the same values as the viewport.

You use `glViewport()` to determine the location and size of the screen space viewport region.

That's where scissor in comes in. `glScissor()` defines a screen space rectangle beyond which nothing is drawn (if the scissor test is enabled).

 the scissor rectangle can be used to temporarily restrict drawing to a sub-rectangle of the viewport, for special effects, UI elements, etc.

<br>

# glViewport

`glViewport` maps the projection coordinates to device coordinates, but does not clip.

<br>

# Articles

[visualization and camera](https://observablehq.com/@grantcuster/understanding-scale-and-the-three-js-perspective-camera)

[3D Camera Movement in Three.js – I Learned the Hard Way So You Don’t Have To](https://blogs.perficient.com/2020/05/21/3d-camera-movement-in-three-js-i-learned-the-hard-way-so-you-dont-have-to/)


[three.js multiple camera](https://www.google.com/search?q=three.js+multiple+camera&oq=three.js+multiple+camera&aqs=chrome..69i57j0i22i30l2.2131j0j7&sourceid=chrome&ie=UTF-8)
