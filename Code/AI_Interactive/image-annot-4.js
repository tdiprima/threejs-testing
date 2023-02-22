// Allow the user to add multiple text annotations

// Initialize text geometry and material
const textGeometry = new THREE.TextGeometry("", {
  font: font,
  size: 0.5,
  height: 0.05
});
const textMaterial = new THREE.MeshBasicMaterial({ color: 0x000000 });

// array to hold text meshes
const textMeshes = [];

// function to start adding text annotation
function startAddingText() {
  // initialize new text mesh
  const textMesh = new THREE.Mesh(textGeometry, textMaterial);
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
  // add text mesh to textMeshes array
  textMeshes.push(textMesh);
  // set flag to indicate that we are adding a text annotation
  addingText = true;
}

// function to update text annotation
function updateTextAnnotation() {
  // update the most recently added text mesh with user input
  const text = document.getElementById("text-input").value;
  const textMesh = textMeshes[textMeshes.length - 1];
  textMesh.geometry = new THREE.TextGeometry(text, {
    font: font,
    size: 0.5,
    height: 0.05
  });
}

// function to end adding text annotation
function endAddingText() {
  // add text annotation to annotations array
  const textMesh = textMeshes[textMeshes.length - 1];
  annotations.push({
    type: "text",
    text: textMesh.geometry.parameters.text,
    position: textMesh.position.clone(),
    rotation: textMesh.rotation.clone()
  });
  // clear text input field
  document.getElementById("text-input").value = "";
  // set flag to indicate that we are not adding a text annotation
  addingText = false;
}

// function to remove the most recently added text annotation
function removeLastTextAnnotation() {
  const textMesh = textMeshes.pop();
  scene.remove(textMesh);
  annotations.pop();
}
