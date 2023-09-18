# ChrisCourses

2022-11-17

See also: <a href="GLSL_Shader_Basics.md">GLSL Shader Basics</a>

[Create a Globe with Custom Shaders](https://youtu.be/vM8M4QloVL0)

The dude explains a lot.

[WebGLProgram attributes](https://threejs.org/docs/index.html?q=web#api/en/renderers/webgl/WebGLProgram)

Note that you can calculate the position of a vertex in the vertex shader by:

```glsl
gl_Position = projectionMatrix *
              modelViewMatrix *
              vec4(position, 1.0);
```

[The Book of Shaders](https://thebookofshaders.com/glossary/?search=texture2D)

## What is a UV?

A uv is an x and y coordinate

example: [0, 0]

`uv` mapping is the process of mapping a 2d image onto a 3d object.

`u` and `v` represent the axes of the 2d texture because x y and z are taken.

also called texture coordinates

Where does it come from? From three.js, it is an **attribute**.

## What is a matrix?

A groupie. 🎸

A matrix is just an array of data where **groupings** represent certain things.

It's an array that's organized in a specific manner.

Like a buffer attribute.

Every grouping of three representing a position of a vertex.

```js
// like for a triangle
matrix = [-1, 0, 0, 0, 1, 0, 1, 0, 0];

// easier to read
matrix = [
  -1, 0, 0, // 1st vertex
   0, 1, 0, // 2nd vertex
   1, 0, 0  // 3rd vertex
];
```

## Uniforms

Uniforms are variables that we're gonna pass into the shader.

This is heavy, and this is long. Stopping right about here.

43:18 - Add texture to fragment shader cont.

46:46 - Add shade of blue to earth texture

<br>
