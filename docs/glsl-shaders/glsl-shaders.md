# Three.js Post Processing

[GLSL (Graphics Library Shading Language)](https://www.khronos.org/files/opengles_shading_language.pdf)

[this article](https://webglfundamentals.org/webgl/lessons/webgl-shaders-and-glsl.html)

[The Book of Shaders](https://thebookofshaders.com/)

[As mentioned](threejs-post-processing.html) about all the details of how to write GLSL and custom shaders is too much for these articles. If you really want to know how WebGL itself works then check out [these articles](https://webglfundamentals.org/). Another great resource is just to [read through the existing post processing shaders in the THREE.js repo](https://github.com/mrdoob/three.js/tree/master/examples/js/shaders). Some are more complicated than others but if you start with the smaller ones you can hopefully get an idea of how they work.

Most of the post processing effects in the THREE.js repo are unfortunately undocumented so to use them you'll have to [read through the examples](https://github.com/mrdoob/three.js/tree/master/examples) or [the code for the effects themselves](https://web.archive.org/web/20220929122146/https://github.com/mrdoob/three.js/tree/master/examples/js/postprocessing). Hopefully these simple example and the article on [render targets](https://r105.threejsfundamentals.org/threejs/lessons/threejs-rendertargets.html) provide enough context to get started.

# UV mapping
UV mapping is the 3D modeling process of projecting a 3D model's surface to a 2D image for texture mapping. The letters "U" and "V" denote the axes of the 2D texture because "X", "Y", and "Z" are already used to denote the axes of the 3D object in model space, while "W" (in addition to XYZ) is used in calculating quaternion rotations, a common operation in computer graphics.

# Shaders

**Shaders** run in parallel.

Instead of looping sequentially through each pixel one-by-one, shaders are applied to each pixel ***simultaneously***, thus taking advantage of the parallel architecture of the GPU.

### Pixel Shaders = Fragment Shaders.

**rasterization** = render a 3D scene into pixels.

### Applying shaders example: [webgl_postprocessing.html](https://github.com/mrdoob/three.js/blob/3b63de52395409fb12a8267bc3d7a5492886deb0/examples/webgl_postprocessing.html)

REVISION: '56dev', commit #3b63de5239.

### In the scene initialization we set up the effect chain:

```js
// postprocessing
let composer = new THREE.EffectComposer(renderer);
composer.addPass(new THREE.RenderPass(scene, camera));

let dotScreenEffect = new THREE.ShaderPass(THREE.DotScreenShader);
dotScreenEffect.uniforms.scale.value = 4;
composer.addPass(dotScreenEffect);

let rgbEffect = new THREE.ShaderPass(THREE.RGBShiftShader);
rgbEffect.uniforms.amount.value = 0.0015;
rgbEffect.renderToScreen = true;
composer.addPass(rgbEffect);
```

# GLSL Syntax 💡

The best intro to GLSL syntax I found is at [Pixel Shaders interactive tutorial](http://pixelshaders.com/sample/).

The main WebGL language docs are the [GLSL ES Reference Pages](https://www.khronos.org/opengles/sdk/docs/man31/index.php).


```glsl
// x-fragment
varying vec2 vUv;
uniform sampler2D tDiffuse;

void main() {
  gl_FragColor = texture2D(tDiffuse, vUv);
}
```

[**vec2**](https://thebookofshaders.com/glossary/?search=vec2) is a floating point vector with two components.

[**vUv**](https://www.airtightinteractive.com/2013/02/intro-to-pixel-shaders-in-three-js/#:~:text=vUv%20is%20a%202D%20vector) is a 2D vector that contains the UV coordinates of the pixel being processed.

[**sampler2D**](https://math.hws.edu/graphicsbook/c6/s4.html) is used to do lookup in a standard texture image.

[**tDiffuse**](https://www.airtightinteractive.com/2013/02/intro-to-pixel-shaders-in-three-js/#:~:text=tDiffuse%20is%20the%20texture%20from) is the texture from the previous shader *in the effect chain*.

[**texture2D**](https://thebookofshaders.com/glossary/?search=texture2D) retrieves texels from a texture.

# EffectsComposer

`/examples/js/postprocessing`

`/examples/js/shaders`


# What is UV in raycast three.js

**uv** &ndash; U,V coordinates at point of intersection

Simple.

[According to this](https://stackoverflow.com/questions/49426805/where-is-the-documentation-for-uv-and-other-webgl-variables), since the vertex shader is used to create a THREE.ShaderMaterial, uv is provided as a default attribute by three.js.

**So I did this** (right in webgl\_geometry\_cube.html):

```js
const shaderMaterial = new THREE.ShaderMaterial();
console.log("shaderMaterial", shaderMaterial.defaultAttributeValues);
```

And behold:

```json
{
  "color": [1, 1, 1],
  "uv": [0, 0],
  "uv2": [0, 0]
}
```

[Shader Material](https://threejs.org/docs/index.html#api/en/materials/ShaderMaterial) (go look at "Built-in attributes and uniforms" and "Custom attributes and uniforms").

And there's [WebGLProgram docs](https://threejs.org/docs/#api/en/renderers/webgl/WebGLProgram).

