## Reminder

Here's what to do. You can create a raycaster object that shoots out a ray and detects what it hits.

1. Create a raycaster object using the `THREE.Raycaster()` constructor.

    <a href="../Code/raycasting">Raycasting</a>

2. Set the starting point of the raycaster to where the mouse click happened. You can get the mouse position using the `event.clientX` and `event.clientY` properties.

3. Set the direction of the raycaster. In three.js, you can use the **camera's position** and the **mouse position** to calculate the direction of the ray.

4. Use the `intersectObjects()` method on the raycaster to see what objects the ray has hit.

5. Finally, you can use the results of the intersection to do whatever you want in your game. For example, you might use the object's `userData` property to store information about what the object is and how to interact with it.

### Why is intersects.length always zero?

```js
intersects.length > 0; // never executes
```

<mark>**Because there needs to be an object there to intersect with. The End.**</mark>

If `intersects.length > 0` is not executing, it's likely because the raycasting is not working properly.

1. Make sure the objects in your scene have their `geometry` property set. The `intersectObjects` method uses the `geometry` property of objects to calculate intersections. If the objects don't have a `geometry`, the raycasting won't work.

2. Make sure the raycaster is set up correctly. The raycaster needs to be created with the correct parameters, including the **position** and **direction** of the **ray**.
    * In the example, the raycaster is set up to use the **normalized** device coordinates of the **mouse** position and the **camera's** position and direction.
    * If your setup is different, make sure you adjust the raycaster parameters accordingly.

3. Make sure the mouse coordinates are being **calculated** correctly.
    * In the example, the `mousemove` event listener *calculates* the normalized device coordinates of the mouse position.
    * Make sure your code is doing something similar.

Include some additional debugging information:

```js
// draw2.html
const intersects = raycaster.intersectObjects(scene.children, true);
console.log(intersects);

if (intersects.length > 0) {
    console.log('Intersected!');
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

It's possible that the `scene.children` array <mark>**doesn't contain the objects you're trying to raycast against**</mark>, which would result in an empty intersects array.

When calling `intersectObjects`, the first argument should be an array of objects that you want to test for intersection.

If you're not getting any intersections, it's possible that you're not passing the correct array of objects to the function.

### Here are a few things you can try:

1. Make sure that the objects you want to test for intersection are added to the scene using `scene.add(object)` **before** calling `intersectObjects`.

2. If your scene has nested objects, you can set the **second argument** of `intersectObjects` to `true` to test for intersection with **child objects** as well.

    ```js
    const intersects = 
      raycaster.intersectObjects(scene.children, true);
    ```

3. If you're still not getting any intersections, you can try **logging** the `scene.children` array to the console to make sure that it contains the objects you're expecting.

    ```js
    console.log("scene.children", scene.children);
    ```
    
    You can also **log** the `intersects` array to see if any intersections are being detected at all. This can help you narrow down the issue.
    
    ```js
    console.log("intersects", intersects);
    ```

<br>
