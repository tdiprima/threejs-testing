## Follow the bouncing error messages 🥎

<!-- can you write a three.js script that uses raycasting to collect a series of mouse coordinates into a vector on mouse move, then on mouseup, draw a line on the screen, using those mouse coordinates? -->

How to use raycasting to collect mouse coordinates and draw a line in three.js 🏹 🍎

```html
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <title>Raycasting Example</title>
  <style>
    body {
      margin: 0;
      overflow: hidden;
    }
  </style>
</head>
<body>
<script src="https://cdn.jsdelivr.net/npm/three@0.131.2/build/three.min.js"></script>
<script>
// lala
</script>
</body>
</html>
```

```js
// Set up the scene and camera
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.z = 5;
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Set up the raycaster and mouse vector
const raycaster = new THREE.Raycaster();
const mouse = new THREE.Vector2();

// Set up the line material and geometry
const material = new THREE.LineBasicMaterial({
    color: 0xff0000
});
const geometry = new THREE.BufferGeometry();

// Set up the arrays to hold the line data
const positions = [];
const colors = [];
const color = new THREE.Color();

// Set up the line object
const line = new THREE.Line(geometry, material);
scene.add(line);

// Set up the mouse event listeners
document.addEventListener('mousemove', onMouseMove, false);
document.addEventListener('mouseup', onMouseUp, false);

function onMouseMove(event) {
    // Calculate the mouse position in normalized device coordinates
    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

    // Use the raycaster to get the intersection point with the scene
    raycaster.setFromCamera(mouse, camera);
    const intersects = raycaster.intersectObjects(scene.children, true);
    if (intersects.length > 0) {
        const point = intersects[0].point;
        positions.push(point.x, point.y, point.z);
        color.setHex(Math.random() * 0xffffff);
        colors.push(color.r, color.g, color.b);
        line.geometry.addAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
        line.geometry.addAttribute('color', new THREE.Float32BufferAttribute(colors, 3));
    }
}

function onMouseUp() {
    // Remove the mouse event listeners
    document.removeEventListener('mousemove', onMouseMove);
    document.removeEventListener('mouseup', onMouseUp);

    // Draw the final line
    line.geometry.setDrawRange(0, positions.length / 3);
    line.geometry.computeBoundingSphere();
}

// Render the scene
function render() {
    requestAnimationFrame(render);
    renderer.render(scene, camera);
}
render();
```

<br>
This script:

* Creates a scene with a camera and a renderer
* Sets up a raycaster and mouse vector
* Creates a line object with a material and geometry.
* When the user moves the mouse, the script uses the raycaster to get the intersection point with the scene and adds that point to an array of positions and colors for the line.
* When the user releases the mouse button, the script removes the mouse event listeners and draws the final line using the position and color arrays.

### intersects.length > 0 never executes.  What is wrong? 😑

If `intersects.length > 0` is not executing, it's likely because the raycasting is not working properly.

1. Make sure the objects in your scene have their `geometry` property set. The `intersectObjects` method uses the `geometry` property of objects to calculate intersections. If the objects don't have a `geometry`, the raycasting won't work.

2. Make sure the raycaster is set up correctly. The raycaster needs to be created with the correct parameters, including the **position** and **direction** of the **ray**.
    3. In the example I provided, the raycaster is set up to use the **normalized** device coordinates of the **mouse** position and the **camera's** position and direction. If your setup is different, make sure you adjust the raycaster parameters accordingly.

3. Make sure the mouse coordinates are being **calculated** correctly.
    4. In the example, the `mousemove` event listener calculates the normalized device coordinates of the mouse position. Make sure your code is doing something similar.

Includes some additional debugging information:

```js
// Set up the scene and camera
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.z = 5;
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Set up the raycaster and mouse vector
const raycaster = new THREE.Raycaster();
const mouse = new THREE.Vector2();

// Set up the line material and geometry
const material = new THREE.LineBasicMaterial({
    color: 0xff0000
});
const geometry = new THREE.BufferGeometry();

// Set up the arrays to hold the line data
const positions = [];
const colors = [];
const color = new THREE.Color();

// Set up the line object
const line = new THREE.Line(geometry, material);
scene.add(line);

// Set up the mouse event listeners
document.addEventListener('mousemove', onMouseMove, false);
document.addEventListener('mouseup', onMouseUp, false);

function onMouseMove(event) {
    // Calculate the mouse position in normalized device coordinates
    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

    // Use the raycaster to get the intersection point with the scene
    raycaster.setFromCamera(mouse, camera);

    const intersects = raycaster.intersectObjects(scene.children, true);
    console.log(intersects);

    if (intersects.length > 0) {
        console.log('Intersected!');
        const point = intersects[0].point;
        positions.push(point.x, point.y, point.z);
        color.setHex(Math.random() * 0xffffff);
        colors.push(color.r, color.g, color.b);
        line.geometry.addAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
        line.geometry.addAttribute('color', new THREE.Float32BufferAttribute(colors, 3));
    }
}

function onMouseUp() {
    // Remove the mouse event listeners
    document.removeEventListener('mousemove', onMouseMove, false);
    document.removeEventListener('mouseup', onMouseUp, false);

    // Update the line material to show the colors
    material.vertexColors = THREE.VertexColors;

    // Tell the renderer to render the scene
    renderer.render(scene, camera);
}
```

### What the fluff?

`intersects` is an empty array.  Is the parameter `scene.children` correct, when calling `intersectObjects`?

