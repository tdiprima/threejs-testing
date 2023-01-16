// Draw image and overlay. The End.

const baseUrl = "http://localhost:8888/iiif/?iiif=http://localhost:8888/HalcyonStorage/tcga/coad/TCGA-CM-5348-01Z-00-DX1.2ad0b8f6-684a-41a7-b568-26e97675cce9.svs";
const segment = "http://localhost:8888/halcyon/?iiif=file:///D:/HalcyonStorage/nuclearsegmentation2019/TCGA-CM-5348-01Z-00-DX1.2ad0b8f6-684a-41a7-b568-26e97675cce9.zip";
const feature = "http://localhost:8888/halcyon/?iiif=file:///D:/HalcyonStorage/features/raj/Ptumor_heatmap_TCGA-CM-5348-01Z-00-DX1.2ad0b8f6-684a-41a7-b568-26e97675cce9.zip";

const magicNumber = 82984;

function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  renderer.setSize(window.innerWidth, window.innerHeight);
  camera.updateProjectionMatrix();
}

// Return default.jpg from base
function srcUrl(x, y, w, h) {
  return new THREE.TextureLoader().load(
    `${baseUrl}/${x},${y},${w},${h}/512,/0/default.jpg`
  );
}

// Return default.png (transparent) from segmentation
function srcSegUrl(x, y, w, h) {
  return new THREE.TextureLoader().load(
    `${segment}/${x},${y},${w},${h}/512,/0/default.png`
  );
}

// One for the base image...
function square(x, y, w, h, src, offset) {
  const texture = src;

  const shape = new THREE.Shape();
  shape.moveTo(0, 0);
  shape.lineTo(0, 1);
  shape.lineTo(1, 1);
  shape.lineTo(1, 0);

  const geometry = new THREE.ShapeGeometry(shape);
  geometry.center();

  const material = new THREE.MeshBasicMaterial({ map: texture, depthWrite: false, side: THREE.DoubleSide });

  const X = new THREE.Mesh(geometry, material);
  X.scale.x = w;
  X.scale.y = h;
  X.frustumCulled = false;
  X.position.set(0, 0, offset);

  return X;
}

// ...and one for segmentations. It should be one function for both.
// If segmentation, then material: transparent and :opacity.
function segmentationSquare(x, y, w, h, src, offset) {
  const texture = src;

  const shape = new THREE.Shape();
  shape.moveTo(0, 0);
  shape.lineTo(0, 1);
  shape.lineTo(1, 1);
  shape.lineTo(1, 0);

  const geometry = new THREE.ShapeGeometry(shape);
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
 * @class Rapture
 */
class Rapture extends THREE.Object3D {
  constructor(x, y, w, h, offset) {
    super();
    this.type = 'Rapture';

    // HERE'S LEVEL OF DETAIL
    const lod = new THREE.LOD();

    // GET FROM BASE URL
    const low = square(x, y, w, h, srcUrl(x, y, w, h), offset);
    lod.addLevel(low, w);

    low.onBeforeRender = function() {
      if (w > 1024) { // 1024
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
    this.type = 'FeatureLayer2';

    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;

    // LEVEL OF DETAIL
    const lod = new THREE.LOD();

    // GET FROM SEGMENTATION URL
    const low = segmentationSquare(x, y, w, h, srcSegUrl(x, y, w, h), offset);
    lod.addLevel(low, w);

    low.onBeforeRender = function() {
      if (w > 512) { // 512
        if (!this.booted) {
          this.booted = true;

          if (w > 1024) { // 1024
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
            // MEANS: w <= 1024
            const offx = Math.trunc(w / 2);
            const offy = Math.trunc(h / 2);
            const pg = new THREE.Group();

            // HERE'S OUR "GET JSON" METHOD
            const loader = new THREE.FileLoader();
            loader.load(
              // resource URL
              `${segment}/${x},${y},${w},${h}/512,/0/default.json`,

              // onLoad callback
              data => {
                const obj = JSON.parse(data);

                // Iterate objects
                for (let i = 0; i < obj.length; i++) {
                  const coord = obj[i].coordinates;
                  const shape = new THREE.Shape();
                  const x0 = coord[0][0] - x - offx;
                  const y0 = h - (coord[0][1] - y) - offy;
                  shape.moveTo(x0, y0);

                  // Iterate coordinates
                  for (let j = 1; j < coord.length; j++) {
                    const xn = coord[j][0] - x - offx;
                    const yn = h - (coord[j][1] - y) - offy;
                    shape.lineTo(xn, yn);
                  }

                  const geometry = new THREE.ShapeGeometry(shape);
                  // YELLOW:
                  const material = new THREE.MeshBasicMaterial({ color: 0xffff00, transparent: true, opacity: 0.5 });

                  const X = new THREE.Mesh(geometry, material);
                  X.scale.x = 1;
                  X.scale.y = 1;
                  X.frustumCulled = false;
                  pg.add(X);
                  // console.log("added polygon to group");
                }

                lod.addLevel(pg, w / 2);
                // console.log("added polygon to LOD");
              },

              // onProgress callback
              xhr => {
                console.log(`${(xhr.loaded / xhr.total) * 100}% loaded`);
              },

              // onError callback
              err => {
                console.error(`An error happened ${err}`);
              }
            );
          }
        }
      }
    };

    return lod; // instead of return json;
  }
}

// SET UP THREE.JS
THREE.Cache.enabled = true;
const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(90, window.innerWidth / window.innerHeight, -10, 100);
camera.position.set(0, 0, 150000); // Hello??
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

/**
 * ANIMATE
 */
function animate() {
  controls.update();
  renderer.render(scene, camera);
  requestAnimationFrame(animate);
}

animate();
