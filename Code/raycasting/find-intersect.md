## Highlighting Objects with Raycasting

This Three.js code is part of a script that implements object selection or highlighting in a 3D scene using raycasting. It assumes a 3D environment has been set up with a camera, scene, and pointer (likely a mouse or other input device position), as well as a global variable `INTERSECTED` and a `raycaster`. Below is a step-by-step explanation of the code:

1. **check(material) Function**:
   - If `material` has an `emissive` property, it sets the <span style="color:#4a00b4;">**emissive color**</span> of `material` to the hexadecimal color stored in `INTERSECTED.currentHex`.
   - If `material` does not have an `emissive` property, it sets the <span style="color:#4a00b4;">**color**</span> of `material` to the hexadecimal color stored in `INTERSECTED.currentHex`.

2. **check2(material) Function**:
   - If `material` has an `emissive` property, it stores the <span style="color:#4a00b4;">**current emissive color**</span> of `material` into `INTERSECTED.currentHex`, and then changes the `emissive` color to red (`0xff0000`).
   - If `material` does not have an `emissive` property, it stores the <span style="color:#4a00b4;">**current color**</span> of `material` into `INTERSECTED.currentHex`, and then changes the `color` to red (`0xff0000`).

3. **findIntersection() Function**:
   - It casts a ray from the camera through the pointer position into the scene using `raycaster.setFromCamera(pointer, camera)`.
   - It finds intersections between the ray and objects in the scene with `raycaster.intersectObjects(scene.children)`.
   - If there are intersections, and the first intersection is not the currently `INTERSECTED` object:
     - If there is an `INTERSECTED` object, it calls `check(INTERSECTED.material)`.
     - It updates `INTERSECTED` to be the first object in the intersections array.
     - It calls `check2(INTERSECTED.material)`.
   - If there are no intersections:
     - If there is an `INTERSECTED` object, it calls `check(INTERSECTED.material)`.
     - It sets `INTERSECTED` to `null`.

### Purpose of the Code:
- When an object is intersected by the ray (mouse pointer, for example), it changes the object's color or emissive color to red to highlight it (via `check2` function).
- When the object is no longer intersected, it reverts the object's color or emissive color back to its original value (via `check` function).

### Important Note:

Ensure that the `INTERSECTED` variable is properly initialized and that the materials of the objects in your scene have the appropriate properties (`color` or `emissive`), as the code is sensitive to these requirements.

The error message noted in the comments indicates that there is an attempt to access the `setHex` method on an undefined `emissive` property of a `MeshBasicMaterial`, which indeed does not have this property.

# Simplify

<span style="color:#0000dd;">It seems like check and check2 are sort of doing the same things.  And also in the findIntersection function.</span>

Certainly! You can simplify the code by consolidating the two `check` functions into one, since they perform similar operations. The consolidated function can take two arguments: the `material` and the `hex` color to be set. Here’s one way you could simplify the code:

```javascript
function setMaterialColor(material, hex) {
  if (material.emissive) {
    if (hex !== undefined) {
      material.emissive.setHex(hex);
    } else {
      INTERSECTED.currentHex = material.emissive.getHex();
      material.emissive.setHex(0xff0000); // set to red
    }
  } else {
    if (hex !== undefined) {
      material.color.setHex(hex);
    } else {
      INTERSECTED.currentHex = material.color.getHex();
      material.color.setHex(0xff0000); // set to red
    }
  }
}

function findIntersection() {
  raycaster.setFromCamera(pointer, camera);
  let intersects = raycaster.intersectObjects(scene.children);

  if (intersects.length > 0) {
    if (INTERSECTED !== intersects[0].object) {
      if (INTERSECTED) {
        setMaterialColor(INTERSECTED.material, INTERSECTED.currentHex);
      }
      INTERSECTED = intersects[0].object;
      setMaterialColor(INTERSECTED.material);
    }
  } else {
    if (INTERSECTED) {
      setMaterialColor(INTERSECTED.material, INTERSECTED.currentHex);
    }
    INTERSECTED = null;
  }
}
```

Explanation of the Simplified Code:

- The `setMaterialColor` function handles both the setting of the red highlight color and the resetting to the original color. If a `hex` value is provided, it sets the material color to that value. If no `hex` value is provided, it stores the current material color in `INTERSECTED.currentHex` and sets the material color to red.

- The `findIntersection` function remains largely the same but now calls `setMaterialColor` instead of `check` and `check2`, simplifying the flow and reducing redundancy in the code.

Ensure that you have initialized the necessary variables and objects (`INTERSECTED`, `raycaster`, `pointer`, `camera`, and `scene`), and that the objects in your scene have materials with the appropriate properties (`color` or `emissive`).

Also, adjust **error-handling** and **edge-case handling** as necessary for your specific use case.

<br>
