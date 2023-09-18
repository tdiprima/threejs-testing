## Circle Radians vs. Circumference

The formula 2&pi;r and the fact that there are 2&pi; radians in a full circle are related but represent different concepts.

### 2&pi; Radians in a Circle
When you say there are 2&pi; radians in a full circle, you are talking about the measure of the angle that subtends the entire circle. One radian is defined as the angle subtended at the center of a circle by an arc whose length is equal to the radius of the circle. A full circle's angle subtends 2&pi; radians because it corresponds to an arc length that is 2&pi;r, or a full circle's worth of arc.

### 2&pi;r
The formula 2&pi;r represents the circumference of a circle. This formula tells you the distance around the circle if you were to travel along its edge. The "r" in 2&pi;r stands for the radius of the circle.

### Connection
So, while 2&pi;r calculates the length around the circle (i.e., its circumference), 2&pi; radians gives you the angular measure that corresponds to that same length when you're talking about the angle that subtends a full circle at its center.

In short, the 2&pi; part is common to both because it is a fundamental relationship in circles—whether you are considering it in the context of an angular measure (2&pi; radians for a full circle) or a length measure (2&pi;r for the circumference).

## Say what??

Imagine you have a circle. The distance all the way around that circle is what we call the "circumference." The formula 2&pi;r helps you find this distance. Here, *r* is the **radius**, which is the distance from the center of the circle to the edge.

Now, let's talk about angles. If you've learned about degrees, you probably know that a full circle is 360 degrees. But there's another way to measure angles called "radians." In **radians**, a full circle is 2&pi; instead of 360 degrees.

So, these two things—2&pi;r and 2&pi; radians—are kind of cousins. The first one (2&pi;r) tells you how long the edge of the circle is. The second one (2&pi; radians) tells you how "wide" the angle is if you go all the way around the circle.

They both have 2&pi; because circles have this special relationship with the number &pi;. It's like a secret code that helps us understand circles better!

## Vitruvian Man

The "Vitruvian Man" is a famous drawing by Leonardo da Vinci. This drawing shows a man in both a square and a circle. It's named after a Roman architect named Vitruvius, who had ideas about the proportions of the human body. Leonardo's drawing was meant to show how the human body fits into both a circle and a square, suggesting that the human form embodies perfect proportions.

The drawing has been used in discussions of both art and science because it's a great example of how geometry and the study of the human body can intersect. It's often cited as a representation of the blend of art and science during the Renaissance period, and it's one of Leonardo da Vinci's most recognized works.

## What makes Math.PI so important for rotations?

**[why?](https://scriptinghelpers.org/questions/16244/what-makes-mathpi-so-important-for-rotations-etc)**

Math (and consequently, computers) doesn't use degrees for measuring angle.

While degrees are relatively useful for humans to understand angle, they are inelegant mathematically.

Mathematics uses the unit of **radians** for the measurement of a circle.

There are:

Two pi radians in a full circle. 2&pi;r

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
