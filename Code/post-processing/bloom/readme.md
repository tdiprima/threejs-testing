`webgl_postprocessing_unreal_bloom_selective.html`

https://codesandbox.io/examples/package/three-effectcomposer-es6

**Important read:**
manual/en/post-processing.html

https://forum.unity.com/threads/what-is-a-shader-pass.381970/

**RenderPass** is normally placed at the beginning of the chain in order to
provide the rendered scene as an input for the next post-processing step.

**ShaderPass** for our custom post-processing shader

**ShaderMaterial** is material rendered with custom shaders

https://doc.babylonjs.com/features/featuresDeepDive/postProcesses/renderTargetTextureMultiPass

```js
finalPass.needsSwap = true;
```

**needsSwap** means: Swap render targets A and B after finishing this pass.

**Vertex Shader**

vertex information (aka a mesh)
processed by vertex function

**Fragment Shader**

think texture

**I can haz template?**

```js
// https://www.8thwall.com/playground/postprocessing-bloom
const renderer = new WebGLRenderer({
  canvas,
  context: GLctx,
  alpha: true,
  antialias: true
});

renderer.debug.checkShaderErrors = false;
renderer.autoClear = false;
renderer.autoClearDepth = false;
renderer.setClearColor(0xffffff, 0);

sceneTarget = new WebGLRenderTarget(canvasWidth, canvasHeight, {
  generateMipmaps: false
});

// Bloom Composer
const bloomComposer = new EffectComposer(renderer);
bloomComposer.renderToScreen = false;

// Copy scene into bloom
copyPass = new TexturePass(sceneTarget.texture);
bloomComposer.addPass(copyPass);

// Bloom Pass
bloomPass = new UnrealBloomPass(
  new Vector2(canvasWidth, canvasHeight),
  1.5,
  0.4,
  0.85
);

bloomPass.clearColor = new Color(0xffffff);

bloomPass.threshold = params.bloomThreshold;
bloomPass.strength = params.bloomStrength;
bloomPass.radius = params.bloomRadius;

bloomComposer.addPass(bloomPass);

// Final composer
const composer = new EffectComposer(renderer);
composer.addPass(copyPass);

// Combine scene and camera feed pass
combinePass = new ShaderPass(combineShader);
combinePass.clear = false;
combinePass.renderToScreen = true;

composer.addPass(combinePass);
```
