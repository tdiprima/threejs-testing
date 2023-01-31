import * as THREE from "three";
import { GUI } from "three/addons/libs/dat.gui.module.js";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import { EffectComposer } from "three/addons/postprocessing/EffectComposer.js";
import { RenderPass } from "three/addons/postprocessing/RenderPass.js";
import { ShaderPass } from "three/addons/postprocessing/ShaderPass.js";
import { UnrealBloomPass } from "three/addons/postprocessing/UnrealBloomPass.js";

const ENTIRE_SCENE = 0;
const BLOOM_SCENE = 1;

// BLOOM LAYER
const bloomLayer = new THREE.Layers();
bloomLayer.set(BLOOM_SCENE); // set channel

const params = {
  exposure: 1,
  bloomStrength: 5,
  bloomThreshold: 0,
  bloomRadius: 0,
  scene: "Scene with Glow"
};

const darkMaterial = new THREE.MeshBasicMaterial({ color: "black" });

// RENDERER
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.toneMapping = THREE.ReinhardToneMapping;
document.body.appendChild(renderer.domElement);

// SCENE
const scene = new THREE.Scene();

// CAMERA
const camera = new THREE.PerspectiveCamera(
  40,
  window.innerWidth / window.innerHeight,
  1,
  200
);
camera.position.set(0, 0, 20);
camera.lookAt(0, 0, 0);

// CONTROLS
const controls = new OrbitControls(camera, renderer.domElement);
controls.maxPolarAngle = Math.PI * 0.5;
controls.minDistance = 1;
controls.maxDistance = 100;
controls.addEventListener("change", render);

scene.add(new THREE.AmbientLight(0x404040));

// RENDER PASS
const renderScene = new RenderPass(scene, camera);

// BLOOM PASS
const bloomPass = new UnrealBloomPass(
  new THREE.Vector2(window.innerWidth, window.innerHeight),
  1.5,
  0.4,
  0.85
);

bloomPass.threshold = params.bloomThreshold;
bloomPass.strength = params.bloomStrength;
bloomPass.radius = params.bloomRadius;

// BLOOM COMPOSER
const bloomComposer = new EffectComposer(renderer);
bloomComposer.renderToScreen = false;
bloomComposer.addPass(renderScene); // get scene
bloomComposer.addPass(bloomPass); // process scene

// SHADER PASS
const finalPass = new ShaderPass(
  new THREE.ShaderMaterial({
    uniforms: {
      baseTexture: { value: null },
      bloomTexture: { value: bloomComposer.renderTarget2.texture } // clone
    },
    vertexShader: document.getElementById("vertexshader").textContent,
    fragmentShader: document.getElementById("fragmentshader").textContent,
    defines: {}
  }),
  "baseTexture"
);
finalPass.needsSwap = true;

// FINAL COMPOSER
const finalComposer = new EffectComposer(renderer);
finalComposer.addPass(renderScene);
finalComposer.addPass(finalPass);

const raycaster = new THREE.Raycaster();

const mouse = new THREE.Vector2();

// EVENT LISTENER
window.addEventListener("pointerdown", onPointerDown);

// GUI
const gui = new GUI();

gui
  .add(params, "scene", ["Scene with Glow", "Glow only", "Scene only"])
  .onChange(function(value) {
    switch (value) {
      case "Scene with Glow":
        bloomComposer.renderToScreen = false;
        break;
      case "Glow only":
        bloomComposer.renderToScreen = true;
        break;
      case "Scene only":
        // nothing to do
        break;
    }

    render();
  });

const folder = gui.addFolder("Bloom Parameters");

folder.add(params, "exposure", 0.1, 2)
  .onChange(function(value) {
    renderer.toneMappingExposure = Math.pow(value, 4.0);
    render();
  });

folder.add(params, "bloomThreshold", 0.0, 1.0)
  .onChange(function(value) {
    bloomPass.threshold = Number(value);
    render();
  });

folder.add(params, "bloomStrength", 0.0, 10.0)
  .onChange(function(value) {
    bloomPass.strength = Number(value);
    render();
  });

folder
  .add(params, "bloomRadius", 0.0, 1.0)
  .step(0.01)
  .onChange(function(value) {
    bloomPass.radius = Number(value);
    render();
  });

setupScene();

// MOUSE DOWN
function onPointerDown(event) {
  mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
  mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

  raycaster.setFromCamera(mouse, camera);
  const intersects = raycaster.intersectObjects(scene.children, false);
  if (intersects.length > 0) {
    const object = intersects[0].object;
    object.layers.toggle(BLOOM_SCENE);
    render();
  }
}

// RESIZE
window.onresize = function() {
  const width = window.innerWidth;
  const height = window.innerHeight;

  camera.aspect = width / height;
  camera.updateProjectionMatrix();

  renderer.setSize(width, height);

  bloomComposer.setSize(width, height);
  finalComposer.setSize(width, height);

  render();
};

// SET UP SCENE
function setupScene() {
  scene.traverse(disposeMaterial);
  scene.children.length = 0;

  const geometry = new THREE.IcosahedronGeometry(1, 15);

  for (let i = 0; i < 50; i++) {
    const color = new THREE.Color();
    color.setHSL(Math.random(), 0.7, Math.random() * 0.2 + 0.05);

    const material = new THREE.MeshBasicMaterial({ color: color });
    const sphere = new THREE.Mesh(geometry, material);
    sphere.position.x = Math.random() * 10 - 5;
    sphere.position.y = Math.random() * 10 - 5;
    sphere.position.z = Math.random() * 10 - 5;
    sphere.position.normalize()
      .multiplyScalar(Math.random() * 4.0 + 2.0);
    sphere.scale.setScalar(Math.random() * Math.random() + 0.5);
    scene.add(sphere);

    if (Math.random() < 0.25) {
      sphere.layers.enable(BLOOM_SCENE);
    }
  }

  render();
}

// DISPOSE MATERIAL
function disposeMaterial(obj) {
  if (obj.material) {
    obj.material.dispose();
  }
}

// RENDER
function render() {
  switch (params.scene) {
    case "Scene only":
      renderer.render(scene, camera);
      break;
    case "Glow only":
      renderBloom(false);
      break;
    case "Scene with Glow":
    default:
      // render scene with bloom
      renderBloom(true);

      // render the entire scene, then render bloom scene on top
      finalComposer.render();

      break;
  }
}

// RENDER BLOOM
function renderBloom(mask) {
  if (mask === true) {
    // Render scene with bloom (glow)
    scene.traverse(darkenNonBloomed);
    bloomComposer.render();
    scene.traverse(restoreMaterial);
  } else {
    // Render glow only
    camera.layers.set(BLOOM_SCENE);
    bloomComposer.render();
    camera.layers.set(ENTIRE_SCENE);
  }
}

let materials = {}; // Save the altered materials

// DARKEN NON-BLOOMED
function darkenNonBloomed(obj) {
  // obj could be one of the many meshes, or the scene
  // We're only interested in the mesh
  if (obj.isMesh) {
    // obj.layers has a "mask" with a value of 1 or 3
    // We only want the 1's
    if (bloomLayer.test(obj.layers) === false) {
      materials[obj.uuid] = obj.material; // Save it
      obj.material = darkMaterial; // Set it
    }
  }
}

// RESTORE MATERIAL
function restoreMaterial(obj) {
  // If we saved that uuid
  if (materials[obj.uuid]) {
    // Restore it
    obj.material = materials[obj.uuid];
    // Delete the saved one
    delete materials[obj.uuid];
  }
}
