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
