<span style="color:#0000dd;">Three.js has EffectComposer, RenderPass, ShaderPass, and UnrealBloomPass.  How do you know what order to define each thing in?</span>

## Order of Three.js Passes

Let's start by understanding the basic concept of how these things work, and then I'll walk you through the order in which they're usually set up.

Imagine you're painting a canvas. Instead of painting everything in one go, you decide to apply different effects one by one to the canvas.

**Step 1**: Paint the basic picture (your scene) – this is where `RenderPass` comes in.

**Step 2**: Apply some cool filters or effects to the image you just painted – this is what `ShaderPass` and the other passes like `UnrealBloomPass` do.

**Step 3**: Show the final artwork.

---

Now, let's dive deeper:

1. **EffectComposer**: Think of this as your toolbox. Before you start painting, you need somewhere to keep all your brushes, paints, and other tools. The `EffectComposer` is where you'll store and manage all the different effects (or "passes") you want to use.

2. **RenderPass**: This is your base layer. It's like drawing the main image on your canvas. When using `EffectComposer`, you almost always start with a `RenderPass`. It takes your Three.js scene and camera and renders the initial image.

3. **ShaderPass** and other passes (like `UnrealBloomPass`): Once you have your main image, you might want to tweak its looks. For example, you might want to add a glow effect. These are the additional "filters" or "effects" you apply to your image. You can have multiple of these, and they're applied in the order you add them. 

For instance, let's say you have a `ShaderPass` that turns your image black and white, and then you have an `UnrealBloomPass` that adds a glow. If you put the black and white pass first, you'll get a glowing black and white image. Swap their order, and you'll have a colored image with a glow and then turned black and white.

---

**Here's a basic order of how to set things up**:

1. Create your `EffectComposer`.
2. Add a `RenderPass` to it – to get the basic image of your scene.
3. Then, add any additional effects like `ShaderPass` or `UnrealBloomPass` to the composer. The order you add them is crucial as each effect will be applied in the sequence you add them.
4. Finally, tell the `EffectComposer` to render the result.

---

In code, it might look something like this:

```javascript
// Setup your scene, camera, and renderer as usual
let scene = new THREE.Scene();
let camera = new THREE.PerspectiveCamera( ... );
let renderer = new THREE.WebGLRenderer();

// 1. Create the EffectComposer
let composer = new THREE.EffectComposer(renderer);

// 2. Add the RenderPass
let renderPass = new THREE.RenderPass(scene, camera);
composer.addPass(renderPass);

// 3. Add any effects
let bloomPass = new THREE.UnrealBloomPass( ... );
composer.addPass(bloomPass);

// In your animation or render loop
function animate() {
    // ... any other animations or updates ...

    // Use the composer to render instead of the renderer directly
    composer.render();

    requestAnimationFrame(animate);
}
```

I hope this analogy and guide help you understand the concept and order of `EffectComposer` and its passes. Happy coding!

## Otra

At first, I found this example:
[Three Effectcomposer Es6 Examples](https://codesandbox.io/examples/package/three-effectcomposer-es6) (bloom),
only to discover that it's a copy of [webgl\_postprocessing\_unreal\_bloom\_selective.html](http://127.0.0.1:5501/examples/webgl_postprocessing_unreal_bloom_selective.html)

**Important read:** [**Post Processing**](http://127.0.0.1:5501/manual/#en/post-processing)

<br>
