# Camera 🎥

# Position

```js
camera.position.x = 1; // horizontal movement
camera.position.y = 1; // up and down
camera.position.z = 5; // zoom in or out
```

### X

* Negative = left
* Positive = right

**NOTE!** The *object* moves in the opposite direction.

### Y

* Negative = down
* Positive = up

### Z = low and high value

* The lower the number, the closer it is.
* The higher, the further away.
* If it's negative, it's behind the object

<br>

# Perspective Camera

**[Udacity - Perspective Camera](https://youtu.be/KyTaxN2XUyQ)**

**Field of view:** the angle between the top and bottom planes of the view pyramid.

Specified in **degrees**!  Other angles use **radians** (hence the conversions, such as):

```js
function degreesToRadians(degrees) {
  return degrees * (Math.PI / 180);
}
```

Call **update()**: if you change fov, near, or far, you need to call **`camera.updateProjectionMatrix()`** in order to have these changes take effect.

![Perspective Camera](img/perspective.jpg)
