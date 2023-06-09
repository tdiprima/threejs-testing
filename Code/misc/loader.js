// FONT LOADER
import * as THREE from "three";
import { FontLoader } from "three/addons/loaders/FontLoader.js";
import { TextGeometry } from "three/addons/geometries/TextGeometry.js";

// Load the font file
fontLoader.load("https://threejs.org/examples/fonts/helvetiker_regular.typeface.json", function(font) {
  // Create the text geometry
  const textGeometry = new TextGeometry("Hello, World!", {
    font: font, // Set the loaded font
    size: 1, // Set the size of the text
    height: 1, // Set the thickness of the text
    curveSegments: 12, // Set the number of segments used for curve approximation
    bevelEnabled: false // Disable bevel
  });

  // Center the text geometry
  textGeometry.computeBoundingBox();
  textGeometry.center();

  // Create a mesh using the text geometry
  const textMesh = new THREE.Mesh(textGeometry, new THREE.MeshBasicMaterial({ color: 0xffffff }));

  // Add the mesh to the scene or perform any other desired operations
  scene.add(textMesh);
});

// GL TRANSMISSION FORMAT
new GLTFLoader().load(
  "/models/gltf/CesiumMilkTruck.glb",
  gltf => {
    scene.add(gltf.scene);
  },
  xhr => {
    console.log(`${(xhr.loaded / xhr.total) * 100}% loaded`);
  },
  error => {
    console.error("Oops.", error);
  }
);

// FILE LOADER
// https://threejs.org/docs/#api/en/loaders/FileLoader
// load a text file and output the result to the console
new THREE.FileLoader().load(
  // resource URL
  'example.txt',

  // onLoad callback
  data => {
    // output the text to the console
    console.log(data);
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

// TEXTURE LOADER
let loader = new THREE.TextureLoader();
let material = new THREE.MeshBasicMaterial({
  map: loader.load("./img.png"),
  side: THREE.DoubleSide
});

// https://stackoverflow.com/questions/51722754/three-js-image-aspect-ratio
// https://stackoverflow.com/questions/49111431/how-to-get-texture-dimensions-with-three-js
// Loading a texture is asynchronous, so you'll need to define the onLoad callback.
new THREE.TextureLoader().load( "./img.png", function (tex) {
  // Tex and texture are the same in this example, but that might not always be the case.
  console.log( tex.image.width, tex.image.height );
  console.log( texture.image.width, texture.image.height );
  mesh.scale.set(1.0, tex.image.height / tex.image.width, 1.0);
});

let geometry = new THREE.BoxGeometry(1, 1, 1);

// OY.

// You can do it like this, inside the callback:
loader.load(img, texture => {
  let material = new THREE.MeshBasicMaterial({
    map: texture
  });
  let cube = new THREE.Mesh(geometry, material);
  scene.add(cube);
});

// Or, believe it or not, like this. (Loader.load returns a texture object.)
let material = new THREE.MeshBasicMaterial({
  map: loader.load(img)
});
let cube = new THREE.Mesh(geometry, material);
scene.add(cube);
