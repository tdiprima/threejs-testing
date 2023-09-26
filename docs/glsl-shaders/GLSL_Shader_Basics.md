# GLSL Shader Basics

This GLSL (OpenGL Shading Language) shader code snippet contains multiple examples of different variable types and operations commonly used in shaders. I'll break down each section for you:

## Defining a 4x4 Matrix

Projection Matrix and Model View Matrix:

```glsl
// projectionMatrix: mat4 (4x4 matrix)
mat4 aMat4 = mat4(1.0, 0.0, 0.0, 0.0, // 1. column
                  0.0, 1.0, 0.0, 0.0, // 2. column
                  0.0, 0.0, 1.0, 0.0, // 3. column
                  0.0, 0.0, 0.0, 1.0); // 4. column

// modelViewMatrix: mat4 (4x4 matrix)
// ditto...
```

This initializes a 4x4 matrix named `aMat4` as the **identity matrix.**
    
The comments mention `projectionMatrix` and `modelViewMatrix`, which are commonly used matrices for 3D transformations.

## 3D Position as a vec3:

```glsl
// position: vec3 (3 element array)
vec3 position = vec3(1, 0, 0);
```

This creates a 3D vector named `position` with coordinates (1, 0, 0).

## Creating a vec4 from a vec3 and Scalar:

```glsl
vec4(position, 1.0) === vec4(1, 0, 0, 1.0)
```

This shows how to create a 4D vector (`vec4`) from a 3D vector (`vec3`) and a scalar. Note that the `===` is not valid GLSL; it seems like a comment to indicate equivalence.

## Element-wise Multiplication of vec3:

```glsl
position * vec3(2, 2, 1) === vec3(1, 0, 0) * vec3(2, 2, 1);
// x = 1 * 2// y = 0 * 2// z = 0 * 1
position = vec3(2, 0, 0);
```

This shows that you can do element-wise multiplication of vectors. Again, the `===` seems to be a comment, not valid GLSL code. After the multiplication, `position` gets updated to (2, 0, 0).

## Texture Lookup:

```glsl
// texture2D returns pixel value for coordinate 
// need a way to determine what coord...
// if sphere were laid out into 2 dim...
// x / y coordinates associated with it
```

This is a comment block hinting at using `texture2D` for texture lookups. The comments indicate the challenge of mapping 3D object coordinates to 2D texture coordinates, a common task in 3D graphics.

Remember, the comments and code here seem to serve as examples or snippets rather than a fully functioning shader.

<span style="color:#ff00cc;">Oh yeah...</span> 🥴

<br>
