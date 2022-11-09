/**
 * The idea behind the update pattern is to make each object in the scene
 * responsible for updating itself.
 * https://discourse.threejs.org/t/whats-the-best-simple-way-to-handle-the-update-pattern/13719
 */
function update() {
  const delta = clock.getDelta();

  scene.traverse(child => {
    if (typeof child.update === 'function') child.update(delta);
  });
}

renderer.setAnimationLoop(() => {
  update();
  render();
});
