# Three.js canvas size based on container.

How can I calculate canvas size based on its container?

```html
<div id="container"></div>
```

```js
// Usually we just set the renderer?
renderer = new THREE.WebGLRenderer();
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
```

### [gman - stackoverflow](https://stackoverflow.com/questions/29884485/threejs-canvas-size-based-on-container#29884485)

Arguably the best way to resize three.js is to code it so it just accepts whatever size the canvas is as set by CSS. That way, no matter how you use the canvas your code will work, no need to change it for different situations.

### 1. Set camera size

There's no reason to set the initial aspect ratio (of camera), because we're going to set it in response to the size of the canvas changing. So it's just a waste of code to set it twice.

There's no reason to set the aspect here, because we're going to set it every frame anyway. So we'll set it to 2, since 2 is the aspect for the canvas default size `(300w / 150h = 2)`.

```js
const camera = new THREE.PerspectiveCamera(70, 2, 1, 1000);
```

### 2. Set canvas size

Then we need some code that will resize the canvas to match its display size.

```js
function resizeCanvasToDisplaySize() {
  const canvas = renderer.domElement;
  // look up the size the canvas is being displayed
  const width = canvas.clientWidth;
  const height = canvas.clientHeight;

  // adjust displayBuffer size to match
  if (canvas.width !== width || canvas.height !== height) {
    // you must pass false here or three.js sadly fights the browser
    renderer.setSize(width, height, false);
    camera.aspect = width / height;
    camera.updateProjectionMatrix();

    // update any render target sizes here
  }
}
```

### Call it in your render loop before rendering.

```js
function animate(time) {
  time *= 0.001;  // seconds

  resizeCanvasToDisplaySize(); // resize the canvas

  mesh.rotation.x = time * 0.5;
  mesh.rotation.y = time * 1;

  renderer.render(scene, camera); // render
  requestAnimationFrame(animate);
}

requestAnimationFrame(animate);
```

<br>

# Resize canvas from resize() 🤔
Why do the existing suggestions involve resizing the canvas from within the animation loop?

You'd want your animation loop to do as little as possible, as it will ideally be repeated 30+ times a second, and should be optimized to run as efficiently as possible - affording the maximum fps to the slowest system running it.

I think there's no harm in calling the resize function from within the resize event listener.

Something like this:

```js
var container = renderer.domElement.parentElement;
container.addEventListener('resize', onContainerResize);

function onContainerResize() {
  var box = container.getBoundingClientRect();
  renderer.setSize(box.width, box.height);

  camera.aspect = box.width / box.height
  camera.updateProjectionMatrix()
  // optional animate/renderloop call put here for render-on-changes
}
```

If you have some kind of render-only-on-changes set up, you can call the render function at the end of the resize function. Otherwise the next time the render loop does fire it should just render with the new settings.