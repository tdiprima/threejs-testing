let img = "/textures/images/bear-soongnyoong.png";
let loader;

// EASY.
loader = new THREE.TextureLoader();
let material = new THREE.MeshBasicMaterial({
  map: loader.load(img),
  side: THREE.DoubleSide
});

let geometry = new THREE.PlaneGeometry(10, 10);
let mesh = new THREE.Mesh(geometry, material);
mesh.position.set(0, 0, 0);
scene.add(mesh);

// ADVANCED.
// https://stackoverflow.com/questions/51722754/three-js-image-aspect-ratio
// https://stackoverflow.com/questions/49111431/how-to-get-texture-dimensions-with-three-js
loader = new THREE.TextureLoader();
let texture = loader.load(img, tex => {
  // tex and texture are the same in this example, but that might not always be the case
  console.log(tex.image.width, tex.image.height);
  console.log(texture.image.width, texture.image.height);
});
