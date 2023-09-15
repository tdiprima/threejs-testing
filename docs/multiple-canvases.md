## Three.js Multiple Canvases Multiple Scenes

[Multiple Scenes](cameras/multiple-scenes.html), see "waybacked".

<!-- https://r105.threejsfundamentals.org/threejs/lessons/threejs-multiple-scenes.html -->

The solution is one canvas that fills the viewport in the background and some other element to represent each "virtual" canvas.

## How to change the zOrder of object with Threejs
<!--https://stackoverflow.com/questions/12666570/how-to-change-the-zorder-of-object-with-threejs#12666937-->
answered Oct 1, 2012 at 2:39,
edited Jul 17, 2022 at 23:40

If you want some objects to render "on top", or "in front", one trick is to create two scenes &mdash; the first scene is your regular scene, and the second scene contains the objects that you want to have on top.

First, set

```js
renderer.autoClear = false;
```

Then create two scenes

```js
var scene = new THREE.Scene();
var scene2 = new THREE.Scene();
```

Add your objects to the first scene as usual, and add the objects you want to have "on top" to the second scene.

Then, in your render() function, do this:

```js
renderer.clear();
renderer.render( scene, camera );
renderer.clearDepth();
renderer.render( scene2, camera );
```

This will render the first scene, clear the depth buffer, and then render the second scene on top.

three.js r.142


