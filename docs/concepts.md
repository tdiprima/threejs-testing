## Models

Check this out: [Sun](https://g.co/kgs/fqW65n) scroll down to 3D model.

Uses Google [model-viewer](https://unpkg.com/@google/model-viewer/dist/model-viewer.min.js).

## Imaging Level of Detail

Level of Detail can be decreased as the model moves away from the viewer. **(Distance!)**

An example of various DLOD ranges. Darker areas are meant to be rendered with higher detail. An additional culling operation is run, discarding all the information outside the frustum (colored areas).

<!-- https://en.m.wikipedia.org/wiki/File:DiscreteLodAndCullExampleRanges.MaxDZ8.svg -->

<!-- https://en.wikipedia.org/wiki/Level_of_detail_(computer_graphics) -->

[Level of Detail in 3D City Model](https://www.treistek.com/post/level-of-detail-in-3d-city-model)

![Level of Detail 3D City](img/level-of-detail-in-3d-city-model.jpg)

<br>

![Summary-of-the-method](img/Summary-of-the-method-Level-of-detail-LOD-triangulated-irregular-network-TIN.jpg)

<br>

## Frustum

[field-of-view.md](cameras/field-of-view.md)

A frustum is the portion of a pyramid that lies between one or two parallel planes cutting it.

![Camera Frustum](img/VisualCameraFrustum.jpg)

<br>

## Culling

![Culling](img/tree.jpg)

If it's off-camera, don't render it.

OK, well what if it's behind an object that's on camera?

[Does Three.js automatically cull objects that are not visible behind other objects?](https://stackoverflow.com/questions/67428704/does-three-js-automatically-cull-objects-that-are-not-visible-behind-other-objec)

It's called occlusion culling?  And no, [not yet](https://github.com/mrdoob/three.js/pull/15450).

![](https://global.discourse-cdn.com/standard17/uploads/threejs/original/2X/6/61406af82ba29741938fbd22ec5328d88f0b255a.jpeg)

<br>

## Raycasting

[Tutorial](http://soledadpenades.com/articles/three-js-tutorials/object-picking/)

[Lode's Computer Graphics Tutorial - Raycasting](https://lodev.org/cgtutor/raycasting.html)

![Game](img/Wolfenstein_3D_Screenshot.jpg)

<br>

## Editing a Polygon in three.js

[Drawing a line with three.js dynamically](https://stackoverflow.com/questions/31399856/drawing-a-line-with-three-js-dynamically)

![Line](img/aVBCe.jpg)

<br>

[Introduction To Polygonal Modeling And Three.js](https://www.smashingmagazine.com/2013/09/introduction-to-polygonal-modeling-and-three-js/)

![Polygon](img/polygondiagram-large-mini.jpg)

<br>

## Axes

![axes](img/x-y-z-2.png)

![axes](img/x-y-z-1.png)

<br>

## Yaw, Pitch, Roll

<!-- <img src="https://www.researchgate.net/profile/Hashim-Hashim/publication/335854843/figure/fig2/AS:803963083452423@1568691144637/Graphical-representation-of-Euler-angles-with-respect-to-the-reference-axis-of-the_Q320.jpg"/> -->

![Yaw, Pitch, Roll](img/Euler-angles-with-respect-to-axis-of-rotation.jpg)

<br>

