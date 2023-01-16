const baseUrl = "http://localhost:8888/iiif/?iiif=http://localhost:8888/HalcyonStorage/tcga/coad/TCGA-CM-5348-01Z-00-DX1.2ad0b8f6-684a-41a7-b568-26e97675cce9.svs";
const segmentation = "http://localhost:8888/halcyon/?iiif=file:///D:/HalcyonStorage/nuclearsegmentation2019/TCGA-CM-5348-01Z-00-DX1.2ad0b8f6-684a-41a7-b568-26e97675cce9.zip";
const feature = "http://localhost:8888/halcyon/?iiif=file:///D:/HalcyonStorage/features/raj/Ptumor_heatmap_TCGA-CM-5348-01Z-00-DX1.2ad0b8f6-684a-41a7-b568-26e97675cce9.zip";

const magicNumber = 82984;

/**
 * WINDOW RESIZE HANDLER
 */
function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  renderer.setSize(window.innerWidth, window.innerHeight);
  camera.updateProjectionMatrix();
}

/**
 * Return default.jpg from base
 */
function srcUrl(x, y, w, h) {
  return new THREE.TextureLoader().load(
    `${baseUrl}/${x},${y},${w},${h}/512,/0/default.jpg`
  );
}

/**
 * Return default.png (transparent) from segmentation
 */
function srcSegUrl(x, y, w, h) {
  return new THREE.TextureLoader().load(
    `${segmentation}/${x},${y},${w},${h}/512,/0/default.png`
  );
}

/**
 * WHY?
 */
function square(x, y, w, h, src, offset) {
  const texture = src;

  const square = new THREE.Shape();
  square.moveTo(0, 0);
  square.lineTo(0, 1);
  square.lineTo(1, 1);
  square.lineTo(1, 0);
  // unfinished?
  // and btw, we went backwards.

  const geometry = new THREE.ShapeGeometry(square);
  geometry.center();

  const material = new THREE.MeshBasicMaterial({ map: texture, depthWrite: false, side: THREE.DoubleSide });

  const X = new THREE.Mesh(geometry, material);
  X.scale.x = w;
  X.scale.y = h;
  X.frustumCulled = false;
  X.position.set(0, 0, offset);

  return X;
}

/**
 * SEGMENTATION SQUARE
 */
function segmentationSquare(x, y, w, h, src, offset) {
  const texture = src;

  const square = new THREE.Shape();
  square.moveTo(0, 0);
  square.lineTo(0, 1);
  square.lineTo(1, 1);
  square.lineTo(1, 0);

  const geometry = new THREE.ShapeGeometry(square);
  geometry.center();

  // Added: transparent: true, opacity: 0.5
  const material = new THREE.MeshBasicMaterial({
    map: texture,
    depthWrite: false,
    side: THREE.DoubleSide,
    transparent: true,
    opacity: 0.5
  });

  const X = new THREE.Mesh(geometry, material);
  X.scale.x = w;
  X.scale.y = h;
  X.frustumCulled = false;
  X.position.set(0, 0, offset);

  return X;
}

/**
 * BASIC POLYGON
 */
function basicPolygon(tile) {
  // console.log(tile);
  const coords = tile.coordinates;
  const value = tile.hasValue; // not a boolean

  const poly = new THREE.Shape();
  poly.moveTo(0, 0);
  poly.lineTo(0, 1);
  poly.lineTo(1, 1);
  poly.lineTo(1, 0);

  // for (let i = 1; i < coords.length; i++) {
  //  poly.moveTo(coords[i].x / 248, coords[i].y / 248);
  // }

  const geometry = new THREE.ShapeGeometry(poly);
  geometry.center();

  const green = 255 * (1 - value);
  const red = 255 * value;

  const material = new THREE.MeshBasicMaterial({
    color: new THREE.Color(red, green, 0).getHex(),
    transparent: true,
    opacity: 0.5
  });

  const X = new THREE.Mesh(geometry, material);
  X.scale.x = 347;
  X.scale.y = 347;
  X.frustumCulled = true;

  const d = 347 * 239;
  X.position.set(
    347 * coords[0][0] - magicNumber / 2,
    d - 347 * coords[0][1] - magicNumber / 2,
    1
  );

  return X;
}

