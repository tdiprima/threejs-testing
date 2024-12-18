// https://youtu.be/xZM8UJqN1eY?t=665
varying vec2 vUv;

// Takes care of every vertex position in the given mesh
void main() {
  vUv = uv; // clicked-coordinate
  // Calculate the position of the current vertex
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  // So this guy isn't modifying the points; it's just mapping them.
}
