## Draw a Million Spheres

### [How to draw more than one million spheres?](https://discourse.threejs.org/t/how-to-draw-spheres-more-than-1000000/19731)

⚠️ **<mark>Drawing a million spheres may still be demanding on some hardware.  Including a souped-up MacBook Pro! (Don't do it. LOL.)</mark>** 💻 

<span style="color:#0000dd;">They're saying that in order to draw a million spheres, you would have to use either an InstancedMesh or an InstancedBufferGeometry.</span>

In the realm of 3D graphics and particularly with libraries like three.js, performance is key when rendering a large number of similar objects. An `InstancedMesh` or `InstancedBufferGeometry` is generally used to achieve this.

As of September 2021, using `InstancedMesh` is considered one of the most straightforward ways to render a large number of similar objects efficiently. It uses GPU instancing to draw multiple instances of a mesh in a single draw call. This greatly improves performance and reduces the overhead on the CPU.

Here's an example that shows how to draw a million spheres using `InstancedMesh`:

First, include the three.js library. You can download it from [three.js official website](https://threejs.org/) or include it via CDN:

```html
<script src="https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js"></script>
```

Then, you can use the following JavaScript code:

<a href="Draw_a_Million_Spheres.html">Draw_a_Million_Spheres.html</a>

This code sets up a basic three.js scene and uses `InstancedMesh` to create 1,000,000 instances of a basic sphere geometry. Each instance is then randomly positioned within a bounding box.

Please note that drawing a million spheres may still be demanding on some hardware. Always test performance thoroughly.

Keep in mind that three.js is an evolving library, and the information may become outdated. Check the official three.js documentation or community resources for the most current information.

## Update Matrix for InstancedMesh

<span style="color:#0000dd;">For each sphere, every time we set the position, we have to call updateMatrix on it? Pourquoi?</span>

In three.js, when you're working with `InstancedMesh`, you indeed need to call `updateMatrix()` on a dummy object after setting its position (or rotation, scale, etc.) and then set this updated matrix to the `InstancedMesh` using `setMatrixAt(index, matrix)`.

Here's a breakdown of why:

1. **Transformation Matrix**: In three-dimensional graphics, object transformations like translation (position), rotation, and scaling are often combined into a single 4x4 matrix, known as the transformation matrix.

2. **Efficiency**: Instanced rendering is optimized for performance. Instead of sending each instance's position, rotation, and scale as separate attributes to the GPU, these values are combined into a transformation matrix. This reduces the amount of data that has to be sent and processed, thus speeding up the rendering.

3. **Manual Update Required**: Three.js doesn't automatically update the matrix when you change the position, rotation, or scale of an object. If you're directly manipulating these properties, you need to explicitly inform three.js to recalculate the transformation matrix. This is what `updateMatrix()` does.

4. **Dummy Object**: The `dummy` object serves as a temporary placeholder where you can set the transformations. When you call `dummy.updateMatrix()`, it calculates the transformation matrix based on the dummy object's current position, rotation, and scale. You then copy this matrix to the `InstancedMesh` instance using `setMatrixAt`.

5. **Batch Update**: By manually managing these matrices, three.js allows you to batch-update them in a loop, as you're doing in your code snippet. This is particularly efficient when you're working with a large number of instances, as in your example.

So, to sum it up: calling `updateMatrix()` is necessary to ensure that the transformation matrix of each instance gets updated correctly based on its individual position, rotation, and scale. This is crucial for the performance optimizations that `InstancedMesh` provides.

## Transformation Matrix

Absolutely! Imagine you're playing a video game, and you have a character on the screen. You can make your character do several things: move around (translate), turn or spin (rotate), or even grow and shrink (scale).

Now, let's say you're the game developer, and you want to tell the computer how to display this character after they've moved, spun, or changed size. You could do it with a bunch of numbers for each thing: one set for where the character is, another for how it's turned, and yet another for how big or small it is. But that's a lot of numbers to keep track of!

Here's where a "transformation matrix" comes in handy. A transformation matrix is like a magic box that combines all these movements, spins, and size changes into a single package. Instead of using many numbers, you use this box to say, "Hey, computer, this is how my character should look now."

In the matrix, which is like a grid of numbers, each number has a special role in making the character move, spin, or change size. By changing the numbers in this grid just right, you can tell the computer exactly how your character should be displayed on the screen.

In simple terms, a transformation matrix is a super-efficient way to keep track of an object's position, rotation, and size all in one go. And because it's so compact and easy for computers to work with, your games run smoother and faster!

### OK, so it's a matrix variable; not something on the rendered screen.

## fabric.js

fabric.js does [matrix transformation](http://fabricjs.com/matrix-transformation).

```js
transformMatrix == [ 1, 0, 0, 1, 0, 0 ];
// Etc.
```

[Moving from one space to another](http://fabricjs.com/using-transformations)

```js
newP = fabric.util.transformPoint(P, canvas.viewportTransform);
newP = fabric.util.transformPoint(P, object.calcTransformMatrix());
// Fabric applies transformations in this order:
zoom and pan => object transformation => nested object ( group ) => additionally nested objects ( nested groups )
```

[Understanding the Transformation Matrix in Flash 8](https://www.senocular.com/flash/tutorials/transformmatrix/)

[Class: Object &mdash; transformMatrix](http://fabricjs.com/docs/fabric.Object.html#calcTransformMatrix)

<br>
