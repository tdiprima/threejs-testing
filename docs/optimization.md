## Textures are humongous

* [Textures](https://threejs.org/manual/#en/textures) are often the part of a three.js app that use the most memory. It's important to understand that in general, textures take `width * height * 4 * 1.33` bytes of memory.  So make your textures small in dimensions not just small in file size.
* "Filtering and Mips"
* Texture.magFilter

<br>

## Data to canvas

https://threejs.org/manual/#en/optimize-lots-of-objects

To make sure we understand the data let's try to plot it in 2D.

First some code to load the text file.

```js
/**
 * Load the text file
 * Returns a Promise with the contents of the file at url
 * @param url
 * @return {Promise<string>}
 */
async function loadFile(url) {
  const res = await fetch(url);
  return res.text();
}
```

<br>
The code above returns a Promise with the contents of the file at url.

Then we need some code to parse the file.

```js
// truncated
function parseData(text) {
  // split into lines
  text.split('\n').forEach((line) => {
      // split the line by whitespace
      const parts = line.trim().split(/\s+/);
      if (parts.length === 2) {
        // only 2 parts, must be a key/value pair
        settings[parts[0]] = parseFloat(parts[1]);
      } else if (parts.length > 2) {
        // more than 2 parts, must be data
        const values = parts.map((v) => {
          const value = parseFloat(v);
          return value;
        });
        data.push(values);
      }
    }
  }
}
```

<br>
The code above returns an object with all the key/value pairs from the file as well as a data property with all the data in one large array and the min and max values found in the data.

Then we need some code to draw that data.

```js
function drawData(file) {
  // Etc.
}
```

<br>
And finally gluing it all together.

```
loadFile(url)
  .then(parseData)
  .then(drawData);
```

<br>

## Some Light Reading Material

[Indexed Textures for Picking and Color](https://threejs.org/manual/#en/indexed-textures)

* This article is a continuation of [an article about aligning html elements to 3d](https://threejs.org/manual/en/align-html-elements-to-3d.html).

Optimize Lots of Objects (above) ⬆️

[Optimize Lots of Objects Animated](https://threejs.org/manual/#en/optimize-lots-of-objects-animated)

[Scene Graph](https://threejs.org/manual/#en/scenegraph)

<br>
