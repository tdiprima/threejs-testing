## Free Drawing 🎨

Yes, it is possible to add a 2D context to a three.js scene and allow the user to draw on it.

You can create a 2D canvas and then add it as a texture to a 3D plane or quad in your scene.

```js
let scene = new THREE.Scene();
// camera, renderer...

// create a 2D canvas element
let canvas = document.createElement('canvas');
canvas.width = 512;
canvas.height = 512;

let context = canvas.getContext('2d');
context.strokeStyle = "#ff0000";
context.lineWidth = 5;

// add the canvas as a texture to a plane geometry
let texture = new THREE.Texture(canvas);
let material = new THREE.MeshBasicMaterial({ map: texture });
let geometry = new THREE.PlaneGeometry(10, 10);
let mesh = new THREE.Mesh(geometry, material);
scene.add(mesh);

function onCanvasMouseMove(event) {
  let x = event.clientX - canvas.offsetLeft;
  let y = event.clientY - canvas.offsetTop;
  context.lineTo(x, y);
  context.stroke();
  texture.needsUpdate = true;
}

// allow the user to draw on the canvas
function onCanvasMouseDown(event) {
  let x = event.clientX - canvas.offsetLeft;
  let y = event.clientY - canvas.offsetTop;
  context.beginPath();
  context.moveTo(x, y);
  canvas.addEventListener('mousemove', onCanvasMouseMove);
}

canvas.addEventListener('mousedown', onCanvasMouseDown);
```

<br>

In this example, we create a 2D canvas element and add it as a texture to a 3D plane geometry.

We also define two event listeners for the canvas: one to track mouse clicks and the other to track mouse movements.

When the user clicks on the canvas, the `onCanvasMouseDown` function is called, which starts a new drawing path.

When the user moves the mouse on the canvas, the `onCanvasMouseMove` function is called, which draws a line from the last position to the current position and updates the texture of the 3D plane.

Note that we use the `needsUpdate` property of the texture to tell three.js that the texture has changed and needs to be updated.

## Changed Event Listeners

I had to change `canvas.addEventListener` to `window.addEventListener`, but it worked. :)

It's worth noting that if you used `window.addEventListener` instead of `canvas.addEventListener`, the event listeners would be attached to the **entire window** instead of just the canvas element.

**This could cause issues** if you have other elements on the page that also respond to mouse events.

To avoid conflicts with other elements on the page, it's generally a good idea to attach event listeners **directly to the element** you want to track events on.

In this case, you would want to use `canvas.addEventListener` instead of `window.addEventListener`.

BUT CANVAS DOESN'T WORK!

## Image and draw

Yes, you can add a `PlaneGeometry` to the scene, **apply an image texture** to it, and still allow the user to draw on it.

```js
// create a plane geometry with a texture
let geometry = new THREE.PlaneGeometry(10, 10);
let textureLoader = new THREE.TextureLoader();
let texture = textureLoader.load('path/to/image.jpg');
let material = new THREE.MeshBasicMaterial({map: texture});
let mesh = new THREE.Mesh(geometry, material);
scene.add(mesh);

// create a 2D canvas element and add it as a texture to the plane geometry
let canvas = document.createElement('canvas');
canvas.width = 512;
canvas.height = 512;

let context = canvas.getContext('2d');
context.strokeStyle = "#ff0000";
context.lineWidth = 5;

let canvasTexture = new THREE.CanvasTexture(canvas);
material.map = canvasTexture;

function onCanvasMouseMove(event) {
  let x = event.clientX - canvas.offsetLeft;
  let y = event.clientY - canvas.offsetTop;
  context.lineTo(x, y);
  context.stroke();
  canvasTexture.needsUpdate = true;
}

// allow the user to draw on the canvas
function onCanvasMouseDown(event) {
  let x = event.clientX - canvas.offsetLeft;
  let y = event.clientY - canvas.offsetTop;
  context.beginPath();
  context.moveTo(x, y);
  canvas.addEventListener('mousemove', onCanvasMouseMove);
}

canvas.addEventListener('mousedown', onCanvasMouseDown);
```

<br>

In this example, we first create a `PlaneGeometry` with an image texture and add it to the scene.

Then, we create a new canvas element and use it as a texture for the `PlaneGeometry`.

We also define event listeners to allow the user to draw on the canvas texture.

Note that we update the map property of the `MeshBasicMaterial` to use the canvas texture instead of the original image texture.

<span style="color:red; font-weight:bold">Instead of??</span>

We also use the `needsUpdate` property of the `CanvasTexture` to tell three.js that the texture has changed and needs to be updated.

This way, the user can draw on the canvas texture that is applied to the `PlaneGeometry`, while still seeing the underlying image texture.

## ¿Problema?

my image path is correct.  i added a light source.  i checked the code for errors.  but the image is not showing up.  i can still draw.

If you've confirmed that the image path is correct and there are no errors in your code, it's possible that the image is not showing up because it hasn't finished loading yet. <span style="color:red; font-weight:bold"><= Wrong.</span>

In three.js, textures are loaded asynchronously, which means that they may not be available immediately when you add them to a material.

You can use the `TextureLoader` to load your image and set the material's map property once the image has finished loading.

