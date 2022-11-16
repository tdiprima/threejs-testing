new GLTFLoader().load(
  "/models/gltf/CesiumMilkTruck.glb",
  gltf => {
    scene.add(gltf.scene);
  },
  xhr => {
    console.log(`${(xhr.loaded / xhr.total) * 100}% loaded`);
  },
  error => {
    console.log(error);
  }
);
