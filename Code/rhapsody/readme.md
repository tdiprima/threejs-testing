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

# Rapture

He's doing some stupid shit like this:

```js
// let x = 65536;// let y = 28672;
const x0 = coordinates[0][0] - x;
const y0 = coordinates[0][1] - y;
shape.moveTo(x0, y0);
```

Usually we do something like that when we wanna get the size of something.

```js
// segment.js
spImgWidth = bottomRight[0] - topLeft[0];
spImgHeight = bottomRight[1] - topLeft[1];
```

# Contains moveTo

* core/extension/osd-segment-overlay.js
* common/util.js
* common/DrawHelper.js
* common/paths.js

My issue is that x and y are hard-coded numbers from God knows where.  They're big numbers, but they're smaller than the width and height of the image.

And then we subtract that from the starting point.  Makes no sense.

We're playing connect-the-dots.  Unless for whatever reason these points are patch-specific; not image-specific.

In which case, he's picking a point out of nowhere, and saying &ndash; ok, now draw "this", starting from "here".

That might be what he's doing.
