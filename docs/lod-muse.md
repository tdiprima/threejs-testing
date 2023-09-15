## Level of Detail (LOD)

<a href="../Code/LOD/muse.html"> muse.html </a>

The LOD function is used to create a Level of Detail object, which allows you to **switch between** different models or geometries **based on the distance** between the camera and the object.

This is particularly useful for **optimizing the performance** of your 3D scenes by reducing the level of detail when objects are far away.

### Example:

```javascript
// Create a Level of Detail object
var lod = new THREE.LOD();

// Create different levels of detail (meshes or geometries)
var highDetailGeometry = new THREE.SphereGeometry(10, 32, 32);
var highDetailMesh = new THREE.Mesh(highDetailGeometry, new THREE.MeshBasicMaterial({ color: 0xff0000 }));

var mediumDetailGeometry = new THREE.SphereGeometry(10, 16, 16);
var mediumDetailMesh = new THREE.Mesh(mediumDetailGeometry, new THREE.MeshBasicMaterial({ color: 0x00ff00 }));

var lowDetailGeometry = new THREE.SphereGeometry(10, 8, 8);
var lowDetailMesh = new THREE.Mesh(lowDetailGeometry, new THREE.MeshBasicMaterial({ color: 0x0000ff }));

// Add the different levels of detail to the LOD object
lod.addLevel(highDetailMesh, 0); // Distance = 0 or closer
lod.addLevel(mediumDetailMesh, 100); // Distance between 0 and 100
lod.addLevel(lowDetailMesh, 200); // Distance between 100 and 200

// Add the LOD object to the scene
scene.add(lod);
```

<br>

In this example, we create three different levels of detail for a sphere object. The `highDetailMesh` represents the highest level of detail, with a high number of vertices. The `mediumDetailMesh` and `lowDetailMesh` have progressively lower levels of detail with fewer vertices.

We then use the `lod.addLevel()` method to add each level of detail to the LOD object. The first parameter is the mesh or geometry representing the level of detail, and the second parameter is the distance at which this level of detail should be used.

Finally, we add the LOD object to the scene using `scene.add(lod)`.

When rendering the scene, three.js will automatically switch between the different levels of detail based on the distance between the camera and the LOD object. This helps optimize the performance of the scene by rendering simpler geometries when they are far away and more detailed geometries when they are closer to the camera.

## Lights

What's the best light to use for this?  Hemisphere or point? 

None!  We're using `MeshBasicMaterial`.<br>`MeshPhongMaterial` or `MeshStandardMaterial` needs lighting.

The `MeshStandardMaterial` material is a physically-based material that reacts to light sources, allowing you to see the lighting effects on the spheres.

<span style="color:red;">Anyway...</span> The choice of lighting depends on the specific requirements and aesthetic goals of your scene. Both hemisphere and point lights can be used effectively in different scenarios.

### HemisphereLight

A hemisphere light is often used to simulate ambient lighting or global illumination. It creates a soft, uniform lighting effect by blending two colors, one for the sky and one for the ground. The hemisphere light is not position-dependent and doesn't cast shadows, making it suitable for creating an evenly lit environment.

```javascript
var hemisphereLight = new THREE.HemisphereLight(0xffffff, 0x000000, 1);
scene.add(hemisphereLight);
```

In this example, the first parameter is the sky color, and the second parameter is the ground color. The third parameter represents the intensity of the light.

### Point Light

A point light is a traditional light source that emits light in all directions from a specific point in space. It casts shadows and can create more focused and directional lighting effects. Point lights are commonly used to simulate light bulbs, lamps, or any localized light source.

```javascript
var pointLight = new THREE.PointLight(0xffffff, 1);
pointLight.position.set(0, 10, 0);
scene.add(pointLight);
```

In this example, the first parameter is the color of the light, and the second parameter is the intensity. The `position.set()` method sets the position of the point light in 3D space.

In summary, if you want to create a uniform and evenly lit environment without casting shadows, a hemisphere light can be a good choice. On the other hand, if you need more focused and position-dependent lighting with shadows, a point light would be more suitable.

<br>
