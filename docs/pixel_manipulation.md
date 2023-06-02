## Pixel manipulation · three.js

[Get pixel data from maps](https://discourse.threejs.org/t/how-to-get-pixel-data-from-maps/2596)

### Read image data from texture and output it to the console

```js
const loader = new THREE.TextureLoader();

const texture = loader.load('https://threejs.org/examples/textures/uv_grid_opengl.jpg', texture => {
    // You NEED a canvas element to extract data.
    const canvas = document.createElement('canvas');
    canvas.width = texture.image.width;
    canvas.height = texture.image.height;

    // Create a 2D canvas context
    const context = canvas.getContext('2d');
    context.drawImage(texture.image, 0, 0); // Draw texture.image

    // Read texture data
    const data = context.getImageData(0, 0, canvas.width, canvas.height);
    console.log('%ccontext.getImageData', 'color: #ccff00;', data);

    // Visualize the (original) texture
    const geometry = new THREE.PlaneGeometry();
    const material = new THREE.MeshBasicMaterial({
        map: texture
    });

    const mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);
});
```

### Set Material Color

[How to color-correct a texture](https://discourse.threejs.org/t/is-it-possible-to-color-correct-a-texture/17144)

```js
const loader = new THREE.TextureLoader();

const texture = loader.load('https://threejs.org/examples/textures/uv_grid_opengl.jpg', texture => {
    // https://threejs.org/docs/index.html#api/en/textures/CanvasTexture
    // todo: CanvasTexture - sets needsUpdate to true immediately.

    const geometry = new THREE.PlaneGeometry();
    const material = new THREE.MeshBasicMaterial({
        map: texture
    });

    // SET MATERIAL COLOR
    // Texture color is multiplied by color property (red)
    material.color = {
        "r": 1,
        "g": 0,
        "b": 0
    };

    const mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);
});
```

You can use CanvasTexture (docs). Paint your texture on the canvas, manipulate the pixels and then use it as a texture.


### Renderer

```js
// Look - no "preserveDrawingBuffer".
renderer = new THREE.WebGLRenderer({
    antialias: true
});

renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);
```

<br>

[Pixel manipulation](https://www.reddit.com/r/threejs/comments/3og8xj/pixel_manipulation/)

I want to create textures/images with pixel arrays similar to what `getImageData` uses in "2d context".

So I have an array like this `[r,g,b,a, r,g,b,a, ... and so on]` and want to display it.

<br>

cheerioh<br>
7 yr. ago

afaik this isn't possible - it's hard to explain fully without going into OpenGL in more detail, but basically, unlike
  canvas (or 2d in general), in three.js your base unit isn't a pixel but a vector.

The whole spatial measurement system is different - it's like comparing the British Pound to, say, an elephant ;)

That said, three.js is canvas-compatible and even has a canvas renderer (although you can use canvas with the standard
  WebGLRenderer as well).

You can probably do whatever you need to do still in canvas. What exactly are you trying to accomplish with that pixel array?

For more on three.js usage of canvas, it might help to take a look at [Stemkoski's example](https://stemkoski.github.io/Three.js/Texture-From-Canvas.html) or my own [Tweetcloud](http://tweetcloud.michaelhazani.net/), which generates canvases from keyword-filtered livestream tweets.

<br>

Thanks for the explanation and the links!

I want to create some sort of retro style game with 2d sprites but also want to spice it up 3d elements/objects (but mainly 2d in style and world).

The pixel arrays are generated with functions, based on given parameters, and they would serve as sprites for entities.

My only problem was displaying them with 2d context's `putImageData`, as it's far from being as flexible as other canvas functions; my main problem was that it doesn't support `translate()` and `rotate()` and the alpha channel is displayed differently... 

One idea suggested displaying them on temporary canvases and manipulating those, but I don't think that would have good results in performance when there are dozens of sprites to animate/move around.

<br>

irascible<br>
7 yr. ago

I would experiment with writing to a canvas, using that canvas as the "image" for a three.js texture, and setting `texture.needsUpdate` to `true`, to refresh the texture in three.js.

It may or may not have the performance you need, but it definitely works...

As an example... I did a proof of concept test where I was taking frames from webcam... grabbing the image data using `imageData.toDataURL` or something like that (this was a couple of years ago... details are hazy), sending that to my
  webserver, and then broadcasting that string back out to other players connected the webserver... and even with all
  that crazy overhead, the end result was a 3d environment with a 4fps webcam image of each player attached as a sprite
  to their character, and the whole app still ran around 45 fps overall with 4 players connected...
  
So... don't rule it out without doing some testing. You may have to adjust the frequency at which you do your updates in order to maintain a decent framerate... but it's worth experimenting with.

<br>