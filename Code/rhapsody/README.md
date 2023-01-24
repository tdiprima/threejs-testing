# Todo:

Rendering the texture to a RenderTexture and then calling renderer.readRenderTargetPixels to get pixel data.
`work/render-to-texture.html`

https://r105.threejsfundamentals.org/threejs/lessons/threejs-rendertargets.html

https://stackoverflow.com/questions/38583219/three-js-render-to-texture

# Slide info

<!-- $HOME/trabajo/Halcyon/src/main/java/com/ebremer/halcyon/wicket/ethereal -->

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

# Get Image Data

[Is there a way to get the pixel data of the Texture without going through the canvas](https://discourse.threejs.org/t/is-there-a-way-to-get-the-pixel-data-of-the-texture-without-going-through-the-canvas/40988)

[three.js pixel manipulation](https://www.reddit.com/r/threejs/comments/3og8xj/pixel_manipulation/)

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
