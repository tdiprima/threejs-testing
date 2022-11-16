# Geometry parameters

```js
// "Cube" or "Frinkahedron", named after its discoverer. ;)
const geometry = new THREE.BoxGeometry(
  1, // width
  1, // height
  1 // Depth; that is, the length of the edges parallel to the Z axis.
);

const geometry2 = new THREE.CircleGeometry(
  1, // Radius of the circle
  100 // Number of segments
);
```

<br>

```js
// Illustrating what's going on when we set attribute "color".
const colorNumComponents = 3;
let colors = [];
let vertices = [];

for (const vertex of vertices) {
  colors.push(Math.random(), Math.random(), Math.random());
}

geometry.setAttribute(
  "color",
  new THREE.BufferAttribute(new Float32Array(colors), colorNumComponents)
);
```

<br>

# Changing three.js background to transparent or other color

<!-- https://stackoverflow.com/questions/16177056/changing-three-js-background-to-transparent-or-other-color#16177178 -->

You must now set alpha to true when creating a new WebGLRenderer instance in conjunction with the `setClearColor()` function:


```js
let renderer = new THREE.WebGLRenderer({ alpha: true });
renderer.setClearColor( 0xff0000, 1);
```

Mr.doob points out that since r78 you can alternatively use the code below to set your scene's background colour:

```js
let scene = new THREE.Scene(); // initialising the scene
scene.background = new THREE.Color( 0xff0000 );
```

<br>

# updateMatrixWorld()

Transforming Between Coordinate Spaces

**[Local to World Transforms](https://aframe.io/docs/1.3.0/introduction/developing-with-threejs.html#local-to-world-transforms)**

Normally, we'd need to call `updateMatrixWorld()` on parent Object3Ds, but three.js defaults `Object3D.matrixAutoUpdate` to true.


To get the world position of an Object3D:

```js
let worldPosition = new THREE.Vector3();
entityEl.object3D.getWorldPosition(worldPosition);
```

To get the world rotation of an Object3D:

```js
let worldQuaternion = new THREE.Quaternion();
entityEl.object3D.getWorldQuaternion(worldQuaternion);
```

<br>

# Flat shading

[built-in geometries](https://discoverthreejs.com/book/first-steps/built-in-geometries/)

**flatShading:** whether or not the object looks faceted or smooth.

<br>

# requestAnimationFrame

[requestAnimationFrame for Smart Animating](https://www.paulirish.com/2011/requestanimationframe-for-smart-animating/)

<br>

# Can three.js do 2D?

[ThreeJS Explained In 10 Minutes in 2021](https://www.kofi-group.com/threejs-explained-in-10-minutes/)

[YouTube video](https://www.youtube.com/watch?v=ZiT2tN2eEro)

JS is structured in an accessible way. The way that three.js structures its rendering means that the learning curve won't be too steep. It organizes all of the renders you'll do, whether 3D or 2D, under a "Scene" container.

<br>

# Should I use three.js?

[Why to Use ThreeJS in Web Application Development? - Cmarix](https://www.cmarix.com/blog/why-to-use-threejs-in-web-application-development/)

three.js you can use any way you could use canvas, including full-screen animations, so long as the device supports WebGL. The prospects that three.js suggest out of the package without any skills in 3D are very important when we want to create some multi-dimensional projects in no time issue.

<br>

# Articles

[brainSpell - web.archive.org](https://web.archive.org/web/20180206125803/http://brainspell.org/article/24996404)

[Three.js - Multiple Views](https://ryansblog.xyz/post/e2610e26-ffea-4594-97e2-703cef49d614)

[How To Create A Loading Screen For Your Three.js App](https://www.youtube.com/watch?v=zMzuPIiznQ4)

[Build a 3D Environment with Three.js](https://www.codecademy.com/article/brandondusch/build-a-3d-environment-with-three-js)

[Build Basic 3D Scenes with Three.js](https://javascript.plainenglish.io/three-js-lesson-1-building-basic-3d-scenes-with-three-js-e06d05c28feb)

[three.js fundamentals - multiple scenes](https://threejsfundamentals.org/threejs/lessons/threejs-multiple-scenes.html)

[Multiple instances of Three.js in same page to show objects library](https://discourse.threejs.org/t/multiple-instances-of-three-js-in-same-page-to-show-objects-library/18341)

[Display multiple instances of three.js in a single page](https://stackoverflow.com/questions/33959538/display-multiple-instances-of-three-js-in-a-single-page)
