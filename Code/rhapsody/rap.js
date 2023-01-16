/* START COMMENTED SECTION */
const x = 65536; // ???
const y = 28672; // ???
const w = 512; // tile-width
const h = 512; // tile-height
const pg = new THREE.Group();

const segmentation = "http://localhost:8888/halcyon/?iiif=file:///D:/HalcyonStorage/nuclearsegmentation2019/TCGA-CM-5348-01Z-00-DX1.2ad0b8f6-684a-41a7-b568-26e97675cce9.zip";

// function getJSON(x, y, w, h) {
const loader = new THREE.FileLoader();

// load a json file
loader.load(
  // resource URL
  `${segmentation}/${x},${y},${w},${h}/512,/0/default.json`,

  // onLoad callback
  data => {
    // parse the json data
    const polygons = JSON.parse(data);
    console.log('Adding Polygons...');

    for (let i = 0; i < polygons.length; i++) {
      const shape = new THREE.Shape();

      const polygon = polygons[i];
      const coordinates = polygon.coordinates;

      // figure out position
      const x0 = coordinates[0][0] - x; // ???
      const y0 = coordinates[0][1] - y;
      console.log(`0 -> ${x0},${y0}`);
      shape.moveTo(x0, y0); // basically copied from caMic DrawHelper.js

      // connect line from point to point
      for (let j = 1; j < coordinates.length; j++) {
        const xn = coordinates[j][0] - x;
        const yn = coordinates[j][1] - y;
        console.log(`${j} -> ${xn},${yn}`);
        shape.lineTo(xn, yn);
      }

      const geometry = new THREE.ShapeGeometry(shape);
      // geometry.center(); // why?
      // RED:
      const material = new THREE.MeshBasicMaterial({ color: 0xff1100, transparent: true, opacity: 1.0 });
      const X = new THREE.Mesh(geometry, material);
      X.scale.x = 1;
      X.scale.y = 1;
      X.frustumCulled = false;
      // X.position.set(x, y, 0);
      // X.position.set(0, 0, 0);
      pg.add(X);
      console.log('added polygon to group');
    }
    pg.position.set(0, 0, 0);
    console.log('added group to scene');
    scene.add(pg);
  },

  // onProgress callback
  xhr => {
    console.log(`${(xhr.loaded / xhr.total) * 100}% loaded`);
  },

  // onError callback
  err => {
    console.error(`An error happened: ${err}`);
  }
);
/* END COMMENTED SECTION */
