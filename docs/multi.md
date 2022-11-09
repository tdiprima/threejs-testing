# Three.js Multiple Canvases Multiple Scenes

[Multiple Scenes](https://threejs.org/manual/#en/multiple-scenes)

[Multiple Canvases Multiple Scenes](https://r105.threejsfundamentals.org/threejs/lessons/threejs-multiple-scenes.html)

The solution is one canvas that fills the viewport in the background and some other element to represent each "virtual" canvas.

# In other words...

[A Secret Trick](https://stackoverflow.com/questions/12666570/how-to-change-the-zorder-of-object-with-threejs#12666937)

If you want some objects to render "on top", or "in front", one trick is to create two scenes &mdash; the first scene is your regular scene, and the second scene contains the objects that you want to have on top.

See: [codesandbox.io](https://codesandbox.io/s/view-tracking-bp6tmc)

# Articles

[Rendering multiple scenes on same canvas](https://discourse.threejs.org/t/rendering-multiple-scenes-on-same-canvas/42131)

[Multiple instances of Three.js in same page to show objects library](https://discourse.threejs.org/t/multiple-instances-of-three-js-in-same-page-to-show-objects-library/18341)

[Display multiple instances of three.js in a single page](https://stackoverflow.com/questions/33959538/display-multiple-instances-of-three-js-in-a-single-page)
