## Mouse position calculation

In three.js, we get normalized device coordinates of the pointer on the screen by calculating the following:

```js
mouseRelativeX = event.clientX / window.innerWidth;

ndcX = mouseRelativeX * 2 - 1;
```

In computer graphics, we like to describe where things are in a way that's independent of the actual pixel size of your screen. This makes it easier to make graphics that look good on all sorts of different screens. The idea of normalized device coordinates is to map the `x` and `y` coordinates of the screen to a range between `-1` and `1`.

- The left side of the screen has an x-coordinate of -1.
- The right side of the screen has an x-coordinate of 1.
- Similarly, the top side of the screen has a y-coordinate of 1, and the bottom has a y-coordinate of -1.

Now, let's look at the calculations.

1. **mouseRelativeX = event.clientX / window.innerWidth;**

   This line is making `mouseRelativeX` a number between 0 and 1. `event.clientX` tells you the x-coordinate of the mouse, and `window.innerWidth` tells you how wide the window is in pixels. So by dividing them, you get a "relative" position of the mouse.

   - When the mouse is all the way to the left, `mouseRelativeX` will be `0 / something = 0`.
   - When the mouse is all the way to the right, `mouseRelativeX` will be `window.innerWidth / window.innerWidth = 1`.

2. **ndcX = mouseRelativeX * 2 - 1;**

   Here's where we convert from 0-to-1 range to the -1-to-1 range of NDCs.
  
   - First, we multiply by 2. This changes our 0-to-1 range to a 0-to-2 range.
     - When `mouseRelativeX = 0`, we get `0 * 2 = 0`.
     - When `mouseRelativeX = 1`, we get `1 * 2 = 2`.
  
   - Then, we subtract 1. This shifts our range from 0-to-2 to -1-to-1.
     - When `mouseRelativeX = 0`, we get `0 * 2 - 1 = -1`.
     - When `mouseRelativeX = 1`, we get `1 * 2 - 1 = 1`.
  
So that's it! We multiply by 2 to stretch the range out, and then we subtract 1 to shift it over so it fits in the -1 to 1 range. This gives us the normalized device coordinate, or `ndcX`, which is what we use in three.js to do all sorts of cool graphical things.


![mouse-coords](../img/mouse-coords.jpg)

![coordinates](../img/coordinates.png)


## Put the thing where I clicked (verbiage)

The `createTextObject` function expects the x and y coordinates to be in the scene's coordinate space, but the `onClick` function is currently passing the coordinates based on the screen's client space (event.clientX and clientY).

You need to convert the screen coordinates (`event.clientX` and `event.clientY`) to the scene's coordinates.

You can achieve this by using the `THREE.Vector2` class to **unproject** the mouse coordinates into the scene.

The script should now correctly convert the mouse coordinates from the screen space to the scene space, allowing the text objects to be created at the desired positions when the user clicks on the screen.

## Convert DOM to Screen

```js
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const elem = renderer.domElement;
const rect = elem.getBoundingClientRect();

// CALCULATE screenX and screenY coordinates
const canvas = renderer.domElement;
const canvasWidth = canvas.width;
const canvasHeight = canvas.height;
const aspectRatio = canvasWidth / canvasHeight;

const boundingRect = canvas.getBoundingClientRect();
const left = boundingRect.left; // Left coordinate
const top_ = boundingRect.top; // Top coordinate

const ndcX = (left - canvas.offsetLeft) / canvasWidth;
const ndcY = 1 - (top_ - canvas.offsetTop) / canvasHeight;

const screenX = (ndcX * 2 - 1) * aspectRatio;
const screenY = ndcY * 2 - 1;

console.log(`Screen coordinates: (${screenX}, ${screenY})`);

// USE screenX and screenY
let geometry = new THREE.BoxGeometry(screenX, screenY, 1);
// Etc.
```

To convert the `left` and `top` coordinates obtained to Three.js screen coordinates, you can use the following steps:

1. Get the dimensions of the renderer's canvas

2. Calculate the aspect ratio of the renderer's canvas

3. Convert the `left` and `top` coordinates to normalized device coordinates (NDC), where `(0, 0)` represents the bottom-left corner of the canvas and `(1, 1)` represents the top-right corner of the canvas

4. Convert the normalized device coordinates (NDC) to Three.js screen coordinates, where `(-1, -1)` represents the bottom-left corner of the screen and `(1, 1)` represents the top-right corner of the screen:

The resulting `screenX` and `screenY` values represent the Three.js screen coordinates corresponding to the `left` and `top` coordinates obtained from `renderer.domElement.getBoundingClientRect()`.

<br>
