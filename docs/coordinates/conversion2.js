// drawingModule.js
// Well, that didn't work.  Gives 1 coordinate, and it looks like it's in canvas coordinates.
import * as THREE from 'three';

export function enableDrawing(scene, camera, renderer, controls) {
  let btnDraw = document.getElementById("toggleButton");
  let isDrawing = false;
  let mouseIsPressed = false;
  let color = "#0000ff";

  btnDraw.addEventListener("click", function () {
    if (isDrawing) {
      isDrawing = false;
      controls.enabled = true;

      // Remove the mouse event listeners
      renderer.domElement.removeEventListener("mousemove", onMouseMove);
      renderer.domElement.removeEventListener("mouseup", onMouseUp);
    } else {
      // Drawing on
      isDrawing = true;
      controls.enabled = false;

      // Set up the mouse event listeners
      renderer.domElement.addEventListener("mousemove", onMouseMove);
      renderer.domElement.addEventListener("mouseup", onMouseUp);
    }
  });

  // TODO: Set up geometry to raycast against
  let imageSize = { width: 1024, height: 794 };
  let aspectRatio = imageSize.width / imageSize.height;
  let planeWidth = 10; // You can adjust this value as needed
  let planeHeight = planeWidth / aspectRatio;

  let planeGeom = new THREE.PlaneGeometry(planeWidth, planeHeight);
  let texture = new THREE.TextureLoader().load("/images/image1.jpg");
  let planeMat = new THREE.MeshBasicMaterial({ map: texture, side: THREE.DoubleSide });
  let plane = new THREE.Mesh(planeGeom, planeMat);
  scene.add(plane);

  // Set up the raycaster and mouse vector
  let raycaster = new THREE.Raycaster();
  let mouse = new THREE.Vector2();

  let lineMaterial = new THREE.LineBasicMaterial({color});

  // TODO: Dashed Line Issue Solution
  lineMaterial.polygonOffset = true;
  lineMaterial.polygonOffsetFactor = -1;
  lineMaterial.depthTest = false;
  lineMaterial.depthWrite = false;
  lineMaterial.transparent = true;
  lineMaterial.alphaTest = 0.5; // Adjust this value as needed

  let line;
  let currentPolygonPositions = []; // Store positions for current polygon
  let polygonPositions = []; // Store positions for each polygon
  const distanceThreshold = 0.1;

  renderer.domElement.addEventListener('pointerdown', event => {
    if (isDrawing) {
      mouseIsPressed = true;

      // Create a new BufferAttribute for each line
      line = new THREE.Line(new THREE.BufferGeometry(), lineMaterial);
      scene.add(line);

      currentPolygonPositions = []; // Start a new array for the current polygon's positions
    }
  });

  function onMouseMove(event) {
    if (isDrawing && mouseIsPressed) {
      mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
      mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

      raycaster.setFromCamera(mouse, camera);
      let intersects = raycaster.intersectObjects(scene.children, true);

      if (intersects.length > 0) {
        let point = intersects[0].point;

        // Check if it's the first vertex of the current polygon
        const isFirstVertex = currentPolygonPositions.length === 0;

        if (isFirstVertex) {
          currentPolygonPositions.push(point.x, point.y, point.z);
        } else {
          // DISTANCE CHECK
          const lastVertex = new THREE.Vector3().fromArray(currentPolygonPositions.slice(-3));
          const currentVertex = new THREE.Vector3(point.x, point.y, point.z);
          const distance = lastVertex.distanceTo(currentVertex);

          if (distance > distanceThreshold) {
            currentPolygonPositions.push(point.x, point.y, point.z); // Store the position in the current polygon's array
            line.geometry.setAttribute("position", new THREE.Float32BufferAttribute(currentPolygonPositions, 3)); // Use the current polygon's array for the line's position attribute
          }
        }

        if (line.geometry.attributes.position) {
          line.geometry.attributes.position.needsUpdate = true;
        }
      }
    }
  }

  function decimate(line) {
    if (line.geometry.attributes.position) {
      let originalArray = line.geometry.attributes.position.array;
      let decimatedArray = [];

      for (let i = 0; i < originalArray.length; i += 9) {
        decimatedArray.push(originalArray[i], originalArray[i + 1], originalArray[i + 2]);
      }
      console.log("Position array lengths:\nOriginal:", polygonPositions, "\nDecimated:", decimatedArray);
    }
  }

  function convertToImageCoordinates(worldCoordinates, planeWidth, planeHeight, imageWidth, imageHeight) {
    // Normalize the 3D coordinates to the plane's scale
    const normalizedX = (worldCoordinates.x / planeWidth) + 0.5; // Assuming plane is centered
    const normalizedY = (worldCoordinates.y / planeHeight) + 0.5; // Assuming plane is centered

    // Convert to image coordinates
    const imageX = Math.round(normalizedX * imageWidth);
    const imageY = Math.round((1 - normalizedY) * imageHeight); // Flip Y-axis

    return { x: imageX, y: imageY };
  }

  function logImageCoords(polygonPositions, imageWidth, imageHeight) {
    // Convert and log image coordinates
    const imageCoordinates = polygonPositions.map(pos => {
      const worldPoint = new THREE.Vector3(pos[0], pos[1], pos[2]);
      return convertToImageCoordinates(worldPoint, planeGeom.parameters.width, planeGeom.parameters.height, imageWidth, imageHeight);
    });

    console.log("Image Coordinates: ", imageCoordinates);
  }

  function onMouseUp() {
    if (isDrawing) {
      mouseIsPressed = false;

      // Draw the final line
      line.geometry.setDrawRange(0, currentPolygonPositions.length / 3);
      line.geometry.computeBoundingSphere();

      polygonPositions.push(currentPolygonPositions); // Store the current polygon's positions in the polygonPositions array
      currentPolygonPositions = []; // Clear the current polygon's array

      // decimate(line);
      logImageCoords(polygonPositions, imageSize.width, imageSize.height);
    }
  }
}
