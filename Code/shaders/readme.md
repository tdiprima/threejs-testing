# Three.js Shaders

**ChrisCourses**

[Intermediate Three.js Tutorial - Create a Globe with Custom Shaders](https://youtu.be/vM8M4QloVL0)

The dude explains a lot.

[WebGLProgram attributes](https://threejs.org/docs/index.html?q=web#api/en/renderers/webgl/WebGLProgram)

Note that you can therefore calculate the position of a vertex in the vertex shader by:

```glsl
gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
```

[The Book of Shaders](https://thebookofshaders.com/glossary/?search=texture2D)

# Notes

## What is a UV?

A uv is an x and y coordinate

example: [0, 0]

uv mapping is the process of mapping a 2d image onto a 3d object.

u and v represent the axes of the 2d texture because x y and z are taken

also called texture coordinates

## Where tf is uv coming from here?

Comes from three.js, it is an attribute.

## What is a matrix?

A matrix is just an array of data where groupings represent certain things.

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

<br>

```glsl
// projectionMatrix: mat4 (4x4 matrix) 
mat4 aMat4 = mat4(1.0, 0.0, 0.0, 0.0, // 1. column
                  0.0, 1.0, 0.0, 0.0, // 2. column
                  0.0, 0.0, 1.0, 0.0, // 3. column
                  0.0, 0.0, 0.0, 1.0); // 4. column

// modelViewMatrix: mat4 (4x4 matrix)
mat4 aMat4 = mat4(1.0, 0.0, 0.0, 0.0, // 1. column 
0.0, 1.0, 0.0, 0.0, // 2. column 
0.0, 0.0, 1.0, 0.0, // 3. column 
0.0, 0.0, 0.0, 1.0); // 4. column 

// position: vec3 (3 element array)
vec3 position = vec3(1, 0, 0)

vec4(position, 1.0) === vec4(1, 0, 0, 1.0)

position * vec3(2, 2, 1) === vec3(1, 0, 0) * vec3(2, 2, 1)
// x = 1 * 2
// y = 0 * 2
// z = 0 * 1 
position = vec3(2, 0, 0) 

// texture2D returns pixel value for coordinate 
// need a way to determine what coord...
// if sphere were laid out into 2 dim...
// x / y coordinates associated with it
```

## Uniforms

Uniforms are variables that we're gonna pass into the shader.


<!--
**Chris Courses**

[Three.js Shaders in 2 Minutes](https://youtu.be/bC4xJzbKNd0)

Best video.

**The Happie Cat:**

[What Are Shaders?](https://youtu.be/sXbdF4KjNOc)

Hallelujah.


**SubOptimal Engineer:**

[Intro to GLSL Vertex and Fragment Shaders](https://youtu.be/EntBBM6nqQA)

[GLSL Shaders with Uniforms and Varying](https://youtu.be/dRo7SnOJlEM)

The code in this folder.

**SimonDev:**

[Three.js Tutorial on Shaders (beginners)](https://youtu.be/C8Cuwq1eqDw)

This was has a little better understanding at the beginning.

[https://threejs.org/examples/?q=shader](https://threejs.org/examples/?q=shader)

**Shadertoy**

[https://www.shadertoy.com/new](https://www.shadertoy.com/new)

[https://gamedevelopment.tutsplus.com/tutorials/a-beginners-guide-to-coding-graphics-shaders--cms-23313](https://gamedevelopment.tutsplus.com/tutorials/a-beginners-guide-to-coding-graphics-shaders--cms-23313)

**Makin' Stuff Look Good**

[https://youtu.be/T-HXmQAMhG0](https://youtu.be/T-HXmQAMhG0)

"Shaders are a bottomless pit."

Yeah, I'm gettin that distinct bottomless pit vibe...

-->