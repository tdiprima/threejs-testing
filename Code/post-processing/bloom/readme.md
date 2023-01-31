At first, I found this example:
[Three Effectcomposer Es6 Examples](https://codesandbox.io/examples/package/three-effectcomposer-es6) (bloom),
only to discover that it's a copy of [webgl\_postprocessing\_unreal\_bloom\_selective.html](http://127.0.0.1:5501/examples/webgl_postprocessing_unreal_bloom_selective.html)

**Important read:** [**Post Processing**](http://127.0.0.1:5501/manual/#en/post-processing)

# bloomLayer

```js
const bloomLayer = new THREE.Layers();
bloomLayer.set(BLOOM_SCENE); // set channel

if (bloomLayer.test(obj.layers) === false) {
  //...
}
```

# RenderPass

**RenderPass** is normally placed at the beginning of the chain in order to
provide the rendered scene as an input for the next post-processing step.

```js
const renderScene = new RenderPass(scene, camera);
bloomComposer.addPass(renderScene);
finalComposer.addPass(renderScene);
```

# ShaderPass

**ShaderPass** for our custom post-processing shader

[**What is a "shader pass"?**](https://forum.unity.com/threads/what-is-a-shader-pass.381970/)

```js
const finalPass = new ShaderPass(shader, textureID);
finalPass.needsSwap = true;
finalComposer.addPass(finalPass);
```

**needsSwap** means: Swap render targets A and B after finishing this pass.

```js
finalPass.needsSwap = true;
```

# ShaderMaterial

**ShaderMaterial** is material rendered with custom shaders

```js
const material = new THREE.ShaderMaterial({
  uniforms: {
    time: {
      value: 1.0
    },
    resolution: {
      value: new THREE.Vector2()
    }
  },
  vertexShader: document.getElementById('vertexShader').textContent,
  fragmentShader: document.getElementById('fragmentShader').textContent
});
```

**Vertex Shader**

vertex information (aka a mesh)

processed by vertex function

**Fragment Shader**

think texture


# What the heck is renderTarget2?

[**Club Babylon, Render Target**](https://doc.babylonjs.com/features/featuresDeepDive/postProcesses/renderTargetTextureMultiPass)

```js
uniforms: {
  bloomTexture: {
    value: bloomComposer.renderTarget2.texture
  }
}
```

# What is a Pass?

It's the actual thing that does what you want.

```js
const bloomPass = new UnrealBloomPass(resolution, strength, radius, threshold);
bloomPass.strength = params.bloomStrength;
// etc.
bloomComposer.addPass(bloomPass);
```

# EffectComposer

```js
const bloomComposer = new EffectComposer(renderer);

bloomComposer.addPass(renderScene);
bloomComposer.addPass(bloomPass);

bloomComposer.renderToScreen = false;
bloomComposer.renderToScreen = true;

bloomComposer.setSize(width, height);

bloomComposer.render();
```

```js
const finalComposer = new EffectComposer(renderer);

finalComposer.addPass(renderScene);
finalComposer.addPass(finalPass);

finalComposer.setSize(width, height);

finalComposer.render();
```

## And here we have the totality of the thing

Basically, you need a Pass and a Composer.

Both for "the thing you want", and the... let's call it a controller.  Or a conductor. Dispatcher, I don't know.

# 🧑‍🏭 🧑‍🎤 👨‍🎨

And you also need a RenderPass to represent the scene.

```js
bloomLayer = THREE.Layers 
bloomPass = UnrealBloomPass
bloomComposer = EffectComposer

renderScene = RenderPass

finalPass = ShaderPass
finalComposer = EffectComposer
```
