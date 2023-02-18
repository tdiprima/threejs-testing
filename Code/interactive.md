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

<hr>

The mesh that was created in loader.load is undefined outside the closure.  Can you rewrite the code so that mesh is not undefined when we get to "mesh.add(annotationMesh)"?

To make `mesh` defined outside the `loader.load` closure, we can declare it in the parent scope and assign its value inside the `onLoad` function. Here's an updated version of the code:

```js
// Code.
```

In this completed code, we added two new functions `addAnnotationMesh` and `addAnnotation`.

The `addAnnotationMesh` function creates a small red plane at the specified annotation position and adds it to the mesh object.

The `addAnnotation` function is called when the user clicks on the canvas. It calculates the intersection point of the click with the plane and adds an annotation to the `annotations` array. It also calls the `addAnnotationMesh` function to create a red plane at the annotation position.

Finally, we added an event listener for `mousedown` on the window, which calls the `addAnnotation` function. This allows the user to add annotations by clicking anywhere on the canvas.
