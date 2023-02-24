// Add Text Annotations, Rather Than Red Dot Annotations

// initialize text geometry and material
const textGeometry = new THREE.TextGeometry("", {
  font: font,
  size: 0.5,
  height: 0.05
});
const textMaterial = new THREE.MeshBasicMaterial({ color: 0x000000 });

// initialize text mesh
let textMesh = new THREE.Mesh(textGeometry, textMaterial);
textMesh.visible = false;
scene.add(textMesh);

// function to start adding text annotation
function startAddingText() {
  // show text mesh
  textMesh.visible = true;
  // set position of text mesh
  textMesh.position.copy(intersection.point);
  // set default text
  textMesh.geometry = new THREE.TextGeometry("Type your text here", {
    font: font,
    size: 0.5,
    height: 0.05
  });
  textMesh.rotation.copy(camera.rotation);
  // add text mesh to scene
  scene.add(textMesh);
  // set flag to indicate that we are adding a text annotation
  addingText = true;
}

// function to update text annotation
function updateTextAnnotation() {
  // update text mesh with user input
  const text = document.getElementById("text-input").value;
  textMesh.geometry = new THREE.TextGeometry(text, {
    font: font,
    size: 0.5,
    height: 0.05
  });
}

// function to end adding text annotation
function endAddingText() {
  // hide text mesh
  textMesh.visible = false;
  // add text annotation to annotations array
  annotations.push({
    type: "text",
    text: textMesh.geometry.parameters.text,
    position: textMesh.position.clone(),
    rotation: textMesh.rotation.clone()
  });
  // remove text mesh from scene
  scene.remove(textMesh);
  // clear text input field
  document.getElementById("text-input").value = "";
  // set flag to indicate that we are not adding a text annotation
  addingText = false;
}