It's possible that the `scene.children` array doesn't contain the objects you're trying to raycast against, which would result in an empty intersects array.

When calling `intersectObjects`, the first argument should be an array of objects that you want to test for intersection.

If you're not getting any intersections, it's possible that you're not passing the correct array of objects to the function.

### Here are a few things you can try:

1. Make sure that the objects you want to test for intersection are added to the scene using `scene.add(object)` **before** calling `intersectObjects`.

2. If your scene has nested objects, you can set the **second argument** of `intersectObjects` to `true` to test for intersection with child objects as well.
   3. `raycaster.intersectObjects(scene.children, true)`

3. If you're still not getting any intersections, you can try **logging** the `scene.children` array to the console to make sure that it contains the objects you're expecting. You can also **log** the `intersects` array to see if any intersections are being detected at all. This can help you narrow down the issue.

### There are no objects.

I have no objects to intersect with.  Instead of calling `intersectObjects`, is there a function that does an **intersect** simply with the **screen coordinates?**

Yes, you can use the `unproject` method of the **camera** to **convert the mouse coordinates** into a 3D point in the scene, and then **perform your own intersection test against that point.**

```js
// Set up the scene and camera
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.z = 5;
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Set up the mouse vector
const mouse = new THREE.Vector2();

// Set up the line material and geometry
const material = new THREE.LineBasicMaterial({
    color: 0xff0000
});
const geometry = new THREE.BufferGeometry();

// Set up the arrays to hold the line data
const positions = [];
const colors = [];
const color = new THREE.Color();

// Set up the line object
const line = new THREE.Line(geometry, material);
scene.add(line);

// Set up the mouse event listeners
document.addEventListener('mousemove', onMouseMove, false);
document.addEventListener('mouseup', onMouseUp, false);

function onMouseMove(event) {
    // Calculate the mouse position in normalized device coordinates
    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

    // Use the camera to unproject the mouse coordinates into the scene
    const point = new THREE.Vector3(mouse.x, mouse.y, 0);
    point.unproject(camera);

    // Perform your own intersection test against the unprojected point
    // In this example, we're just testing against a plane at z=0
    const direction = new THREE.Vector3(0, 0, -1);
    const ray = new THREE.Raycaster(point, direction);
    const intersection = ray.intersectPlane(new THREE.Plane(new THREE.Vector3(0, 0, 1)));
    if (intersection) {
        positions.push(intersection.point.x, intersection.point.y, intersection.point.z);
        color.setHex(Math.random() * 0xffffff);
        colors.push(color.r, color.g, color.b);
        line.geometry.addAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
        line.geometry.addAttribute('color', new THREE.Float32BufferAttribute(colors, 3));
    }
}

function onMouseUp() {
    // Remove the mouse event listeners
    document.removeEventListener('mousemove', onMouseMove, false);
    document.removeEventListener('mouseup', onMouseUp, false);

    // Update the line material to show the colors
    material.vertexColors = THREE.VertexColors;

    // Tell the renderer to render the scene
    renderer.render(scene, camera);
}
```

<br>
In this modified version of the script, the **`unproject`** method of the **camera** is used to convert the mouse coordinates into a 3D point in the scene.


### are you sure `intersectPlane` is being used on the correct object?  it's saying "ray.intersectPlane is not a function"
My apologies, you are correct. The intersectPlane method is actually part of the THREE.Plane object, not the THREE.Raycaster object. Here's the corrected code:

```js
// Set up the scene and camera
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.z = 5;
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Set up the mouse vector
const mouse = new THREE.Vector2();

// Set up the line material and geometry
const material = new THREE.LineBasicMaterial({
    color: 0xff0000
});
const geometry = new THREE.BufferGeometry();

// Set up the arrays to hold the line data
const positions = [];
const colors = [];
const color = new THREE.Color();

// Set up the line object
const line = new THREE.Line(geometry, material);
scene.add(line);

// Set up the mouse event listeners
document.addEventListener('mousemove', onMouseMove, false);
document.addEventListener('mouseup', onMouseUp, false);

function onMouseMove(event) {
    // Calculate the mouse position in normalized device coordinates
    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

    // Use the camera to unproject the mouse coordinates into the scene
    const point = new THREE.Vector3(mouse.x, mouse.y, 0);
    point.unproject(camera);

    // Perform your own intersection test against the unprojected point
    // In this example, we're just testing against a plane at z=0
    const plane = new THREE.Plane(new THREE.Vector3(0, 0, 1), 0);
    const raycaster = new THREE.Raycaster(camera.position, point.sub(camera.position).normalize());
    const intersection = raycaster.intersectPlane(plane);
    if (intersection) {
        positions.push(intersection.point.x, intersection.point.y, intersection.point.z);
        color.setHex(Math.random() * 0xffffff);
        colors.push(color.r, color.g, color.b);
        line.geometry.addAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
        line.geometry.addAttribute('color', new THREE.Float32BufferAttribute(colors, 3));
    }
}

function onMouseUp() {
    // Remove the mouse event listeners
    document.removeEventListener('mousemove', onMouseMove, false);
    document.removeEventListener('mouseup', onMouseUp, false);

    // Update the line material to show the colors
    material.vertexColors = THREE.VertexColors;

    // Tell the renderer to render the scene
    renderer.render(scene, camera);
}
```

<br>
* `THREE.Plane` object that represents a plane at `z=0`
* Pass that object to the `intersectPlane` method of the `THREE...`
