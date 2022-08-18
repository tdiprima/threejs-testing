/**
 * http://soledadpenades.com/articles/three-js-tutorials/drawing-the-coordinate-axes/
 * @return {THREE.Object3D} - axes
 */
function buildAxes() {
  let axes = new THREE.Object3D();

  axes.add(buildAxis(new THREE.Vector3(0, 0, 0), new THREE.Vector3(100, 0, 0), 0xff0000, false)); // +X
  axes.add(buildAxis(new THREE.Vector3(0, 0, 0), new THREE.Vector3(-100, 0, 0), 0x800000, true)); // -X
  axes.add(buildAxis(new THREE.Vector3(0, 0, 0), new THREE.Vector3(0, 100, 0), 0x00ff00, false)); // +Y
  axes.add(buildAxis(new THREE.Vector3(0, 0, 0), new THREE.Vector3(0, -100, 0), 0x008000, true)); // -Y
  axes.add(buildAxis(new THREE.Vector3(0, 0, 0), new THREE.Vector3(0, 0, 100), 0x0000ff, false)); // +Z
  axes.add(buildAxis(new THREE.Vector3(0, 0, 0), new THREE.Vector3(0, 0, -100), 0x000080, true)); // -Z

  return axes;
}

/**
 * Build Axis
 *
 * @param {object} src - x, y, z coordinates
 * @param {object} dst - x, y, z coordinates
 * @param {number} colorHex
 * @param {boolean} dashed
 * @return {THREE.Line} - axis
 */
function buildAxis(src, dst, colorHex, dashed) {
  let geom = new THREE.Geometry();
  let mat;

  if (dashed) {
    mat = new THREE.LineDashedMaterial({ linewidth: 1, color: colorHex, dashSize: 5, gapSize: 5 });
  } else {
    mat = new THREE.LineBasicMaterial({ linewidth: 1, color: colorHex });
  }

  geom.vertices.push(src.clone());
  geom.vertices.push(dst.clone());

  return new THREE.Line(geom, mat); // AXIS
}

