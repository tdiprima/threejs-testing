## What are quaternions?

Alright, so imagine you're playing a video game where you can control a spaceship. <span style="font-size:27px;">🛸</span>
 
You can make it go forward, backward, left, right, up, and down. But you can also rotate it &mdash; make it spin around like a top or do flips and rolls. Quaternions are a kind of math that helps make those rotations really smooth and accurate.

Coordinates, like "x, y, z" in 3D space, tell you where something is.

Quaternions are like super-coordinates. They use four numbers instead of three.

They help you describe not just ***where*** something is but also how it's turned or ***rotated***.

Just like how a vector has magnitude (size) and direction, and a complex number has a real part and an imaginary part, a quaternion has four parts: a real part and three imaginary parts.

Let's get a bit into why they're helpful. Imagine you have a spinning top. If you just use **regular angles** *(versus Euler angles)* to describe how it rotates, things can get weird or jumpy. This is known as "gimbal lock," and it's like trying to spin a top on a very slippery surface &mdash; it might wobble or fall over. Quaternions help you avoid that, making the rotation really smooth.

So, when game developers or people working with robots want to make sure that rotations look really smooth and natural, they often use quaternions. For controlling exactly how something spins around in 3D space.

## Visualize

While quaternions can be a bit tricky to visualize, they're really useful in computer graphics and animation because they allow us to represent complex rotations and movements in 3D space with a single mathematical object.

<img src="https://industrial-ia.com/wp-content/uploads/2022/10/6d1.png" width="600">

<img src="https://i.stack.imgur.com/glwrb.jpg" width="600">

## Yaw, Pitch, Roll

[Euler angles](what-is-a-quaternion.html)

Yaw, pitch, and roll are types of rotations that describe the orientation of an object in three-dimensional space.

**Yaw** refers to a rotation around the vertical axis (also known as the yaw axis), which is usually defined as pointing straight up. This is like turning your head left or right while keeping it level.

**Pitch** refers to a rotation around the horizontal axis (also known as the pitch axis), which is perpendicular to the yaw axis. This is like tilting your head up or down while keeping it level.

**Roll** refers to a rotation around the lateral axis (also known as the roll axis), which is perpendicular to both the yaw and pitch axes. This is like tilting your head to one side while keeping it level.

Together, these three types of rotations allow us to describe the orientation of an object in 3D space with respect to a fixed reference frame. They're used in many fields, including aviation, robotics, and computer graphics, to describe the movements and orientations of objects.

<img src="https://support.pix4d.com/hc/article_attachments/360047787932/ILL_KB_yAW_PITCH_ROLL.png">

<br>
