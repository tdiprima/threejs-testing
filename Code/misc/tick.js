/**
 * https://threejs-journey.com/lessons/animations#using-requestanimationframe
 * https://threejs-journey.com/lessons/animations#adaptation-to-the-framerate
 */
let time = Date.now();

const tick = () => {
  // Time
  const currentTime = Date.now();
  const deltaTime = currentTime - time;
  time = currentTime;

  // Update objects
  // mesh.rotation.y += 0.01;
  mesh.rotation.y += 0.01 * deltaTime;

  // Render
  renderer.render(scene, camera);

  // Call tick again on the next frame
  window.requestAnimationFrame(tick); // That's it. You have your infinite loop.
};

tick();
