// Rapture.html, line 262
async function addLayer(x, y, w, h) {
  // console.log("Getting Feature Data");
  // const datum = await featuresRcurl(x, y, w, h);
  console.log("Creating Feature Layer");
  // const feature = new FeatureLayer(datum);
  // scene.add(feature);
  const feature2 = new FeatureLayer2(datum);
  scene.add(feature2);
  console.log("Segmentation Layer Added");
}

THREE.Cache.enabled = true;

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(90, window.innerWidth / window.innerHeight, -10, 100);
camera.position.set(0, 0, 150000);
// camera.position.set(0, 0, 1250);

const renderer = new THREE.WebGLRenderer({antialias: true});
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);

document.body.appendChild(renderer.domElement);

window.addEventListener("resize", onWindowResize);

let controls = new THREE.TrackballControls(camera, renderer.domElement);

const image = new Rapture(0, 0, 82984, 82984, 0);
scene.add(image);

const feature2 = new FeatureLayer2(0, 0, 82984, 82984, 1);
scene.add(feature2);

console.log("Segmentation Layer Added");

/**/
let x = 65536;
let y = 28672;
let w = 512;
let h = 512;

// Line 192. Cwap :\
console.log(`Render ---> ${x}, ${y}, ${w}, ${h}`);

const offx = Math.trunc(w / 2);
const offy = Math.trunc(h / 2);

const pg = new THREE.Group();

const loader = new THREE.FileLoader();

const resourceURL = "http://localhost:8888/halcyon/?iiif=file:///D:/HalcyonStorage/nuclearsegmentation2019/TCGA-CM-5348-01Z-99-DX1.2ad0b8f6...";

const onloadCallback = function (data) {
  let obj = JSON.parse(data);
  // Iterate objects
  for (let i = 0; i < obj.length; i++) {
    let coord = obj[i].coordinates;
    const square = new THREE.Shape();
    let x0 = (coord[0][0] - x) - offx;
    let y0 = h - (coord[0][0] - y) - offy;
    square.moveTo(x0, y0);

    // Iterate coordinates
    for (let j = 1; j < coord.length; j++) {
      let xn = (coord[j][0] - x) - offx;
      let xyn = (coord[j][1] - y) - offy;
      square.lineTo(xn, yn);
    }

    const geometry = new THREE.ShapeGeometry(square);
    const material = new THREE.MeshBasicMaterial();
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
  // let yes = pg.clone();
  // yes.position.set(0, 0, offset + 5);
  // console.log("added clone polygon to Scene");

};

// loader.load(url, function (data) {}, function (xhr) {}); // or something...

loader.load(resourceURL, onloadCallback);
