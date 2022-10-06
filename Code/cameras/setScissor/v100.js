// https://unpkg.com/three@0.100.0/build/three.js
this.setScissor = function (x, y, width, height) {
  _scissor.set(x, _height - y - height, width, height);
  state.scissor(_currentScissor.copy(_scissor).multiplyScalar(_pixelRatio));
};

this.setScissorTest = function (boolean) {
  state.setScissorTest(_scissorTest = boolean);
};
