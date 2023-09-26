## Transformations & Coordinate System

[transformations](https://discoverthreejs.com/book/first-steps/transformations/)

<img src="https://discoverthreejs.com/images/first-steps/coordinate_system.svg" width="600" alt="coordinate_system">

In OpenGL we have 2D coordinates that go from -1 to +1 for both the X and Y axis.

![](img/coordinates.png)

## What is the purpose of glScissor?

[Picture it.](https://gamedev.stackexchange.com/questions/40704/what-is-the-purpose-of-glscissor#167051)

The Scissor Test discards Fragments that fall outside of a certain rectangular portion of the screen.

`glScissor()` defines a screen space rectangle beyond which nothing is drawn (if the scissor test is enabled).

You almost always want to set the **scissor rectangle** to the same values as the **viewport**.

You use `glViewport()` to determine the **location** and **size** of the screen space **viewport** region.

> **screenspace** = The space available on a screen display.
> **`glViewport`** maps the projection coordinates to device coordinates, but does not clip.

That's where **scissor** in comes in. `glScissor()` defines a screen space rectangle **beyond which nothing is drawn**. Scissor test enabled.

The scissor rectangle can be used to **temporarily restrict drawing to a sub-rectangle** of the viewport, for special effects, UI elements, etc.

## Mouse coords

![my img](img/mouse-coords.jpg)

<br>
