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

# Examples

Notice `window.innerWidth` and `window.innerHeight` are never referenced in the code; and yet, it works for all cases.

### Full screen

```js
// We make the canvasconst renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector("canvas")
});
```

```js
// three.js makes the canvas
const renderer = new THREE.WebGLRenderer();document.body.appendChild(renderer.domElement);
```

CSS:

```css
/* Full screen */
body { margin: 0; }
canvas { width: 100vw; height: 100vh; display: block; }
```

<br>

### Inline canvas

```js
// Put canvas in middle of normal page
const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector(".diagram canvas")
});```

HTML:

```html
<p>
Pretend this is a diagram in a physics lesson and it's inline. Notice we didn't have to change the code to handle this case.
<span class="diagram"><canvas></canvas></span>
The same code that handles fullscreen handles this case as well. The only difference is the CSS and how we look up the canvas. Otherwise it just works. We didn't have to change the code because we cooperated with the browser instead of fighting it.
</p>
<script src="https://cdnjs.cloudflare.com/ajax/libs/three.js/85/three.min.js"></script>
```

CSS:

```css
body { font-size: x-large; }

.diagram { width: 150px; height: 150px; float: left; margin: 1em; }

canvas { width: 100%; height: 100%; }
```

<br>

### 50% width canvas (like a live editor)

```js
const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector(".diagram canvas")
});
```

HTML:

```html
<div class="frame">
  <div id="result">
    <canvas></canvas>
  </div>
  <div id="editor">
  explaintion of example on left or the code for it would go here
  </div>
</div>
```

CSS:

```css
html { box-sizing: border-box; }

*, *:before, *:after {
  box-sizing: inherit;
}

body { margin: 0; }

.outer {}

.frame {
  display: flex;
  width: 100vw;
  height: 100vh;
}

.frame>* {
  flex: 1 1 50%;
}

#editor {
  font-family: monospace;
  padding: .5em;
  background: #444;
  color: white;
}

canvas {
  width: 100%;
  height: 100%;
}
```

