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

// EASY.
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
});