<mark>**Still didn't work.**</mark>

```js
let isDrawing = false;
let scene = new THREE.Scene();
let camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.z = 5;

let renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setClearColor(0x101010);
document.body.appendChild(renderer.domElement);

// create a plane geometry with a texture
let geometry = new THREE.PlaneGeometry(10, 10);
let textureLoader = new THREE.TextureLoader();

// load the texture
textureLoader.load('uv_grid_opengl.jpg', function(texture) {
    // create a plane geometry with a texture
    let geometry = new THREE.PlaneGeometry(10, 10);
    let material = new THREE.MeshBasicMaterial({
        map: texture
    });
    let mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);

    // create a canvas element and add it as a texture to the plane geometry
    let canvas = document.createElement('canvas');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    let context = canvas.getContext('2d');
    context.strokeStyle = "#ff0000";
    context.lineWidth = 2;

    let canvasTexture = new THREE.CanvasTexture(canvas);
    material.map = canvasTexture;

    // let element = canvas;
    let element = document;

    // allow the user to draw on the canvas
    function onCanvasMouseDown(event) {
        isDrawing = true;
        let x = event.clientX - canvas.offsetLeft;
        let y = event.clientY - canvas.offsetTop;
        context.beginPath();
        context.moveTo(x, y);
    }
    element.addEventListener('mousedown', onCanvasMouseDown);

    function onCanvasMouseMove(event) {
        if (isDrawing) {
            let x = event.clientX - canvas.offsetLeft;
            let y = event.clientY - canvas.offsetTop;
            context.lineTo(x, y);
            context.stroke();
            canvasTexture.needsUpdate = true;
        }
    }
    element.addEventListener('mousemove', onCanvasMouseMove);

    element.addEventListener('mouseup', function() {
        isDrawing = false;
        context.closePath();
        context.stroke();
    });
});

/* Resize Event */
window.addEventListener("resize", function() {
    renderer.setSize(window.innerWidth, window.innerHeight);
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.render(scene, camera);
});

/* Animate */
(function animate() {
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
})();
```

<br>

In this example, we create a new `TextureLoader` object and use it to load the image file.

The load function takes two arguments: the path to the image file, and a callback function that will be called once the texture has finished loading.

Inside the callback function, we create a `PlaneGeometry` with a `MeshBasicMaterial` that uses the loaded texture.

Once the mesh is created, we add it to the scene.

By using the callback function, we ensure that the texture is fully loaded before creating the mesh and adding it to the scene.
Right. But now we can't use "material" later on.

If the image still doesn't show up after using the `TextureLoader`, make sure that the image is a valid format (such as JPG, PNG, or GIF) and that the file is not corrupt.

## Add 2D canvas to image plane

(Before we added it to a plain plane.)

I verified that our original texture loading method is correct.  I believe the problem is when we "add the canvas as a texture to a plane geometry".  When I change `planeMaterial.map = canvasTexture` to `canvasTexture.map = planeMaterial;`, I can see the image, but now I can't draw.

When you change `planeMaterial.map = canvasTexture` to `canvasTexture.map = planeMaterial`, you are setting the map property of the canvas texture to the `MeshBasicMaterial` of the plane geometry.

This means that the **canvas texture** is no longer **used as the material of the plane**, and instead, the **original image texture** is used.

If you want to see the original image texture, you can set the `map` property of the `MeshBasicMaterial` back to the original image texture.

## Nope, pause... ✋🏼

If `planeMaterial.map = canvasTexture` is not working, it's possible that there is an issue with the `canvasTexture` object.

***(If I put it, the image doesn't show; but if I take it out, the image shows, but then I can't draw.)***

Make sure that you have created the `canvasTexture` object correctly and that it is loaded before assigning it to the map property of the material.

Also, check that the `canvasTexture` object has the correct dimensions and format. In three.js, **textures must have power-of-two dimensions** (e.g. `256x256`, `512x512`, etc.), and some formats (such as `SVG`) may not be supported.

Here's an example of how to create a canvas texture and apply it to a plane geometry:

```js
let geometry = new THREE.PlaneGeometry(10, 10);
let textureLoader = new THREE.TextureLoader();
let texture = textureLoader.load('path/to/image.jpg');
let material = new THREE.MeshBasicMaterial({map: texture});
let mesh = new THREE.Mesh(geometry, material);
scene.add(mesh);

// create a canvas element and add it as a texture to the plane geometry
let canvas = document.createElement('canvas');
let context = canvas.getContext('2d');
canvas.width = 512;
canvas.height = 512;
let canvasTexture = new THREE.CanvasTexture(canvas);

// New:
let planeMaterial = new THREE.MeshBasicMaterial({map: canvasTexture});
mesh.material = planeMaterial;
```

<br>

In this example, we create a `CanvasTexture` object from a canvas element and assign it to the `map` property of a `MeshBasicMaterial`.

Then we create a `Mesh` object with a `PlaneGeometry` and the original image texture.

Finally, we set the `material` property of the mesh to the `MeshBasicMaterial` with the canvas texture.

If the problem persists, go on vacation instead. <span style="font-size:28px;">🏝️ 🌴 🍹</span>

<br>
