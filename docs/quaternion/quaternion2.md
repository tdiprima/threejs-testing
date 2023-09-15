## What are quaternions?

Alright, so imagine you're playing a video game where you can control a spaceship. You can make it go forward, backward, left, right, up, and down. But you can also rotate it &mdash; make it spin around like a top or do flips and rolls. Quaternions are a kind of math that helps make those rotations really smooth and accurate.

Coordinates, like "x, y, z" in 3D space, tell you where something is.

Quaternions are like super-coordinates. They use four numbers instead of three.

They help you describe not just *where* something is but also how it's turned or *rotated*.

Let's get a bit into why they're helpful. Imagine you have a spinning top. If you just use **regular angles** *(versus Euler angles)* to describe how it rotates, things can get weird or jumpy. This is known as "gimbal lock," and it's like trying to spin a top on a very slippery surface &mdash; it might wobble or fall over. Quaternions help you avoid that, making the rotation really smooth.

So, when game developers or people working with robots want to make sure that rotations look really smooth and natural, they often use quaternions. For controlling exactly how something spins around in 3D space.

## What's the 4th number?

In quaternions, the four numbers are usually written like this:

```c
a + bi + cj + dk
```

Here, *a*, *b*, *c*, and *d* are regular numbers, like 1, 2, or -0.5. The *i*, *j*, and *k* are special numbers that help us understand rotation. You can think of them as "extra dimensions" of sorts that help you keep track of how something spins.

- *a* is called the "real" part, and it's a bit like a "base" value. It helps define the quaternion but doesn't really represent rotation by itself.
  
- *bi*, *cj*, and *dk* are called the "imaginary" or "vector" parts. These three parts work together to tell you how much and in which direction the rotation happens.

Think of it like this: the *x*, *y*, and *z* parts (which correspond to *b*, *c*, and *d* in the quaternion) tell you the **"axis" around which something rotates.** Like, is it spinning around the up-and-down axis, the left-and-right axis, or some diagonal? And then the *a* part helps you figure out how the rotation blends with that axis to create a smooth spin.

In simpler terms, the 4th number *a* works with the other three numbers *b*, *c*, *d* to make sure you can spin and rotate things in 3D space in a really smooth and accurate way. So, in a quaternion, all four numbers team up to give you super-detailed control over rotations.

### Euler angles

[Roll, pitch and yaw.](what-is-a-quaternion.html)

<br>

## Transforming Between Coordinate Spaces

**[Local to World Transforms](https://aframe.io/docs/1.3.0/introduction/developing-with-threejs.html#local-to-world-transforms)**

Normally, we'd need to call `updateMatrixWorld()` on parent Object3Ds, but three.js defaults `Object3D.matrixAutoUpdate` to true.


To get the world *position* of an Object3D:

```js
let worldPosition = new THREE.Vector3();
entityEl.object3D.getWorldPosition(worldPosition);
```

To get the world *rotation* of an Object3D:

```js
let worldQuaternion = new THREE.Quaternion();
entityEl.object3D.getWorldQuaternion(worldQuaternion);
```

<br>
