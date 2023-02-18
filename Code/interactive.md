## Interactive image annotation

<!--
Write a three.js program, in r1.4.3, that loads an image to a plane, allows the user to change the colors in the image, and allows the user to free-draw on the image, and allows the user to make annotations on the image.
-->

Here is an example Three.js program that:

* loads an image to a plane, 
* allows the user to change the colors in the image, 
* allows the user to free-draw on the image, and 
* allows the user to make annotations on the image.

[program.html](interactive-image-annotation.html)

The [draw](interactive-image-annotation.html#L108) function handles the actual drawing on the canvas, while [startDrawing](interactive-image-annotation.html#L102) and [stopDrawing](interactive-image-annotation.html#L102) set and unset a flag that indicates whether or not the user is currently drawing.

The [drawAnnotations](interactive-image-annotation.html#L125) function clears the canvas and redraws any annotations that have been added.

In this example, annotations are represented as red circles.

Note that the program includes the [OrbitControls](interactive-image-annotation.html#L45) library for easy camera movement.

The image is loaded using a [TextureLoader](interactive-image-annotation.html#L47), and a [CanvasTexture](interactive-image-annotation.html#L74) is used for the drawing and annotation canvas.

## Mesh undefined

The mesh that was created in loader.load is undefined outside the closure.  Can you rewrite the code so that mesh is not undefined when we get to "mesh.add(annotationMesh)"?

To make `mesh` defined outside the `loader.load` closure, we can declare it in the parent scope and assign its value inside the `onLoad` function. Here's an updated version of the code:

```js
// Code.
```

In this completed code, we added two new functions `addAnnotationMesh` and `addAnnotation`.

The `addAnnotationMesh` function creates a small red plane at the specified annotation position and adds it to the mesh object.

The `addAnnotation` function is called when the user clicks on the canvas. It calculates the intersection point of the click with the plane and adds an annotation to the `annotations` array. It also calls the `addAnnotationMesh` function to create a red plane at the annotation position.

Finally, we added an event listener for `mousedown` on the window, which calls the `addAnnotation` function. This allows the user to add annotations by clicking anywhere on the canvas.

## What do I do?

The program did not render anything to the screen, and there are no errors in the console.  What do I do?

If your program is not rendering anything to the screen, it could be due to a number of reasons. Here are a few things to check:

1. Make sure the canvas element is added to the DOM and has a valid width and height. If the canvas element has no width or height, the program will not be able to render anything.

2. Make sure that the `renderer.render` function is being called inside the `animate` function. The `requestAnimationFrame` function will keep calling the `animate` function, which in turn calls the `renderer.render` function to update the scene.

3. Check that the camera is positioned correctly and looking at the right direction. If the camera is positioned too far away from the scene or facing the wrong direction, the scene may not be visible.

4. Check that the light source is positioned correctly and is illuminating the scene. If the light is not positioned correctly, the scene may appear too dark or too bright.

5. Double-check that the image file is loaded correctly and the texture is applied to the plane mesh. You can check this by inspecting the `mesh` object in the console to see if it has a `material` with a valid `map` property.

If none of these steps solve the issue, try debugging the program by adding console logs and breakpoints to identify where the issue is occurring.
