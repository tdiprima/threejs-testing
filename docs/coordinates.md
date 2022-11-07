# I like these kinds of things explained visually.

In OpenGL we have 2D coordinates that go from -1 to +1 for both the X and Y axis.

![](img/coordinates.png)

Then this image needs to be mapped to window coordinates.

Continue [reading](https://gamedev.stackexchange.com/questions/40704/what-is-the-purpose-of-glscissor).

# From before...

![my img](img/mouse-coords.jpg)

<br>

### [Transformations &amp; Coordinate System](https://discoverthreejs.com/book/first-steps/transformations/)

![coordinate_system](https://discoverthreejs.com/images/first-steps/coordinate_system.svg)

<br>

### [Soledad Penadés object-picking](https://soledadpenades.com/articles/three-js-tutorials/object-picking/)
<br>

```js
let container = document.getElementById( "container" );
let containerWidth = container.clientWidth;
let containerHeight = container.clientHeight;

mouseVector.x = 2 * (e.clientX / containerWidth) - 1;
mouseVector.y = 1 - 2 * ( e.clientY / containerHeight );

// otherwise, it's window.innerWidth, window.innerHeight
```

<br>

They convert the mouse coordinates, which go from 0 to containerWidth, and from 0 to containerHeight, to (-1, 1) in both axes.

Did you notice that the calculations for the y coordinate are negated? That's because in the classic DOM coordinate system, the Y axis grows from top to bottom (i.e. top is 0), whereas in 3D it grows from bottom to top (i.e. **bottom is 0**).

<br>
