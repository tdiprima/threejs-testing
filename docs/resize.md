## [Three.js canvas size based on container](https://stackoverflow.com/questions/29884485/threejs-canvas-size-based-on-container#45046955)

<a href="https://webglfundamentals.org/webgl/lessons/webgl-resizing-the-canvas.html">See also: WebGL Resizing the Canvas</a>

Update: 2021, there is no "best" way, there are just multiple ways with various tradeoffs.

In any case, there's the older answer I posted above which just **checks the size of the container.**

People have suggested using `window.addEventListener('resize', ...)` but failed to notice that does not handle the case where the canvas changes size but the window itself does not.

The newer `ResizeObserver` isn't all that great.

## Example

```js
// Resize when *window* size changes
window.addEventListener("resize", onWindowResize);

// We update the camera aspect & the renderer size
function onWindowResize() {
  const width = window.innerWidth;
  const height = window.innerHeight;

  camera.aspect = width / height;
  camera.updateProjectionMatrix();

  renderer.setSize(width, height);
}

function animate() {

  requestAnimationFrame(animate);

  stats.begin();
  render(); // Call render here!
  stats.end();

}

function render() {
  // Update the geometries material.
  
  // Do rotation.
  
  // Change the background.
  
  renderer.render(scene, camera);

} 
```

## Set a boolean

[Every](https://stackoverflow.com/questions/29884485/threejs-canvas-size-based-on-container#59176168) animationframe @gman will run the function `resizeCanvasToDisplaySize`, doing multiple calculations.

```js
let resized = false

// resize event listener
window.addEventListener('resize', function() {
    resized = true
})

function animate(time) {
    time *= 0.001

    if (resized) resize()

    // rotate the cube
    cube.rotation.x += 0.01
    cube.rotation.y += 0.01

    // render the view
    renderer.render(scene, camera)

    // animate
    requestAnimationFrame(animate)
}

function resize() {
    resized = false

    // update the size
    renderer.setSize(window.innerWidth, window.innerHeight)

    // update the camera
    const canvas = renderer.domElement
    camera.aspect = canvas.clientWidth/canvas.clientHeight
    camera.updateProjectionMatrix()
}
```

## Using event listener

[picture-in-picture.html](../Code/cameras/picture-in-picture.html)

[how-to-use-2-cameras-1.html](../Code/cameras/how-to-use-2-cameras-1.html)

<!--bear-soongnyoong.html-->

[how-to-use-2-cameras.html](../Code/cameras/how-to-use-2-cameras.html)

## Calling a function

```js
// TODO: You could return a boolean from here as well
function resizeCanvasToDisplaySize() {
  const canvas = renderer.domElement;
  // look up the size the canvas is being displayed
  const width = canvas.clientWidth;
  const height = canvas.clientHeight;
  
    // adjust displayBuffer size to match
  if (canvas.width !== width || canvas.height !== height) {
    // you must pass false here or three.js sadly fights the browser
    renderer.setSize(width, height, false);

    // Camera aspect updated here; versus in an event handler.
    camera.aspect = width / height;
    camera.updateProjectionMatrix();

    // update any render target sizes here
  }
}
```

```js
function animate(time) {
  time *= 0.001;  // seconds

  // Call it from here; it's a function, not an event handler.
  resizeCanvasToDisplaySize();

  mesh.rotation.x = time * 0.5;
  mesh.rotation.y = time * 1;

  renderer.render(scene, camera);
  requestAnimationFrame(animate);
}

requestAnimationFrame(animate);
```
