// the "camera" that determines the frustum
let cameraParams = {
  near: 10,
  far: 30,
  fov: 30, // degrees!!
  aspectRatio: 400 / 300, // usually from the dimensions of the canvas
  atX: 0,
  atY: 0,
  atZ: -20,
  eyeX: 0,
  eyeY: 0,
  eyeZ: 1,
  upX: 0,
  upY: 1,
  upZ: 0
};

// globals, modified from the above
let at = new THREE.Vector3();
let eye = new THREE.Vector3();
let up = new THREE.Vector3();

/**
 * setCameraView
 */
function setCameraView() {
  at.set(cameraParams.atX, cameraParams.atY, cameraParams.atZ);
  eye.set(cameraParams.eyeX, cameraParams.eyeY, cameraParams.eyeZ);
  up.set(cameraParams.upX, cameraParams.upY, cameraParams.upZ);
}

setCameraView();

/**
 * createFrustumFOV
 * @param {number} fov - field of view
 * @param {number} aspectRatio
 * @param {number} near
 * @param {number} far
 */
TW.createFrustumFOV = function (fov, aspectRatio, near, far) {
  let top = near * Math.tan(TW.degrees2radians(fov) / 2);
  let bottom = -top;
  let right = aspectRatio * top;
  let left = -right;

  if (TW.debug) {
    console.log("camera:", fov, aspectRatio, near, far);
    console.log("frustum:", right, left, top, bottom, near, far);
  }

  return TW.createFrustum(right, left, top, bottom, near, far);
};

/**
 * createFrustumParams
 */
function createFrustumParams() {
  let f = TW.createFrustumFOV(cameraParams.fov,
    cameraParams.aspectRatio,
    cameraParams.near,
    cameraParams.far);
  setCameraView();
  f.position.copy(eye);
  f.up.copy(up);
  f.lookAt(at);
  f.name = "frustum";
  return f;
}

// Canvas, showing frustum
let renderer2 = new THREE.WebGLRenderer();
let scene2 = new THREE.Scene();
TW.mainInit(renderer2, scene2);

let frustum = null;

/**
 * recreateFrustum
 */
function recreateFrustum() {
  if (frustum != null) {
    scene2.remove(frustum);
  }
  frustum = createFrustumParams();
  scene2.add(frustum);
}

recreateFrustum();

/**
 * makeMarker
 * @param point
 * @param color
 * @return {*}
 */
function makeMarker(point, color) {
  let geom = new THREE.SphereGeometry(1, 5, 5);
  let mat = new THREE.MeshBasicMaterial({color: color});
  let mesh = new THREE.Mesh(geom, mat);
  mesh.position.copy(point);
  return mesh;
}

let atMarker = makeMarker(at, TW.CYAN);
scene2.add(atMarker);
let eyeMarker = makeMarker(eye, TW.MAGENTA);
scene2.add(eyeMarker);

let upArrow = new THREE.ArrowHelper(up, eye, 5, TW.YELLOW);
upArrow.line.material.linewidth = 3;
scene2.add(upArrow);

let size = 20;
TW.cameraSetup(renderer2, scene2, {minx: -size, maxx: size, miny: -size, maxy: size, minz: -size, maxz: size});
TW.toggleAxes("show");
TW.viewFromAboveFrontSide();

/**
 * redo
 */
function redo() {
  recreateFrustum();
  atMarker.position.copy(at);
  eyeMarker.position.copy(eye);
  upArrow.position.copy(eye);
  up.normalize();
  upArrow.setDirection(up);
  TW.render();
}

let gui = new dat.GUI();
gui.add(cameraParams, 'fov', 1, 179).onChange(redo);
gui.add(cameraParams, 'aspectRatio', 0.1, 10).onChange(redo);
gui.add(cameraParams, 'near', 1, 50).onChange(redo);
gui.add(cameraParams, 'far', 1, 50).onChange(redo);
gui.add(cameraParams, 'atX', -10, 10).onChange(redo);
gui.add(cameraParams, 'atY', -10, 10).onChange(redo);
gui.add(cameraParams, 'atZ', -30, 10).onChange(redo);
gui.add(cameraParams, 'eyeX', -10, 10).onChange(redo);
gui.add(cameraParams, 'eyeY', -10, 10).onChange(redo);
gui.add(cameraParams, 'eyeZ', -30, 30).onChange(redo);
gui.add(cameraParams, 'upX', -10, 10).onChange(redo);
gui.add(cameraParams, 'upY', -10, 10).onChange(redo);
gui.add(cameraParams, 'upZ', -10, 10).onChange(redo);
