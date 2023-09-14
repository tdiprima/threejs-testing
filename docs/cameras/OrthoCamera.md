## Ortho Camera Parameters Explanation

[How to free-draw a line in three.js r144 on mouse move, and using BufferGeometry?](https://stackoverflow.com/questions/73705786/how-to-free-draw-a-line-in-three-js-r144-on-mouse-move-and-using-buffergeometry#73713583)

```js
var frustumSize = 4;
var aspect = window.innerWidth / window.innerHeight;

// left, right, top, bottom, near, far 
camera = new THREE.OrthographicCamera(
  frustumSize * aspect / -2, 
  frustumSize * aspect / 2, 
  frustumSize / 2, 
  frustumSize / -2, 
  0.1, 
  20
);
```

```js
// OK so these aren't magic numbers; it's a thing.
cameraRTT = new THREE.OrthographicCamera(
    window.innerWidth / -2,  // left
    window.innerWidth / 2,   // right
    window.innerHeight / 2,  // top
    window.innerHeight / -2, // bottom
    -10000,                  // near
    10000                    // far
  );
```

The use of `/ 2` and `/ -2` in `THREE.OrthographicCamera` parameters is often related to the dimensions of the view frustum in orthographic projection. This isn't really "magic numbers" per se, but rather part of how the orthographic projection works.

Here's a breakdown of each parameter for the `THREE.OrthographicCamera` constructor:

- `frustumSize * aspect / -2`: This sets the left clipping plane of the camera. `frustumSize` represents the vertical dimension of the view frustum. The `aspect` is the aspect ratio of the view (width / height). Dividing by `-2` means that we're setting the left boundary of the frustum to be half the frustum's width to the left of the camera's center.
  
- `frustumSize * aspect / 2`: Similar to the above, this sets the right clipping plane, but this time it's half the frustum's width to the right of the camera's center.

- `frustumSize / 2`: This sets the top clipping plane to be half the frustum's height above the camera's center.

- `frustumSize / -2`: This sets the bottom clipping plane to be half the frustum's height below the camera's center.

- `0.1` and `20`: These set the near and far clipping planes.

By setting these values, you're essentially defining a box (the frustum) that represents the volume of the scene visible to the camera. Objects outside of this volume won't be rendered.

The division by `2` and `-2` is used to center this box on the camera's position. You divide by `2` to get the half-size of the respective dimension, then use positive and negative values to offset this from the camera's center position.

For example, if `frustumSize` is `10` and `aspect` is `1.6` (for a 16:9 display):

- The width of the view frustum would be `10 * 1.6 = 16`.
- The left clipping plane would be at `-16 / 2 = -8`.
- The right clipping plane would be at `16 / 2 = 8`.
- The top clipping plane would be at `10 / 2 = 5`.
- The bottom clipping plane would be at `-10 / 2 = -5`.

This means you'll see all objects within this box.

You can set `frustumSize` to whatever value you need. It just defines the size of the orthographic projection.

### Compute the side planes of the view frustum

[Frustum calculation and culling, HOPEFULLY demystified](http://davidlively.com/programming/graphics/frustum-calculation-and-culling-hopefully-demystified/)

"[The calculations are] valid for **view space**, where the camera is at the origin and pointed along the Z axis."

### Define "view space"

The view space is what people usually refer to as **the camera of OpenGL** (it is sometimes also known as camera space or eye space).

The view space is the result of transforming your world-space coordinates to coordinates that are in front of the user's view.

[Coordinate Systems](https://learnopengl.com/Getting-started/Coordinate-Systems)

<br>