See: [cute!](https://codesandbox.io/s/view-tracking-bp6tmc)

## seanwasere
<!--https://discourse.threejs.org/t/rendering-multiple-scenes-on-same-canvas/42131/2-->
Sep '22

[Anisotropic Filtering](https://sbcode.net/threejs/anistropic/)

<div class="cooked"><p>You can use the renderers scissor test.<br>
I have an example here: <a href="https://sbcode.net/threejs/anistropic/" rel="noopener nofollow ugc">Anistropic Filtering - Three.js Tutorials (sbcode.net) <span class="badge badge-notification clicks" title="253 clicks">253</span></a></p>
<p>See lines 148 - 161. Left and right of canvas render different scenes.</p>
<p>Read more about scissors here : <a href="https://threejs.org/docs/#api/en/renderers/WebGLRenderer.setScissor" rel="noopener nofollow ugc">WebGLRenderer#setScissor – three.js docs (threejs.org) <span class="badge badge-notification clicks" title="108 clicks">108</span></a></p>
<p>Also, if you want to render multiple scenes at the same time, there is no problem with using different canvases.<br>
Example : <a href="https://sbcode.net/threejs/scene-camera-renderer/#final-scripts" rel="noopener nofollow ugc">Scene, Camera and Renderer - Three.js Tutorials (sbcode.net) <span class="badge badge-notification clicks" title="128 clicks">128</span></a></p></div>

## Mugen87
<!--https://discourse.threejs.org/t/multiple-instances-of-three-js-in-same-page-to-show-objects-library/18341/3-->
Sep '20

<p>If you are going to create multiple canvas objects, you have to use a similar approach like in <a href="https://threejs.org/examples/webgl_multiple_canvases_grid">webgl_multiple_canvases_grid <span class="badge badge-notification clicks" title="47 clicks">47</span></a> (waybacked!!). Meaning you have to do a render for each view and then copy the contents from the renderer’s internal canvas to the view’s canvas. In the demo, this done with the following line:</p>

```js
context.drawImage( renderer.domElement, 0, 0 );
```

<p>where <code>context</code> is a 2D drawing context of a view canvas.</p>
<p>I’m not sure about the overhead of this copy operation. Especially if you have to do this 20/30 times per frame. Hence, I would prefer the approach from <code>webgl_multiple_elements</code>.</p>

<p>If you use the approach from <code>webgl_multiple_canvases_grid</code>, you only have a single instance of <code>WebGLRenderer</code>.</p>

## gman
<!--https://stackoverflow.com/questions/33959538/display-multiple-instances-of-three-js-in-a-single-page#33959538-->
answered Nov 29, 2015, edited Nov 17, 2021

<p>This has been covered elsewhere but the easiest way is to just use one instance of three.js, make it cover the entire window, put place holder divs where you want to draw things, and then use <code>element.getClientBoundingRect</code> to set the scissor and viewport for each scene you want to draw in each element</p>
<p><a href="http://threejs.org/examples/webgl_multiple_elements.html" rel="nofollow noreferrer">There's an example here</a>.</p>
<p>Here's the answer in StackOverflow from which that sample originates</p>
<p><a href="https://stackoverflow.com/a/30633132/128511">https://stackoverflow.com/a/30633132/128511</a></p>
<hr>
<p>Another solution would be to use another not visible canvas and pass it to all instances of three.js (which will mean they all use the same WebGL context), then copy the results to individual 2D canvas.</p>
<p>Example:</p>

```css
canvas { width: 128px; height: 128px; display: block; }
.outer { border: 1px solid black; margin: 5px; display: inline-block; }
```

```js
//<script type="module">
import * as THREE from 'https://threejsfundamentals.org/threejs/resources/threejs/r132/build/three.module.js';
import {OrbitControls} from 'https://threejsfundamentals.org/threejs/resources/threejs/r132/examples/jsm/controls/OrbitControls.js';

function main(visibleCanvas, offscreenSharedCanvas) {
  const visibleCanvas2DContext = visibleCanvas.getContext('2d');
  const renderer = new THREE.WebGLRenderer({canvas: offscreenSharedCanvas});

  const fov = 45;
  const aspect = 2;  // the canvas default
  const near = 0.1;
  const far = 100;
  const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
  camera.position.set(0, 10, 20);

  const controls = new OrbitControls(camera, visibleCanvas);
  controls.target.set(0, 5, 0);
  controls.update();

  const scene = new THREE.Scene();
  scene.background = new THREE.Color('black');

  {
    const planeSize = 40;

    const loader = new THREE.TextureLoader();
    const texture = loader.load('https://threejsfundamentals.org/threejs/resources/images/checker.png');
    texture.wrapS = THREE.RepeatWrapping;
    texture.wrapT = THREE.RepeatWrapping;
    texture.magFilter = THREE.NearestFilter;
    const repeats = planeSize / 2;
    texture.repeat.set(repeats, repeats);

    const planeGeo = new THREE.PlaneGeometry(planeSize, planeSize);
    const planeMat = new THREE.MeshPhongMaterial({
      map: texture,
      side: THREE.DoubleSide,
    });
    const mesh = new THREE.Mesh(planeGeo, planeMat);
    mesh.rotation.x = Math.PI * -.5;
    scene.add(mesh);
  }
  {
    const cubeSize = 4;
    const cubeGeo = new THREE.BoxGeometry(cubeSize, cubeSize, cubeSize);
    const cubeMat = new THREE.MeshPhongMaterial({color: '#8AC'});
    const mesh = new THREE.Mesh(cubeGeo, cubeMat);
    mesh.position.set(cubeSize + 1, cubeSize / 2, 0);
    scene.add(mesh);
  }
  {
    const sphereRadius = 3;
    const sphereWidthDivisions = 32;
    const sphereHeightDivisions = 16;
    const sphereGeo = new THREE.SphereGeometry(sphereRadius, sphereWidthDivisions, sphereHeightDivisions);
    const sphereMat = new THREE.MeshPhongMaterial({color: '#CA8'});
    const mesh = new THREE.Mesh(sphereGeo, sphereMat);
    mesh.position.set(-sphereRadius - 1, sphereRadius + 2, 0);
    scene.add(mesh);
  }

  {
    const color = 0xFFFFFF;
    const intensity = 1;
    const light = new THREE.DirectionalLight(color, intensity);
    light.position.set(0, 10, 0);
    light.target.position.set(-5, 0, 0);
    scene.add(light);
    scene.add(light.target);
  }

  // need to resize both the visibleCanvas and the offscreenSharedCanvas
  function resizeRendererToDisplaySize(renderer) {
    const canvas = renderer.domElement;
    const width = visibleCanvas.clientWidth;
    const height = visibleCanvas.clientHeight;
    const needResize = offscreenSharedCanvas.width !== width || offscreenSharedCanvas.height !== height ||
                       visibleCanvas.width !== width || visibleCanvas.height !== height;
    if (needResize) {
      renderer.setSize(width, height, false);
      visibleCanvas.width = width;
      visibleCanvas.height = height;
    }
    return needResize;
  }

  let requestId;
  let visible;
  function render() {
    requestId = undefined;

    if (resizeRendererToDisplaySize(renderer)) {
      camera.aspect = visibleCanvas.clientWidth / visibleCanvas.clientHeight;
      camera.updateProjectionMatrix();
    }

    renderer.render(scene, camera);
    
    // copy the offscreenSharedCanvas to the visible canvas
    visibleCanvas2DContext.drawImage(offscreenSharedCanvas, 0, 0);

    if (visible) {
      startRendering();
    }
  }
  
  function startRendering() {
    if (!requestId) {
      requestId = requestAnimationFrame(render);
    }
  }

  // use an intersection observer to only render this canvas when on screen
  const intersectionObserver = new IntersectionObserver(entries => {
    if (entries[0].isIntersecting) {
      visible = true;
      startRendering();
    } else {
      visible = false;
    }
  });
  intersectionObserver.observe(visibleCanvas);
}

const offscreenSharedCanvas = document.createElement('canvas');
for (let i = 0; i < 20; ++i) {
  const outer = document.createElement('div');
  outer.className = 'outer';
  document.body.appendChild(outer);
  const canvas = document.createElement('canvas');
  outer.appendChild(canvas);
  main(canvas, offscreenSharedCanvas);
}

//</script>
```

<p>The copying might make it slow. Ideally you'd use an <code>IntersectionObserver</code> to start/stop any canvas offscreen from updating.</p>
    </div>
    
<p>the browsers limit the number on webgl contexts you can display on a page. Often as few as 8.</p>

<br>
