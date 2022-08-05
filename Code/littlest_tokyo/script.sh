#!/usr/bin/env bash

DIR="js/libs/draco/gltf"
mkdir -p "$DIR"
cd "$DIR"

GLTF="https://raw.githubusercontent.com/mrdoob/three.js/master/examples/js/libs/draco/gltf"
wget "$GLTF/draco_decoder.js"
wget "$GLTF/draco_decoder.wasm"
wget "$GLTF/draco_decoder.js"
wget "$GLTF/draco_wasm_wrapper.js"
wget "$GLTF/draco_encoder.js"

echo "fini"
