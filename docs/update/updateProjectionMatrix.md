## Update Projection Matrix on Window Resize

```js
// Update the camera aspect & the renderer size
window.addEventListener("resize", function () {
  renderer.setSize(window.innerWidth, window.innerHeight);
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
});
```
