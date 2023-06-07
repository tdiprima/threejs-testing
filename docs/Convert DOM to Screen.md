## Put the thing where I clicked

Why isn't this working...?

```js
function createTextObject(text, x, y) {
  // ...
}

function onClick(event) {
  const canvas = renderer.domElement;
  const rect = canvas.getBoundingClientRect();
  const x = event.clientX - rect.left;
  const y = event.clientY - rect.top;

  const vector = new THREE.Vector2(
    (x / canvas.clientWidth) * 2 - 1, 
    -(y / canvas.clientHeight) * 2 + 1
  );

  raycaster.setFromCamera(vector, camera);
  const intersects = raycaster.intersectObjects(scene.children);

  if (intersects.length === 0) {
    const textInput = document.getElementById('text-input');
    const text = textInput.value.trim();

    if (text !== '') {
      createTextObject(text, x, y); // oops. vector.x, vector.y
      textInput.value = '';
    }
  }
}
```

## Because we're professionals? 👉 ☎️ 💀

The issue seems to lie with the incorrect handling of the `event.clientX` and `event.clientY` coordinates when creating the text objects. The `createTextObject` function expects the `x` and `y` coordinates to be in the **scene's coordinate space**, but the `onClick` function is currently passing the coordinates based on the **screen's client space.**

To fix this issue, you need to convert the screen coordinates (`event.clientX` and `event.clientY`) to the scene's coordinates. You can achieve this by using the `THREE.Vector2` and `THREE.Vector3` classes to unproject the mouse coordinates into the scene.

Here's an updated version of your code that addresses this issue:

```html
<input id="text-input" placeholder="Type your text here" type="text"> 
<script src="https://cdnjs.cloudflare.com/ajax/libs/three.js/110/three.min.js"></script>
```

```js
  let scene, camera, renderer, mouse, raycaster;
  let textObjects = [];
  let fontUrl = "https://threejs.org/examples/fonts/helvetiker_regular.typeface.json";
  
  function createTextObject(text, x, y) {
    const loader = new THREE.FontLoader();
    loader.load(fontUrl, function (font) {
      const geometry = new THREE.TextGeometry(text, {
        font: font,
        size: 5,
        height: 0.2
      });
      const material = new THREE.MeshBasicMaterial({ color: 0xffffff });
      const textMesh = new THREE.Mesh(geometry, material);
      textMesh.position.set(x, y, 0);
      scene.add(textMesh);
      textObjects.push(textMesh);
    });
  }
  
  function onClick(event) {
    const canvas = renderer.domElement;
    const rect = canvas.getBoundingClientRect();
    
    // Convert screen coordinates to scene coordinates
    const mouse = new THREE.Vector2(
      (event.clientX / canvas.clientWidth) * 2 - 1,
      -(event.clientY / canvas.clientHeight) * 2 + 1
    );
    const raycaster = new THREE.Raycaster();
    raycaster.setFromCamera(mouse, camera);
    const intersects = raycaster.intersectObjects(scene.children);
    
    if (intersects.length === 0) {
      const textInput = document.getElementById('text-input');
      const text = textInput.value.trim();
      if (text !== '') {
        createTextObject(text, mouse.x, mouse.y);
        textInput.value = '';
      }
    }
  }
  
  function init() {
    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 30;
    renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);
    
    mouse = new THREE.Vector2();
    raycaster = new THREE.Raycaster();
    
    document.addEventListener('click', onClick, false);
  }
  
  function animate() {
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
  }
  
  init();
  animate();
</script>
```

With these modifications, the script should now correctly convert the mouse coordinates from the screen space to the scene space, allowing the text objects to be created at the desired positions when the user clicks on the screen.

## Convert DOM to Screen

To convert the `left` and `top` coordinates obtained from `renderer.domElement.getBoundingClientRect()` to Three.js screen coordinates, you can use the following steps:

1. Get the dimensions of the renderer's canvas:

    ```javascript
    const canvas = renderer.domElement;
    const canvasWidth = canvas.width;
    const canvasHeight = canvas.height;
    ```

2. Calculate the aspect ratio of the renderer's canvas:

    ```javascript
    const aspectRatio = canvasWidth / canvasHeight;
    ```

3. Convert the `left` and `top` coordinates to normalized device coordinates (NDC), where `(0, 0)` represents the bottom-left corner of the canvas and `(1, 1)` represents the top-right corner of the canvas:

    ```javascript
    const ndcX = (left - canvas.offsetLeft) / canvasWidth;
    const ndcY = 1 - (top - canvas.offsetTop) / canvasHeight;
    ```

4. Convert the normalized device coordinates (NDC) to Three.js screen coordinates, where `(-1, -1)` represents the bottom-left corner of the screen and `(1, 1)` represents the top-right corner of the screen:

    ```javascript
    const screenX = (ndcX * 2 - 1) * aspectRatio;
    const screenY = ndcY * 2 - 1;
    ```

The resulting `screenX` and `screenY` values represent the Three.js screen coordinates corresponding to the `left` and `top` coordinates obtained from `renderer.domElement.getBoundingClientRect()`.

## Example

```javascript
const canvas = renderer.domElement;
const canvasWidth = canvas.width;
const canvasHeight = canvas.height;
const aspectRatio = canvasWidth / canvasHeight;

const boundingRect = canvas.getBoundingClientRect();
const left = boundingRect.left; // Left coordinate
const top = boundingRect.top; // Top coordinate

const ndcX = (left - canvas.offsetLeft) / canvasWidth;
const ndcY = 1 - (top - canvas.offsetTop) / canvasHeight;

const screenX = (ndcX * 2 - 1) * aspectRatio;
const screenY = ndcY * 2 - 1;

// Use the screenX and screenY coordinates as needed
console.log(`Screen coordinates: (${screenX}, ${screenY})`);
```

Make sure to replace the `...` with your actual `left` and `top` coordinates obtained from `renderer.domElement.getBoundingClientRect()`.

<br>
