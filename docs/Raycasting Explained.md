## Raycasting

Imagine you're playing a game where you're walking around a virtual world. As you walk, you want to be able to click on things in the world and interact with them. For example, maybe you want to pick up a sword or open a door.

🚪 🗡️ 🤺

But how does the game know what you're clicking on? That's where raycasting comes in!

When you click on something in the game, a line called a "ray" shoots out from your mouse cursor. This ray is like a laser beam that can detect if it hits any objects in the virtual world.

The game then checks to see what the ray has hit, and based on that information, it can tell what you're clicking on. For example, if the ray hits a sword, the game knows you want to pick up the sword.

### Here's what to do

You can create a raycaster object that shoots out a ray and detects what it hits.

1. Create a raycaster object using the `THREE.Raycaster()` constructor.

    <a href="../Code/raycasting">Raycasting</a>

2. Set the starting point of the raycaster to where the mouse click happened. You can get the mouse position using the `event.clientX` and `event.clientY` properties.

3. Set the direction of the raycaster. In three.js, you can use the **camera's position** and the **mouse position** to calculate the direction of the ray.

4. Use the `intersectObjects()` method on the raycaster to see what objects the ray has hit.

5. Finally, you can use the results of the intersection to do whatever you want in your game. For example, you might use the object's `userData` property to store information about what the object is and how to interact with it.

    <span style="color:#ff00cc;">They gave you like a dummy property to stash stuff in.</span>

<br>