/**
 * @class Rapture
 */
class Rapture extends THREE.Object3D {
  constructor(x, y, w, h, offset) {
    super();

    this.isRapture = true;
    this.type = 'Rapture';
    this.booted = false;

    const lod = new THREE.LOD();

    // FROM THE BASE URL
    const low = square(x, y, w, h, srcUrl(x, y, w, h), offset);
    lod.addLevel(low, w);

    low.onBeforeRender = function() {
      if (w > 1024) {
        if (!this.booted) {
          this.booted = true;

          const offx = Math.trunc(w / 2);
          const offy = Math.trunc(h / 2);

          const nw = new Rapture(x, y, offx, offy);
          const ne = new Rapture(x + offx, y, offx, offy);

          const sw = new Rapture(x, y + offy, offx, offy);
          const se = new Rapture(x + offx, y + offy, offx, offy);

          sw.position.set(-offx / 2, -offy / 2, 0);
          nw.position.set(-offx / 2, offy / 2, 0);
          se.position.set(offx / 2, -offy / 2, 0);
          ne.position.set(offx / 2, offy / 2, 0);

          const high = new THREE.Group();
          high.add(nw);
          high.add(ne);
          high.add(sw);
          high.add(se);

          lod.addLevel(high, w / 2);
        }
      }
    };

    return lod;

  }
}

/**
 * @class FeatureLayer2
 */
class FeatureLayer2 extends THREE.Object3D {
  constructor(x, y, w, h, offset) {
    super();

    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;

    this.isFeatureLayer2 = true;
    this.type = 'FeatureLayer2';
    this.booted = false;

    const lod = new THREE.LOD();

    // FROM THE SEGMENTATION URL
    const low = segmentationSquare(x, y, w, h, srcSegUrl(x, y, w, h), offset);
    lod.addLevel(low, w);
    low.onBeforeRender = function() {
      if (w > 512) {
        if (!this.booted) {
          this.booted = true;
          if (w > 1024) {
            const offx = Math.trunc(w / 2);
            const offy = Math.trunc(h / 2);

            const nw = new FeatureLayer2(x, y, offx, offy);
            const ne = new FeatureLayer2(x + offx, y, offx, offy);
            const sw = new FeatureLayer2(x, y + offy, offx, offy);
            const se = new FeatureLayer2(x + offx, y + offy, offx, offy);

            sw.position.set(-offx / 2, -offy / 2, offset);
            nw.position.set(-offx / 2, offy / 2, offset);
            se.position.set(offx / 2, -offy / 2, offset);
            ne.position.set(offx / 2, offy / 2, offset);

            const high = new THREE.Group();
            high.add(nw);
            high.add(ne);
            high.add(sw);
            high.add(se);

            lod.addLevel(high, w / 2);
          } else {
            // console.log(`Render ---> ${x},${y},${w},${h}`);
            const offx = Math.trunc(w / 2);
            const offy = Math.trunc(h / 2);
            const pg = new THREE.Group();
            const loader = new THREE.FileLoader();
            loader.load(
              `${segmentation}/${x},${y},${w},${h}/512,/0/default.json`,

              data => {
                const obj = JSON.parse(data);

                // Iterate objects
                for (let i = 0; i < obj.length; i++) {
                  const coord = obj[i].coordinates;
                  const square = new THREE.Shape();
                  const x0 = coord[0][0] - x - offx;
                  const y0 = h - (coord[0][1] - y) - offy;
                  square.moveTo(x0, y0);

                  // Iterate coordinates
                  for (let j = 1; j < coord.length; j++) {
                    const xn = coord[j][0] - x - offx;
                    const yn = h - (coord[j][1] - y) - offy;
                    square.lineTo(xn, yn);
                  }
                  const geometry = new THREE.ShapeGeometry(square);
                  // YELLOW:
                  const material = new THREE.MeshBasicMaterial({ color: 0xffff00, transparent: true, opacity: 0.5 });
                  const X = new THREE.Mesh(geometry, material);
                  X.scale.x = 1;
                  X.scale.y = 1;
                  X.frustumCulled = false;
                  pg.add(X);
                  // console.log("added polygon to group");
                }
                // pg.position.set(x, y, offset + 1);
                lod.addLevel(pg, w / 2);
                // console.log("added polygon to LOD");
                // var yes = pg.clone();
                // yes.position.set(0, 0, offset + 5);
                // console.log("added clone polygon to Scene");
              },

              // onProgress callback
              xhr => {
                // console.log(`${(xhr.loaded / xhr.total) * 100}% loaded`);
              },

              // onError callback
              err => {
                console.error(`An error happened${err}`);
              }
            );
          }
        }
      }
    };
    return lod;
  }
}

