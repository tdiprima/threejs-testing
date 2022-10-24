/**
 * https://threejs-journey.com/lessons/animations#using-requestanimationframe
 * https://threejs-journey.com/lessons/animations#adaptation-to-the-framerate
 * To adapt the animation to the framerate, we need to know how much time it's been since the last tick.
 * When we base our rotation on how much time was spent since the last frame, this rotation speed will be the same
 * on every screen and every computer regardless of the frame rate.
 * https://sbcode.net/threejs/animation-loop/
 * The callback routine must itself call requestAnimationFrame() if you want to animate another frame at the next repaint.
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
  // console.log("deltaTime", deltaTime);

  // Render
  renderer.render(scene, camera);

  // Call tick again on the next frame
  window.requestAnimationFrame(tick); // That's it. You have your infinite loop.
};

tick();
