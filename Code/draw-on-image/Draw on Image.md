## Drawing <span style="font-size:32px;">🏴‍☠️</span>
<!-- TJD -->

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

Coordinates &mdash; since we're using geometries, *now* we convert the coordinates.

Don't let anybody tell you some BS about the event listeners not firing due to the Three.js canvas overlapping the HTML canvas.

The only thing it seems to recognize as clickable, is the renderer canvas.  Or the window or document, duh.

When we do interact with objects, how does it work then?  Raycasting.  You're still adding the event listener to the document (or renderer canvas); not the mesh.


## Compute Bounding Sphere Explanation

<a href="../Code/draw-on-image/draw2.html">draw 2</a>

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
Imagine you have a bunch of points in 3D space that make up an object (in this case, a line). A "bounding sphere" is like an invisible ball that completely contains all these points. The sphere is as small as possible but still big enough to fit every point inside it.

```js
line.geometry.setAttribute("position", new THREE.Float32BufferAttribute(positions, 3));
```

updates the line's geometry with the new points.

```js
line.geometry.setDrawRange(0, positions.length / 3);
```

specifies what part of the line should be drawn.

```js
line.geometry.computeBoundingSphere();
```

calculates the smallest possible sphere that can contain the whole line.

### So, why do you need to compute a bounding sphere?

Computing the bounding sphere helps Three.js to be more efficient when rendering your 3D world.

When rendering a complex scene, it's computationally expensive to check each individual vertex or point for visibility or intersection tests.

The bounding sphere provides a simplified representation of the object's geometry, allowing for **faster calculations.**

For example, during **frustum culling**, the bounding sphere can be used to quickly determine if the object is completely outside the view frustum and can be culled (not rendered).

In your case, setting the draw range and then computing the bounding sphere is likely done to ensure that the bounding sphere accurately represents the visible portion of the line. The **`setDrawRange` method** allows you to specify a range of vertices to be rendered, which can be useful if you're **dynamically updating** the line over time. By recomputing the bounding sphere after setting the draw range, you ensure that the bounding sphere encompasses the visible portion of the line only, rather than the entire set of accumulated points.

Overall, the bounding sphere is a performance optimization technique used in computer graphics to speed up rendering and collision detection. By computing a simplified representation of an object's geometry, it allows for more efficient calculations and can improve the overall performance of your application.

<br>
