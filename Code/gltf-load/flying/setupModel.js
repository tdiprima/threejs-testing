import { AnimationMixer } from 'https://cdn.skypack.dev/three@0.136.0';

function setupModel(data) {
  // console.log("data.scene", data.scene);
  const model = data.scene.children[0];
  const clip = data.animations[0];

  const mixer = new AnimationMixer(model);
  const action = mixer.clipAction(clip);
  // console.log("action", action);
  action.play();

  model.tick = (delta) => mixer.update(delta);
  // console.log("delta", delta); // TODO

  return model;
}

export { setupModel };
