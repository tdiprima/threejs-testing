# What makes Math.PI so important for rotations?

**[why?](https://scriptinghelpers.org/questions/16244/what-makes-mathpi-so-important-for-rotations-etc)**

Math (and consequently, computers) doesn't use degrees for measuring angle.

While degrees are relatively useful for humans to understand angle, they are inelegant mathematically.

Mathematics uses the unit of radians for the measurement of a circle.

There are:

two pi radians in a full circle.

In other words:

360 degrees is 2pi radians

180 degrees is pi radians

etc.

**Imagine the unit circle, radius 1.**

In radians, the length of the arc moving around the circle is the same as the angle:

```math
C = pi * D = pi * 2r
```

Radians make `cos` and `sin` nicer to work with (mathematically), especially in calculus.

In JavaScript, `Math.cos()`, `Math.sin()`, `Math.tan()`, `Math.asin()`, etc, all use radians instead of degrees.

# Math is Fun

[Full Rotation](https://www.mathsisfun.com/geometry/full-rotation.html)

This image of a protractor shows that a **full rotation is 360°**.

And **Half a rotation is 180°**, called a Straight Angle.

And **Quarter of a rotation is 90°**, called a Right Angle.

A full rotation is also equal to **2π Radians**, so here are some equivalent values:

<table style="border: 0; margin:auto;">
          <tbody>
<tr style="text-align:center;">
            <td style="width:80px;">Rotations</td>
            <td style="width:80px;"><a href="radians.html">Radians</a></td>
            <td style="width:80px;"><a href="degrees.html">Degrees</a></td>
          </tr>
          <tr style="text-align:center;">
            <td>¼</td>
            <td><span class="times">π</span>/2</td>
            <td>90°</td>
          </tr>
          <tr style="text-align:center;">
            <td>½</td>
            <td><span class="times">π</span></td>
            <td>180°</td>
          </tr>
          <tr style="text-align:center;">
            <td>1</td>
            <td>2<span class="times">π</span></td>
            <td>360°</td>
          </tr>
          <tr style="text-align:center;">
            <td>1½</td>
            <td>3<span class="times">π</span></td>
            <td>540°</td>
          </tr>
          <tr style="text-align:center;">
            <td>2</td>
            <td>4<span class="times">π</span></td>
            <td>720°</td>
          </tr>
        </tbody></table>

<br>

![](https://www.mathsisfun.com/geometry/images/radian-circle.svg)


# tau

[GRCC Mathematics: The Number Tau](https://youtu.be/8hqLV9Qao6Y)

```text
C = 2 π r
Tau = 2 π
So...
C = 𝛕r
circumference = tau * r
```

```js
// The number π is a mathematical constant that is the ratio of a circle's circumference to its diameter.
const pi = Math.PI;

// 2pi is the ratio of a circle's circumference to its radius.
// the circle constant to represent a full rotation around a circle in radians
// The value of τ is approximately 6.283 and can be calculated by dividing any circle's circumference by its radius.
const tau = pi * 2;
```

[Mathematicians Want to Say Goodbye to Pi](https://www.livescience.com/14836-pi-wrong-tau.html)

# Pi

![Grand Rapids Community College](img/GRCCtv.jpg)

[Math Antics - Circles, What Is PI?](https://youtu.be/cC0fZ_lkFpQ)

![mathemaniacs](img/mathantics.jpg)

```js
// The number π is a mathematical constant 
// that is the ratio of a circle's 
// circumference to its diameter.
const pi = Math.PI;
```

# 🧐

[https://www.livescience.com/14836-pi-wrong-tau.html](https://www.livescience.com/14836-pi-wrong-tau.html)

*As it turns out, they're saying that pi is "wrong", and so is tau.*
