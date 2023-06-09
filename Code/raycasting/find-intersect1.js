// https://stackoverflow.com/questions/28435308/three-js-my-program-dies-when-i-place-the-pointer-over-the-three-line#28437350
function findIntersection() {
  raycaster.setFromCamera(mouse, camera); // "mouse", AKA "pointer"

  let intersects = raycaster.intersectObjects(scene.children);
  let material;

  if (intersects.length > 0) {
    if (INTERSECTED !== intersects[0].object) {
      if (INTERSECTED) {
        material = INTERSECTED.material;
        if (material.emissive) {
          material.emissive.setHex(INTERSECTED.currentHex);
        } else {
          material.color.setHex(INTERSECTED.currentHex);
        }
      }
      INTERSECTED = intersects[0].object;
      material = INTERSECTED.material;
      if (material.emissive) {
        INTERSECTED.currentHex = INTERSECTED.material.emissive.getHex();
        material.emissive.setHex(0xff0000);
      } else {
        INTERSECTED.currentHex = material.color.getHex();
        material.color.setHex(0xff0000);
      }

      console.log(INTERSECTED.position);
    }
  } else {
    if (INTERSECTED) {
      material = INTERSECTED.material;

      if (material.emissive) {
        material.emissive.setHex(INTERSECTED.currentHex);
      } else {
        material.color.setHex(INTERSECTED.currentHex);
      }
    }

    INTERSECTED = null;
  }
}