// SET UP THREE.JS
THREE.Cache.enabled = true;
const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(90, window.innerWidth / window.innerHeight, -10, 100);
camera.position.set(0, 0, 150000);
// camera.position.set(0, 0, 1250);

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

window.addEventListener('resize', onWindowResize);

const controls = new THREE.TrackballControls(camera, renderer.domElement);

// NEW RAPTURE
const image = new Rapture(0, 0, magicNumber, magicNumber, 0);
scene.add(image);

// NEW FEATURE LAYER
const feature2 = new FeatureLayer2(0, 0, magicNumber, magicNumber, 1);
scene.add(feature2);

console.log("Segmentation Layer Added");

// addLayer(0, 0, magicNumber, magicNumber);

/**
 * ANIMATE
 */
function animate() {
  // <sarcasm>Yeah, this is a good idea. This ordering.</sarcasm>
  controls.update();
  renderer.render(scene, camera);
  requestAnimationFrame(animate);
  // console.log(camera.position.z);
}

animate();

//**************** UNUSED SH1T ****************//
/**
 * GET FEATURES
 * Note! We were doing load() before; now we're doing fetch().
 */
async function featureSrcUrl(x, y, w, h) {
  const response = await fetch(
    `${feature}/full/323,/0/default.json`
  );
  return await response.json();
}

/**
 * GET SEGMENTATION DATA
 * UNUSED FUNCTION
 */
function getJSON(x, y, w, h) {
  const loader = new THREE.FileLoader();
  const json = loader.load(
    // resource URL
    `${segmentation}/${x},${y},${w},${h}/512,/0/default.json`,

    // onLoad callback
    data => {
      // console.log(data);
      const wow = JSON.parse(data);
      console.log(wow);
      return wow;
    },

    // onProgress callback
    xhr => {
      console.log(`${(xhr.loaded / xhr.total) * 100}% loaded`);
    },

    // onError callback
    err => {
      console.error('An error happened');
    }
  );
  console.log("OUT!");

  return json;
}

/**
 * @class FeatureLayer
 * UNUSED CLASS
 */
class FeatureLayer extends THREE.Object3D {
  constructor(datum) {
    super();
    this.isFeatureLayer = true;
    this.type = 'FeatureLayer';
    const matrix = new THREE.Group();
    console.log(`# of tiles = ${datum.length}`);
    for (let i = 0; i < datum.length; i++) {
      // if (datum[i].hasValue > 0.50) {
      const tile = basicPolygon(datum[i]);
      matrix.add(tile);
      // }
    }
    return matrix;
  }
}

/**
 * @function addLayer
 * UNUSED FUNCTION
 */
async function addLayer(x, y, w, h) {
  // console.log("Getting Feature Data");
  const datum = {};
  // const datum = await featureSrcUrl(x, y, w, h);

  console.log("Creating Feature Layer");
  // const feature = new FeatureLayer(datum);
  // scene.add(feature);

  const feature2 = new FeatureLayer2(datum);
  scene.add(feature2);

  console.log("Segmentation Layer Added");
}
