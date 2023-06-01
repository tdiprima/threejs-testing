## Pixel manipulation · three.js

[](https://www.reddit.com/r/threejs/comments/3og8xj/pixel_manipulation/)

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
