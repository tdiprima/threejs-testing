## Interactive image annotation
<!--
Write a three.js program, in r1.4.3, that loads an image to a plane, allows the user to change the colors in the image, and allows the user to free-draw on the image, and allows the user to make annotations on the image.
-->

### Here is an example Three.js program that:

* loads an image to a plane, 
* allows the user to change the colors in the image, 
* allows the user to free-draw on the image, and 
* allows the user to make annotations on the image.

[program.html](interactive-image-annotation.html) + `one.js`

The [draw](interactive-image-annotation.html#L108) function handles the actual drawing on the canvas, while [startDrawing](interactive-image-annotation.html#L102) and [stopDrawing](interactive-image-annotation.html#L102) set and unset a **flag** that indicates whether or not the user is currently **drawing**.

The [drawAnnotations](interactive-image-annotation.html#L125) function **clears the canvas** and **redraws** any annotations that have been added.

In this example, **annotations** are represented as <span style="color:red">red circles.</span>

Note that the program includes the [OrbitControls](interactive-image-annotation.html#L45) library for easy **camera movement**.

The **image is loaded** using a [TextureLoader](interactive-image-annotation.html#L47), and a [CanvasTexture](interactive-image-annotation.html#L74) is used for the **drawing and annotation** canvas.

## Mesh undefined

The mesh that was created in `loader.load` is undefined outside the **closure**.&nbsp;&nbsp; Can you rewrite the code so that mesh is not undefined when we get to `mesh.add(annotationMesh)`?

To make `mesh` defined outside the `loader.load` closure, we can **declare it in the parent scope** and assign its value inside the `onLoad` function.

### Here's an updated version of the code:

[two.js](two.js)

In this completed code, we added **two new functions** `addAnnotationMesh` and `addAnnotation`.

The `addAnnotationMesh` function **creates a small red plane** at the specified annotation position and adds it to the mesh object.

The `addAnnotation` function is called when the **user clicks on the canvas.**&nbsp;&nbsp;It calculates the **intersection point** of the click with the plane and adds an annotation to the `annotations` **array**.&nbsp;&nbsp;It also calls the `addAnnotationMesh` function to create a red plane at the annotation position.

Finally, we added an **event listener** for `mousedown` on the window, which calls the `addAnnotation` function.&nbsp;&nbsp;This allows the user to **add annotations by clicking** anywhere on the canvas.

## It doesn't work.&nbsp;&nbsp;Now what?

The program did not render anything to the screen, and there are no errors in the console.&nbsp;&nbsp; What do I do?

If your program is not rendering anything to the screen, it could be due to a number of reasons.

### Here are a few things to check:

1.&nbsp;&nbsp;Make sure the **`canvas`** element is added to the DOM and has a valid **width** and **height**.&nbsp;&nbsp;If the canvas element has no width or height, the program will not be able to render anything.

2.&nbsp;&nbsp;Make sure that the **`renderer.render`** function is being called inside the **`animate`** function.&nbsp;&nbsp;The `requestAnimationFrame` function will keep calling the `animate` function, which in turn calls the `renderer.render` function to update the scene.

3.&nbsp;&nbsp;Check that the **`camera`** is **positioned** correctly and looking at the right direction.&nbsp;&nbsp;If the camera is positioned too far away from the scene or facing the wrong direction, the scene may not be visible.

4.&nbsp;&nbsp;Check that the **`light`** source is positioned correctly and is illuminating the scene.&nbsp;&nbsp;If the light is not positioned correctly, the scene may appear too dark or too bright.

5.&nbsp;&nbsp;Double-check that the **image file** is loaded correctly and the **`texture`** is applied to the **plane mesh**.&nbsp;&nbsp;You can check this by inspecting the `mesh` object in the console to see if it has a `material` with a valid `map` property.

If none of these steps solve the issue, try debugging the program by adding **console logs** and **breakpoints** to identify where the issue is occurring.

## Light

To **create a light source** in Three.js, we can use one of the built-in light types.&nbsp;&nbsp;For this example, let's add a **point light** that will illuminate the scene from a single point in space.&nbsp;&nbsp;

### Here's how we can create and position the light source:

```js
// create a point light
const light = new THREE.PointLight(0xffffff, 1, 100);
light.position.set(0, 0, 10); // set the position of the light

// add the light to the scene
scene.add(light);
```

In this code, we create a new `PointLight` object with a white color and an intensity of `1`.&nbsp;&nbsp;We then set the position of the light to `(0, 0, 10)`, which means it will be positioned at the origin and 10 units along the positive z-axis.&nbsp;&nbsp;Finally, we add the light to the scene by calling the `scene.add` function...

### Wait a minute...

Create a three.js light source that is positioned correctly _for the scene we just created_.

Sure, here's an example of how to create a light source in Three.js and position it correctly **for the scene we just created**:

```js
// create a directional light
const light = new THREE.DirectionalLight(0xffffff, 1);

// position the light source
light.position.set(1, 1, 1);

// add the light to the scene
scene.add(light);
```

In this code, we created a new `DirectionalLight` object with a white color and an intensity of `1`.&nbsp;&nbsp;We then positioned the light source at `(1, 1, 1)` which means the light will be positioned at `(1, 1, 1)` in world space and shine towards the origin of the scene.&nbsp;&nbsp;Finally, we added the light to the scene by calling the scene.add function.

The `DirectionalLight` is a type of light that simulates the sun, so it has a direction associated with it.&nbsp;&nbsp;When the light shines on objects in the scene, it will illuminate them from a single direction, which can create interesting shadows and highlights.

### Can you test it?

<!--can you test our interactive image annotation code, and see what might be missing?-->

As an AI language model, I don't have the ability to test the code directly.&nbsp;&nbsp;However, here are a few things that could be causing issues with the interactive image annotation code:

1.&nbsp;&nbsp;Make sure that the `renderer` object is correctly initialized with the `canvas` element and the correct size.

2.&nbsp;&nbsp;Check that the `camera` object is positioned correctly and looking at the correct direction.

3.&nbsp;&nbsp;Verify that the image file is loaded correctly and the texture is applied to the `plane` mesh.

4.&nbsp;&nbsp;Double-check that the `controls` object is correctly set up and is receiving the correct input from the user.

5.&nbsp;&nbsp;Make sure that the `raycaster` object is correctly set up and is returning the correct intersection point.

6.&nbsp;&nbsp;Verify that the `annotationGeometry` and `annotationMaterial` are correctly defined and used to create the `annotationMesh` object.

7.&nbsp;&nbsp;Check that the `annotationMesh` object is correctly added to the scene and that its position and rotation are correctly set based on the user's input.

By testing and debugging each of these parts of the code, you should be able to identify any issues and make any necessary changes to get the interactive image annotation code working correctly.

## Text annotations

### Can you rewrite the code so that the user can add text annotations, rather than red dot annotations?

Sure! Here's a modified version of the code that allows the user to add text annotations to the image:

[three.js](three.js)

In this modified code, we added the `textGeometry`, `textMaterial`, and `textMesh` objects to handle the text annotations. We also added the `startAddingText`, `updateTextAnnotation`, and `endAddingText` functions to handle adding and updating the text annotations.

The `startAddingText` function sets the `textMesh` position and rotation to the intersection point and the camera rotation, respectively, and shows the `textMesh`. The `updateTextAnnotation` function updates the `textMesh` geometry based on the user input. The `endAddingText` function adds the text annotation to the `annotations` array and removes the `textMesh` from the scene.

To make this work, you'll also need to add an HTML input field for the user to enter the text. Here's an example of how you could add an input field to the HTML:

```html
<input type="text" id="text-input" placeholder="Type your text here">
```

With these changes, the user can now add text annotations to the image by clicking on the plane and entering text in the input field.

## Multiple annotations

### What if you wanted the user to be able to write more than one text annotation?  can we do it dynamically?

Yes, it's definitely possible to allow the user to add multiple text annotations dynamically. Here's a modified version of the code that allows the user to add multiple text annotations:

[four.js](four.js)

In this modified code, we added an array `textMeshes` to hold the text meshes for each text annotation. When the user starts adding a new text annotation, we create a new text mesh, set its position and rotation, add it to the scene and to the `textMeshes` array.

When the user updates the text, we update the most recently added text mesh with the new text.

When the user ends adding the text, we add the text annotation to the `annotations` array and clear the text input field. We also set the `addingText` flag to `false`.

Finally, we added a new function `removeLastTextAnnotation` to remove the most recently added text annotation. This function removes the last text mesh from the `textMeshes` array, removes it from the scene, and removes the last annotation from the `annotations` array.

With these changes, the user can add multiple text annotations to the image and remove them dynamically by calling the `removeLastTextAnnotation` function.
