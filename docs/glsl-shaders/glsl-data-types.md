# GLSL Core Tutorial – Data Types

[http://www.lighthouse3d.com/tutorials/glsl-core-tutorial/glsl-core-tutorial-data-types/](https://web.archive.org/web/20131230143945/http://www.lighthouse3d.com/tutorials/glsl-core-tutorial/glsl-core-tutorial-data-types/)

The following **simple data types** are available in GLSL:

* float
* double
* bool
* int
* uint

These all behave like regular C types, apart from bool.

> Not sure about this section:

> **Vectors** with 2,3 or 4 components are also available for each of the simple data types mentioned above. These are declared as:

> * vec{2,3,4} a vector of 2, 3, or 4, floats
* dvec{2,3,4} vector of doubles
* bvec{2,3,4} bool vector
* ivec{2,3,4} vector of integers
* uvec{2,3,4} vector of unsigned integers

**Square matrices** 2×2, 3×3 and 4×4 are provided, for floats and doubles, since they are heavily used in graphics. The respective data types are:

* mat2, dmat2
* mat3, dmat3
* mat4, dmat4

There are also **non-square matrices**, also for float and doubles which have the generic form:

* mat{2,3,4}x{2,3,4}
* dmat{2,3,4}x{2,3,4}

If columns and rows (first and second number respectively), are equal, then these are equivalent to the previous definition of square matrices.

A set of special types are available for **texture access**. These are called **samplers** and are required to access texture values, also known as texels.

Some of the most common **data types** for **texture sampling** are:

* sampler1D – for 1D textures
* sampler2D – for 2D textures
* sampler3D – for 3D textures
* samplerCube – for cube map textures
* sampler2DShadow – for shadow maps

**Atomic counters** are a new feature in OpenGL 4 hardware. Have a look at the [Atomic Counter Tutorial](https://web.archive.org/web/20131230143945/http://www.lighthouse3d.com/cg-topics/opengl-atomic-counters/) for more details on this.

In GLSL, **arrays** can be declared using the same syntax as in C. However, arrays can't be initialized when declared. Accessing array elements is done as in C.

**Structures** are also allowed in GLSL. The syntax is the same as C.

```glsl
struct dirlight {
  vec3 direction;
  vec3 color;
};
```

## Variables

Declaring a simple variable is pretty much the same as in C, we can even initialize a variable when declaring it.

```glsl
float a, b;    // two vector (yes, the comments are like in C)
int c = 2;     // c is initialized with 2
bool d = true; // d is true

```

**Declaring** the other types of variables follows the same pattern. GLSL relies heavily on constructor for initialization and type casting. However, it adopts a relaxed policy regarding implicit conversion. A type can be implicitly converted to a more general type, for instance an int to a float.

```glsl
float b = 2;        // implicit conversion
int a = 2;
float c = float(a); // also correct. c is 2.0

vec3 f;             // declaring f as a vec3
vec3 g = vec3(1.0, 2.0, 3.0); // declaring and initializing g
```

GLSL is pretty **flexible** when initializing variables using other variables. All that it requires, is that you provide the necessary number of components. Look at the following examples.

```glsl
vec2 a = vec2(1.0, 2.0);
vec2 b = vec2(3.0, 4.0);

vec4 c = vec4(a, b); // c = vec4(1.0,2.0,3.0,4.0);

vec2 g = vec2(1.0, 2.0);

float h = 3.0;

vec3 j = vec3(g, h);
```

**Matrices** also follow this pattern. You have a wide variety of constructors for matrices. For instance the following constructors for initializing a matrix are available:

```glsl
mat4 m = mat4(1.0); // initializing the diagonal of the matrix with 1.0

vec2 a = vec2(1.0, 2.0);
vec2 b = vec2(3.0, 4.0);

mat2 n = mat2(a, b); // matrices are assigned in column major order

mat2 k = mat2(1.0, 0.0, 1.0, 0.0); // all elements are specified
```

The declaration and initialization of **structures** is demonstrated below:

```glsl
struct dirlight { // type definition
  vec3 direction;
  vec3 color;
};

dirlight d1;

dirlight d2 = dirlight(vec3(1.0, 1.0, 0.0), vec3(0.8, 0.8, 0.4));
```

In GLSL, a few extras are provided to simplify our lives, and make the code a little bit clearer. **Accessing a vector** can be done using letters, as well as standard C selectors.

```glsl
vec4 a = vec4(1.0, 2.0, 3.0, 4.0);

float posX = a.x;
float posY = a[1];

vec2 posXY = a.xy;

float depth = a.w;
```

As shown in the previous code snippet, it is possible to use the letters `x,y,z,w` to access **vectors components**. 

If you're talking about **colors**, then `r,g,b,a` can be used.

For **texture** coordinates, the available selectors are `s,t,p,q`.

Notice that, by convention, texture coordinates are often referred as `s,t,r,q`. However, `r` is already being used as a selector for "red" in RGBA. Hence, there was a need to find a different letter, and the lucky one was `p`.

**Matrix selectors** can take one or two arguments, for instance `m[0]`, or `m[2][3]`. In the first case, the first column is selected; whereas in the second, a single element is selected.

As for structures the names of the **elements** of the structure can be used as in C, so assuming the structures described above the following line of code could be written:

```glsl
// Assuming we have a struct d1
d1.direction = vec3(1.0, 1.0, 1.0);
```

## Constant Qualifier

A declaration of a local variable can also used the **const** keyword, as in

```glsl
const float gravity = 9.8;
```

<hr>

Prev: [Cleaning Up](https://web.archive.org/web/20131230143945/http://www.lighthouse3d.com/tutorials/glsl-core-tutorial/glsl-core-tutorial-cleaning-up/)

Next: [Statements and Functions](https://web.archive.org/web/20131230143945/http://www.lighthouse3d.com/tutorials/glsl-core-tutorial/glsl-core-tutorial-statements-and-functions/)	 
