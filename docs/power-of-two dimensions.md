## Power-of-two dimensions

```js
// ../Code/draw-on-image/draw1.html
let canvas = document.createElement("canvas");

let canvasContext.drawImage(image, 0, 0, window.innerWidth, window.innerHeight);

let texture = new THREE.CanvasTexture(canvas);

let material = new THREE.MeshBasicMaterial({ map: texture });
```

<br>

Make sure that you have created the `canvasTexture` object correctly and that it is loaded before assigning it to the map property of the material.

Also, check that the `canvasTexture` object has the correct dimensions and format. In three.js, **textures must have power-of-two dimensions** (e.g. `256x256`, `512x512`, etc.), and some formats (such as `SVG`) may not be supported.
