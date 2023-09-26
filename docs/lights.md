## Lights

<span style="color:#0000dd;">What's the best light to use for <a href="../Code/LOD/muse.html">this?</a>  Hemisphere or point?</span>

<span style="color:#0000dd;">None!  We're using MeshBasicMaterial.<br>MeshPhongMaterial or MeshStandardMaterial needs lighting.</span>

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
