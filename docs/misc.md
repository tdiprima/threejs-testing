# Camera, view, whatever.

[Camera position in Three JS](https://youtu.be/lSkC-EeStyQ)

```text
x = width / left and right // horizontal movement
y = height / top and bottom // vertical movement
z = depth / zoom (in or out)
```

gman<br>
[https://stackoverflow.com/questions/29884485/threejs-canvas-size-based-on-container](https://stackoverflow.com/questions/29884485/threejs-canvas-size-based-on-container)

```js
// There's no reason to set the aspect here because we're going
// to set it every frame anyway so we'll set it to 2 since 2
// is the the aspect for the canvas default size (300w/150h = 2)
const camera = new THREE.PerspectiveCamera(70, 2, 1, 1000);

// Then we need some code that will resize the canvas to match its display size
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

// Call this in your render loop before rendering
function animate(time) {
  time *= 0.001;  // seconds

  resizeCanvasToDisplaySize();

  mesh.rotation.x = time * 0.5;
  mesh.rotation.y = time * 1;

  renderer.render(scene, camera);
  requestAnimationFrame(animate);
}

requestAnimationFrame(animate);
```

[three.js multiple camera](https://www.google.com/search?q=three.js+multiple+camera&oq=three.js+multiple+camera&aqs=chrome..69i57j0i22i30l2.2131j0j7&sourceid=chrome&ie=UTF-8)

[Brainspell](https://web.archive.org/web/20180206125803/http://brainspell.org/article/24996404)<br>
**Note to self:** OF COURSE!  Brain only works with lower version of three.  Because SubdivisionModifier deals only in &ndash; what, again?  Geometry! 💢

[How To Create A Loading Screen For Your Three.js App](https://www.youtube.com/watch?v=zMzuPIiznQ4)

[Build a 3D Environment with Three.js](https://www.codecademy.com/article/brandondusch/build-a-3d-environment-with-three-js)

[Build Basic 3D Scenes with Three.js](https://javascript.plainenglish.io/three-js-lesson-1-building-basic-3d-scenes-with-three-js-e06d05c28feb)

[threejsfundamentals multiple-scenes](https://r105.threejsfundamentals.org/threejs/lessons/threejs-multiple-scenes.html)

[comments](https://threejsfundamentals.org/threejs/lessons/threejs-multiple-scenes.html)

[Multiple instances of Three.js in same page to show objects library](https://discourse.threejs.org/t/multiple-instances-of-three-js-in-same-page-to-show-objects-library/18341)

[Display multiple instances of three.js in a single page](https://stackoverflow.com/questions/33959538/display-multiple-instances-of-three-js-in-a-single-page)

> Can three Js do 2D?
JS IS STRUCTURED IN AN ACCESSIBLE WAY. The way that Three. js structures its rendering means that the learning curve won't be too steep. It organizes all of the renders you'll do, whether 3D or 2D, under a “Scene” container.

[ThreeJS Explained In 10 Minutes in 2021 - Kofi Group](https://www.kofi-group.com/threejs-explained-in-10-minutes/)

[YouTube](https://www.youtube.com/watch?v=ZiT2tN2eEro)

> Should I use three Js?
Three. js you can use any way you could use canvas, including full-screen animations, so long as the device supports WebGL. The prospects that Three. js suggest out of the package without any skills in 3D are very important when we want to create some multi-dimensional projects in no time issue.Jan 16, 2018

[Why to Use ThreeJS in Web Application Development? - Cmarix](https://www.cmarix.com/blog/why-to-use-threejs-in-web-application-development/)
