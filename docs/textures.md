## Power-of-two dimensions

```js
let canvasTexture = new THREE.CanvasTexture(canvas);
```

Make sure that you have created the `canvasTexture` object correctly and that it is loaded before assigning it to the map property of the material.

Also, check that the `canvasTexture` object has the correct dimensions and format. In three.js, **textures must have power-of-two dimensions** (e.g. `256x256`, `512x512`, etc.), and some formats (such as `SVG`) may not be supported.


## Three.js Manual

[Textures](https://threejs.org/manual/#en/textures)

* Textures are often the part of a three.js app that use the most memory. It's important to understand that in general, textures take `width * height * 4 * 1.33` bytes of memory.  So make your textures small in dimensions not just small in file size.
* "Filtering and Mips"
* Texture.magFilter

[Indexed Textures for Picking and Color](https://threejs.org/manual/#en/indexed-textures)

* This article is a continuation of [an article about aligning html elements to 3d](https://threejs.org/manual/en/align-html-elements-to-3d.html).

[Optimize Lots of Objects](https://threejs.org/manual/#en/optimize-lots-of-objects)

[Optimize Lots of Objects Animated](https://threejs.org/manual/#en/optimize-lots-of-objects-animated)

[Scene Graph](https://threejs.org/manual/#en/scenegraph)

## HTML

Most of these have some of the same code in it, except for sun-earth-moon &amp; texture-wrap.

## Data

[https://globe.chromeexperiments.com/population909500.json](https://globe.chromeexperiments.com/population909500.json)

[https://sedac.ciesin.columbia.edu/data/set/gpw-v4-population-count-rev11/](https://sedac.ciesin.columbia.edu/data/set/gpw-v4-population-count-rev11/)

[https://sedac.ciesin.columbia.edu/data/set/gpw-v4-population-count-rev11/data-download](https://sedac.ciesin.columbia.edu/data/set/gpw-v4-population-count-rev11/data-download)
