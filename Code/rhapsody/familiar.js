// Look familiar?
// https://threejs.org/docs/#api/en/loaders/FileLoader
const loader = new THREE.FileLoader();

// load a text file and output the result to the console
loader.load(
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
    console.error('An error happened');
  }
);