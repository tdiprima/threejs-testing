import { loadBirds } from './loadBirds.js';
import { createCamera } from './createCamera.js';
import { createLights } from './createLights.js';
import { createScene } from './createScene.js';

import { createControls } from './createControls.js';
import { createRenderer } from './createRenderer.js';
import { Resizer } from './Resizer.js';
import { Loop } from './Loop.js';

let camera;
let controls;
let renderer;
let scene;
let loop;

class World {
  constructor(container) {
    camera = createCamera();
    renderer = createRenderer();
    scene = createScene();
    loop = new Loop(camera, scene, renderer);
    container.append(renderer.domElement);
    controls = createControls(camera, renderer.domElement);

    const { ambientLight, mainLight } = createLights();

    loop.updatables.push(controls);
    scene.add(ambientLight, mainLight);

    const resizer = new Resizer(container, camera, renderer); // TODO: empty
    console.log("%cresizer", "color: #ccff00;", resizer);
  }

  async init() {
    const { parrot } = await loadBirds();

    // move the target to the center of the front bird
    controls.target.copy(parrot.position);

    loop.updatables.push(parrot); // TODO: does this really belong here?
    scene.add(parrot);
  }

  render() {
    renderer.render(scene, camera);
  }

  start() {
    console.log("START");
    loop.start();
  }

  stop() {
    loop.stop();
  }
}

export { World };
