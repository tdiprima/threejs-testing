// https://stackoverflow.com/questions/16177056/changing-three-js-background-to-transparent-or-other-color

scene.background = new THREE.Color(0xcce0ff);

renderer.setClearColor(0xcce0ff); // sky blue background - replace 0xcce0ff with any hex color

// If you want a transparent background you will have to enable alpha in your renderer first:
renderer = new THREE.WebGLRenderer({alpha: true}); // init like this
renderer.setClearColor(0xffffff, 0); // second param is opacity, 0 => transparent
