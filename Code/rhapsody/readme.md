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
