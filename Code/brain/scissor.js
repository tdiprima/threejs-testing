// Create renderer
// You need this in order to get the picture-in-picture effect.
renderer.setScissorTest(true);

// render, or 'draw a still image', of the scene
function render() {
  // full screen
  renderer.setScissor(0, 0, window.innerWidth, window.innerHeight);
  renderer.setViewport(0, 0, window.innerWidth, window.innerHeight);
  renderer.render(scene, camera);

  // corner
  let widthHalf = window.innerWidth / 2;
  let heightHalf = window.innerHeight / 2;

  renderer.setScissor(widthHalf, heightHalf, widthHalf, heightHalf);
  renderer.setViewport(widthHalf, heightHalf, widthHalf, heightHalf);

  renderer.render(scene, camera);
}

function animate() {
  update();
  requestAnimationFrame(animate);
  controls.update();
  render();
}
