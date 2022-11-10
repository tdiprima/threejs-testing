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

### Y

* Negative = down
* Positive = up

### Z = low and high value

* The lower the number, the closer it is.
* The higher, the further away.
* If it's negative, it's behind the object

<mark>**NOTE!** The *object* moves in the opposite direction.</mark>

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

![Perspective Camera](../img/perspective.jpg)

<br>

# [How to control camera.position.x from dat.GUI](https://discourse.threejs.org/t/how-to-control-camera-position-x-from-dat-gui/27467)

It was stupidly complicated, but I learned something.

```js
camera.updateMatrixWorld();
```

Also, they rolled their own [axis helper](https://jsfiddle.net/fiddleuser01/rezcpgh4/7/).

<br>

# Camera Helper

[CameraHelper not linked?](https://discourse.threejs.org/t/camerahelper-not-linked/2319/2)
  
Solution: `helper.update();`

A CameraHelper draws the frustum for a Camera.

<br>

# Cameras 🎥 🎥

Plural.