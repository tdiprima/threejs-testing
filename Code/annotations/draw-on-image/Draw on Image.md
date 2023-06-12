## Drawing 🏴‍☠️

Does `OrthographicCamera` have anything to do with drawing? No.

Can you load the image the HTML5 way?  Yes.

Sort of.  You have to add the canvas to a plane, then.

```javascript
const texture = new THREE.CanvasTexture(canvas);
const material = new THREE.MeshBasicMaterial({ map: texture });
const planeGeometry = new THREE.PlaneGeometry(2, 2);
const plane = new THREE.Mesh(planeGeometry, material);
scene.add(plane);
```

Can you *draw* using HTML5?  No.  Draw using a geometry.

Coordinates &ndash; since we're using geometries, *now* we convert the coordinates.

Don't let anybody tell you some BS about the event listeners not firing due to the Three.js canvas overlapping the HTML canvas.

The only thing it seems to recognize as clickable, is the renderer canvas.  Or the window or document, duh.

When we do interact with objects, how does it work then?  Raycasting.  You're still adding the event listener to the document; not the mesh.

Here's some css anyway:

```css
body { margin: 0; overflow: hidden; }
/* Allow the mouse events to pass through the three.js canvas */
canvas { display: block; pointer-events: none; }
/* Try setting it on the Three.js renderer's DOM element instead of the Three.js canvas itself */
#canvas-container { position: relative; }
/* The HTML canvas is positioned absolutely on top of the container, enabling the event listeners to work correctly. */
#canvas-container canvas { position: absolute; top: 0; left: 0; pointer-events: none; }
```

<br>
