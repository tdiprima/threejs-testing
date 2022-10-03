import { Clock } from 'https://cdn.skypack.dev/three@0.136.0';

const clock = new Clock();
var delta;

class Loop {
  constructor(camera, scene, renderer) {
    this.camera = camera;
    this.scene = scene;
    this.renderer = renderer;
    this.updatables = [];
  }

  start() {
    this.renderer.setAnimationLoop(() => {
      // tell every animated object to tick forward one frame
      this.tick();

      // render a frame
      this.renderer.render(this.scene, this.camera);
    });
  }

  stop() {
    this.renderer.setAnimationLoop(null);
  }

  tick() {
    // only call the getDelta function once per frame!
    delta = clock.getDelta();

    // console.log(
    //   `The last frame rendered in ${delta * 1000} milliseconds`,
    // );

    // console.log("this.updatables", this.updatables);
    let object = this.updatables[0];
    object.tick(delta);
    // console.log("object", object);

    // for (const object of this.updatables) {
    //   console.log("object", object);
    //   object.tick(delta);
    // }
  }
}

export { Loop };
