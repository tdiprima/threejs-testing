// https://unpkg.com/three@0.144.0/build/three.js
this.setScissor = function (x, y, width, height) {
  if (x.isVector4) {
    _scissor.set(x.x, x.y, x.z, x.w);
  } else {
    _scissor.set(x, y, width, height);
  }

  state.scissor(_currentScissor.copy(_scissor).multiplyScalar(_pixelRatio).floor());
};

this.getScissorTest = function () {
  return _scissorTest;
};

this.setScissorTest = function (boolean) {
  state.setScissorTest(_scissorTest = boolean);
};
