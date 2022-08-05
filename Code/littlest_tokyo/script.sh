#!/usr/bin/env bash

DIR="js/libs/draco/gltf"
mkdir -p "$DIR"
cd "$DIR"

wget https://raw.githubusercontent.com/mrdoob/three.js/master/examples/js/libs/draco/gltf/draco_decoder.js
wget https://raw.githubusercontent.com/mrdoob/three.js/master/examples/js/libs/draco/gltf/draco_decoder.wasm
wget https://raw.githubusercontent.com/mrdoob/three.js/master/examples/js/libs/draco/gltf/draco_decoder.js
wget https://raw.githubusercontent.com/mrdoob/three.js/master/examples/js/libs/draco/gltf/draco_wasm_wrapper.js
wget https://raw.githubusercontent.com/mrdoob/three.js/master/examples/js/libs/draco/gltf/draco_encoder.js

