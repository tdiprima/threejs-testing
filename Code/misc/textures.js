// EASY.
let loader = new THREE.TextureLoader();
  let material = new THREE.MeshBasicMaterial({
    map: loader.load(img),
    side: THREE.DoubleSide
  });

  let geometry = new THREE.PlaneGeometry(10, 10);
  let mesh = new THREE.Mesh(geometry, material);
  mesh.position.set(0, 0, 0);
  scene.add(mesh);

// GET DIMENSIONS.
// https://stackoverflow.com/questions/49111431/how-to-get-texture-dimensions-with-three-js
  let loader = new THREE.TextureLoader();
  let texture = loader.load(img, function ( tex ) {
    // tex and texture are the same in this example, but that might not always be the case
    console.log( tex.image.width, tex.image.height );
    console.log( texture.image.width, texture.image.height );
  });
