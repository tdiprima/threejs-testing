# [gman](https://stackoverflow.com/questions/29884485/threejs-canvas-size-based-on-container#29884485) 😎

Some people seem to be concerned about **performance**, as if checking if 2 values don't match 2 other values has any measurable performance impact. 🙄

In any case, there's the older answer I posted above which just **checks the size of the container.**

People have suggested using `window.addEventListener('resize', ...)` but failed to notice that does not handle the case where the canvas changes size but the window itself does not.

The newer `ResizeObserver` isn't all that great.

# Three.js example

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

# Using event listener

**Examples** with  `window.addEventListener("resize", ...)` ("wrong" way).

Now, this is based on three.js examples.  Gman is awesome, but idk...
It could be that these examples were made a gazillion years ago; and gman evolved, whereas the examples did not.

[picture-in-picture.html](picture-in-picture.html)

[how-to-use-2-cameras-1.html](how-to-use-2-cameras-1.html)

[bear-soongnyoong.html](bear-soongnyoong.html)

[how-to-use-2-cameras.html](how-to-use-2-cameras.html)

# Calling a function

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
