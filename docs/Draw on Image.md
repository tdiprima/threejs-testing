## Drawing <span style="font-size:32px;">🏴‍☠️</span>

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

<br>

Also, we did `{ alpha: true }` on the renderer. Remove it and see if it matters.

Can you *draw* using HTML5?  No.  Draw using a geometry.

**Disclaimer:** You can.  If you're loading the image using a texture.  But then you don't see the image for some reason.  That's why I'm here.

Coordinates &ndash; since we're using geometries, *now* we convert the coordinates.

Don't let anybody tell you some BS about the event listeners not firing due to the Three.js canvas overlapping the HTML canvas.

The only thing it seems to recognize as clickable, is the renderer canvas.  Or the window or document, duh.

When we do interact with objects, how does it work then?  Raycasting.  You're still adding the event listener to the document (or renderer canvas); not the mesh.

### Here's some css anyway:

```css
body { margin: 0; overflow: hidden; }
/* Allow the mouse events to pass through the three.js canvas */
canvas { display: block; pointer-events: none; }
/* Try setting it on the Three.js renderer's DOM element instead of the Three.js canvas itself */
#canvas-container { position: relative; }
/* The HTML canvas is positioned absolutely on top of the container, enabling the event listeners to work correctly. */
#canvas-container canvas { position: absolute; top: 0; left: 0; pointer-events: none; }
```

### I'm putting this StackOverflow because it looks familiar:

[Drawing a line dynamically](https://stackoverflow.com/questions/31399856/drawing-a-line-with-three-js-dynamically)


## Line Rendering: Bounding Sphere

```js
let line = new THREE.Line(bufferGeometry, lineMaterial);
scene.add(line);

// When we intersect
positions.push(point.x, point.y, point.z);
line.geometry.setAttribute("position", new THREE.Float32BufferAttribute(positions, 3));

// onMouseUp
line.geometry.setDrawRange(0, positions.length / 3);
line.geometry.computeBoundingSphere();        
```

<br>
<span style="color:#0000dd;font-size:larger;">What is this bounding sphere?</span>

The `computeBoundingSphere` method calculates and updates the bounding sphere of an object based on its geometry. The bounding sphere represents the **smallest sphere** that completely encloses the object's geometry. It is used for various purposes, including frustum culling, collision detection, and efficient rendering.

When you create a `THREE.Line` object and accumulate points in an array, the bounding sphere is initially not computed automatically. By calling `computeBoundingSphere`, you are explicitly instructing Three.js to calculate the bounding sphere based on the current geometry of the line.

The reason for computing the bounding sphere is to <mark>**optimize the rendering process.**</mark> When rendering a complex scene, it's computationally expensive to check each individual vertex or point for visibility or intersection tests. 

The bounding sphere provides a simplified representation of the object's geometry, allowing for **faster calculations.**

For example, during **frustum culling**, the bounding sphere can be used to quickly determine if the object is completely outside the view frustum and can be culled (not rendered).

In your case, setting the draw range and then computing the bounding sphere is likely done to ensure that the bounding sphere accurately represents the visible portion of the line. The **`setDrawRange` method** allows you to specify a range of vertices to be rendered, which can be useful if you're **dynamically updating** the line over time. By recomputing the bounding sphere after setting the draw range, you ensure that the bounding sphere encompasses the visible portion of the line only, rather than the entire set of accumulated points.

Overall, the bounding sphere is a performance optimization technique used in computer graphics to speed up rendering and collision detection. By computing a simplified representation of an object's geometry, it allows for more efficient calculations and can improve the overall performance of your application.

<br>
