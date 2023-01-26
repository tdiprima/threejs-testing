// https://youtu.be/xZM8UJqN1eY?t=745
uniform sampler2D tDiffuse;
uniform float amount;
varying vec2 vUv;

void main() {
  vec4 color = texture2D(tDiffuse, vUv);
  // gl_FragColor = texture2D(textureSampler, vUV);
  gl_FragColor = color * amount;
}
