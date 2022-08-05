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

# EXAMPLES
# examples/webgl_animation_keyframes.html
# examples/main.css

# JSM
# examples/jsm/controls/OrbitControls.js
# examples/jsm/environments/RoomEnvironment.js
# examples/jsm/loaders/GLTFLoader.js
# examples/jsm/loaders/DRACOLoader.js
# examples/jsm/libs/stats.module.js

# MODELS
examples/models/gltf/LittlestTokyo.glb
