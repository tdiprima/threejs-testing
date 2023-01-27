// Fragment shaders: https://youtu.be/xZM8UJqN1eY?t=745
// Uniforms: https://youtu.be/xZM8UJqN1eY?t=929
uniform sampler2D tDiffuse;
uniform float amount;
varying vec2 vUv;

void main() {
  vec4 color = texture2D(tDiffuse, vUv);
  // gl_FragColor = contains the color of 1 fragment
  gl_FragColor = color * amount;
}
