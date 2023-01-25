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

<br>

# explain three.js "webgl_rtt." html

<!-- He's doing what I wanna do https://stackoverflow.com/questions/21533757/three-js-use-framebuffer-as-texture
-->



<br>

# RenderTexture

Rendering the texture to a <span style="color:red"> RenderTexture</span> and then calling <span style="color:blue"> renderer.readRenderTargetPixels</span> to get pixel data.

### [WebGL RenderTexture Demo](https://threejs.org/examples/webgl_rtt.html) <span style="color:red">&lt;&mdash; RenderTexture</span> 🌾

### [readRenderTargetPixels](https://threejs.org/docs/#api/en/renderers/WebGLRenderer.readRenderTargetPixels) <span style="color:blue">&lt;&mdash; renderer.readRenderTargetPixels</span> 🎯

### [WebGL RenderTarget](https://threejs.org/docs/#api/en/renderers/WebGLRenderTarget) 🎯

A render target in three.js is basically a texture you can render to.

After you render to it, you can use that texture like any other texture.

<!--A render target is a buffer where the video card draws pixels for a scene that is being rendered in the background.

It is used in different effects, such as applying **postprocessing** to a rendered image before displaying it on the screen.-->


<br>

# Todo:

https://stackoverflow.com/questions/43583012/getting-the-color-value-of-a-pixel-on-click-of-a-mesh-with-three-js

https://stackoverflow.com/questions/33433305/threejs-how-to-pick-the-intersection-point-color-of-an-object

https://stackoverflow.com/questions/45331120/readrendertargetpixels-results-all-zeroes

https://discourse.threejs.org/t/readrendertargetpixels-without-any-shader-just-to-get-the-pixelcolor-returns-0-0-0/7022

<br>

# Slide info

Where? `$HOME/trabajo/Halcyon/src/main/java/com/df/halcyon/wicket/ethereal`

## Example from COAD (colon adenocarcinoma)

```sh
openslide-show-properties "tcga_data/coad/TCGA-CM-5348-01Z-00-DX1.2ad0b8f6-684a-41a7-b568-26e97675cce9.svs"
```

```c
mpp-x,y = 0.25
objective-power: 40
OriginalWidth = 117000, OriginalHeight = 83084
level[0].width: '112231', level[0].height: '82984'
tiff.ResolutionUnit: 'inch'
```

[TCGA Study Abbreviations](https://gdc.cancer.gov/resources-tcga-users/tcga-code-tables/tcga-study-abbreviations)

<br>

# Contains moveTo

* core/extension/osd-segment-overlay.js
* common/util.js
* common/DrawHelper.js
* common/paths.js

Usually we do something like this when we wanna get the size of something.

```js
// segment.js
spImgWidth = bottomRight[0] - topLeft[0];
spImgHeight = bottomRight[1] - topLeft[1];
```

<br>

# I did it (extra stuff)

https://jsfiddle.net/q2fdu7p9/

https://discourse.threejs.org/t/how-to-get-pixel-data-from-maps/25966

https://discourse.threejs.org/t/is-it-possible-to-color-correct-a-texture/17144

If you need complex color correction - you can use CanvasTexture

Transfer the WebGL canvas image onto a canvas with a 2D context.

```js
const texture = loader.load(image, texture => {
  // create off-screen canvas
  // do pixel manipulation
});
```

If I wanted it smaller, I'd have to scale it or something. &ndash; How the F did they get it to be so small?  Mine came out original size.

```js
pxl[i] = 255 * pxl[i] / 255;
pxl[i + 2] = 255 * pxl[i + 2] / 255;
```

The "divide by 255" makes it weird.  Weird!  How is it possible?  I cancelled out the * 255.

And &ndash; how is it working, then (because we `255 * pxl[i]`)?

Putting new data on old three.js canvas...

todo: create texture from this.

```js
context.putImageData(data, 0, 0);
```
<- create image, load as texture, Russian Doll.

Another option would be to use color property of the material that uses the Texture.

```js
// THIS WORKS.
const myColor = {
  "r": 1,
  "g": 0,
  "b": 0
}
material.color = myColor;
```

It shades it all one color, though.
