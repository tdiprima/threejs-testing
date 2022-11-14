import * as THREE from "three";

function main() {
  let canvas = document.querySelector("#c");
  let renderer = new THREE.WebGLRenderer({ canvas });
  renderer.setClearColor("#aaaaaa"); // Dark Gray
  renderer.shadowMap.enabled = true;

  function makeCamera(fov = 40) {
    return new THREE.PerspectiveCamera(fov, 2, 0.1, 1000);
  }

  let mainCamera = makeCamera();
  mainCamera.position.set(8, 4, 10).multiplyScalar(3);
  mainCamera.lookAt(0, 0, 0);

  let scene = new THREE.Scene();

  {
    // LIGHT #1
    let light = new THREE.DirectionalLight(0xffffff, 1); // White light
    light.position.set(0, 20, 0);
    scene.add(light);
    light.castShadow = true;
    // Higher values give better quality shadows at the cost of computation time.
    // Values must be powers of 2.
    light.shadow.mapSize = new THREE.Vector2(2048, 2048);

    const d = 50;
    // "camera" is an attribute
    light.shadow.camera.left = -d;
    light.shadow.camera.right = d;
    light.shadow.camera.top = d;
    light.shadow.camera.bottom = -d;
    light.shadow.camera.near = 1;
    light.shadow.camera.far = d;
    // Deciding whether a surface is in shadow.
    light.shadow.bias = 0.001; // Reduce artifacts in shadows.
  }

  {
    // LIGHT #2
    let light = new THREE.DirectionalLight(
      0xffffff,  // White light
      1
    );
    light.position.set(1, 2, 4);
    scene.add(light);
  }

  let groundGeometry = new THREE.PlaneGeometry(50, 50);
  let groundMaterial = new THREE.MeshPhongMaterial({
    color: "#cc8866" // Antique Brass
  });
  let groundMesh = new THREE.Mesh(groundGeometry, groundMaterial);
  groundMesh.rotation.x = Math.PI * -0.5;
  groundMesh.receiveShadow = true;
  scene.add(groundMesh);

  let carWidth = 4;
  let carHeight = 1;
  let carLength = 8;

  // TANK
  let tank = new THREE.Object3D(); // is used to move everything below it around
  scene.add(tank);

  let bodyGeometry = new THREE.BoxGeometry(carWidth, carHeight, carLength);
  let bodyMaterial = new THREE.MeshPhongMaterial({
    color: "#6688aa" // Hoki
  });
  let bodyMesh = new THREE.Mesh(bodyGeometry, bodyMaterial);
  bodyMesh.position.y = 1.4;
  bodyMesh.castShadow = true;
  tank.add(bodyMesh);

  // TANK CAMERA
  let tankCameraFov = 75;
  let tankCamera = makeCamera(tankCameraFov);
  tankCamera.position.y = 3;
  tankCamera.position.z = -6;
  tankCamera.rotation.y = Math.PI;
  bodyMesh.add(tankCamera);

  // WHEELS
  let wheelRadius = 1;
  let wheelThickness = 0.5;
  let wheelSegments = 6;
  let wheelGeometry = new THREE.CylinderGeometry(
    wheelRadius, // top radius
    wheelRadius, // bottom radius
    wheelThickness, // height of cylinder
    wheelSegments
  );

  let wheelMaterial = new THREE.MeshPhongMaterial({
    color: "#888888" // Gun-smoke
  });

  const wheelPositions = [
    [-carWidth / 2 - wheelThickness / 2, -carHeight / 2, carLength / 3],
    [carWidth / 2 + wheelThickness / 2, -carHeight / 2, carLength / 3],
    [-carWidth / 2 - wheelThickness / 2, -carHeight / 2, 0],
    [carWidth / 2 + wheelThickness / 2, -carHeight / 2, 0],
    [-carWidth / 2 - wheelThickness / 2, -carHeight / 2, -carLength / 3],
    [carWidth / 2 + wheelThickness / 2, -carHeight / 2, -carLength / 3]
  ];

  let wheelMeshes = wheelPositions.map(position => {
    let mesh = new THREE.Mesh(wheelGeometry, wheelMaterial);
    mesh.position.set(...position);
    mesh.rotation.z = Math.PI * 0.5;
    mesh.castShadow = true;
    bodyMesh.add(mesh);
    return mesh;
  });

  // DOME
  let domeRadius = 2;
  let domeWidthSubdivisions = 12;
  let domeHeightSubdivisions = 12;
  let domePhiStart = 0;
  let domePhiEnd = Math.PI * 2;
  let domeThetaStart = 0;
  let domeThetaEnd = Math.PI * 0.5;

  let domeGeometry = new THREE.SphereGeometry(
    domeRadius,
    domeWidthSubdivisions,
    domeHeightSubdivisions,
    domePhiStart,
    domePhiEnd,
    domeThetaStart,
    domeThetaEnd
  );

  let domeMesh = new THREE.Mesh(domeGeometry, bodyMaterial);
  domeMesh.castShadow = true;
  bodyMesh.add(domeMesh);
  domeMesh.position.y = 0.5;

  // TURRET
  let turretWidth = 0.1;
  let turretHeight = 0.1;
  let turretLength = carLength * 0.75 * 0.2;

  let turretGeometry = new THREE.BoxGeometry(
    turretWidth,
    turretHeight,
    turretLength
  );

  let turretMesh = new THREE.Mesh(turretGeometry, bodyMaterial);
  let turretPivot = new THREE.Object3D();
  turretMesh.castShadow = true;
  turretPivot.scale.set(5, 5, 5);
  turretPivot.position.y = 0.5;
  turretMesh.position.z = turretLength * 0.5;
  turretPivot.add(turretMesh);
  bodyMesh.add(turretPivot);

  let turretCamera = makeCamera();
  turretCamera.position.y = 0.75 * 0.2;
  turretMesh.add(turretCamera);

  // ESPLAIN.
  let targetOrbit; // For the target, the thing the tank is aiming at, there is a targetOrbit.
  let targetElevation; // A child of the targetOrbit, provides an offset from the targetOrbit, and a base elevation.
  let targetBob; // just bobs up and down relative to the targetElevation
  let targetMesh; // a cube we rotate and change its colors

  let targetGeometry = new THREE.SphereGeometry(
    0.5,
    6,
    3
  );

  let targetMaterial = new THREE.MeshPhongMaterial({
    color: "#00ff00", // Lime
    flatShading: true
  });

  targetMesh = new THREE.Mesh(targetGeometry, targetMaterial);
  targetOrbit = new THREE.Object3D();
  targetElevation = new THREE.Object3D();
  targetBob = new THREE.Object3D();
  targetMesh.castShadow = true;
  scene.add(targetOrbit);

  targetOrbit.add(targetElevation);
  targetElevation.position.z = carLength * 2;
  targetElevation.position.y = 8;
  targetElevation.add(targetBob);
  targetBob.add(targetMesh);

  let targetCamera = makeCamera();
  let targetCameraPivot = new THREE.Object3D();
  targetCamera.position.y = 1;
  targetCamera.position.z = -2;
  targetCamera.rotation.y = Math.PI;
  targetBob.add(targetCameraPivot);
  targetCameraPivot.add(targetCamera);

  // Create a sine-like wave
  let curve = new THREE.SplineCurve([
    new THREE.Vector2(-10, 0),
    new THREE.Vector2(-5, 5),
    new THREE.Vector2(0, 0),
    new THREE.Vector2(5, -5),
    new THREE.Vector2(10, 0),
    new THREE.Vector2(5, 10),
    new THREE.Vector2(-5, 10),
    new THREE.Vector2(-10, -10),
    new THREE.Vector2(-15, -8),
    new THREE.Vector2(-10, 0)
  ]);

  // We can ask for positions along that curve.
  // 0.0 is the start of the curve. 1.0 is the end of the curve.
  let points = curve.getPoints(50);
  let geometry = new THREE.BufferGeometry().setFromPoints(points);
  let material = new THREE.LineBasicMaterial({
    color: "#ff0000" // Red
  });

  let splineObject = new THREE.Line(geometry, material);
  splineObject.rotation.x = Math.PI * 0.5;
  splineObject.position.y = 0.05;
  scene.add(splineObject);

  function resizeRendererToDisplaySize(renderer) {
    const canvas = renderer.domElement;
    let width = canvas.clientWidth;
    let height = canvas.clientHeight;
    let needResize = canvas.width !== width || canvas.height !== height;
    if (needResize) {
      renderer.setSize(width, height, false);
    }
    return needResize;
  }

  let targetPosition = new THREE.Vector3();
  let tankPosition = new THREE.Vector2();
  let tankTarget = new THREE.Vector2();

  // CAMERAS
  // Set up an array of all 4 cameras at init time with descriptions.
  let cameras = [
    {
      cam: mainCamera,
      desc: "detached camera"
    },
    {
      cam: turretCamera,
      desc: "on turret looking at target"
    },
    {
      cam: targetCamera,
      desc: "near target looking at tank"
    },
    {
      cam: tankCamera,
      desc: "above back of tank"
    }
  ];

  let infoElem = document.querySelector("#info");

  function render(time) {
    time *= 0.001;

    if (resizeRendererToDisplaySize(renderer)) {
      const canvas = renderer.domElement;
      // Remember there are several cameras now.
      cameras.forEach(cameraInfo => {
        const camera = cameraInfo.cam;
        camera.aspect = canvas.clientWidth / canvas.clientHeight;
        camera.updateProjectionMatrix();
      });
    }

    // Move target
    targetOrbit.rotation.y = time * 0.27;
    targetBob.position.y = Math.sin(time * 2) * 4;
    targetMesh.rotation.x = time * 7;
    targetMesh.rotation.y = time * 13;
    targetMaterial.emissive.setHSL((time * 10) % 1, 1, 0.25);
    targetMaterial.color.setHSL((time * 10) % 1, 1, 0.25);

    // Move tank
    let tankTime = time * 0.05;
    curve.getPointAt(tankTime % 1, tankPosition); // asks for the current position where it puts the tank
    curve.getPointAt((tankTime + 0.01) % 1, tankTarget); // asks for a position slightly further down the curve
    tank.position.set(tankPosition.x, 0, tankPosition.y);
    tank.lookAt(tankTarget.x, 0, tankTarget.y); // point the tank in that direction

    // Face turret at target
    targetMesh.getWorldPosition(targetPosition); // ask for the target's world position
    turretPivot.lookAt(targetPosition); // point it at the target

    // Make the turretCamera look at target
    turretCamera.lookAt(targetPosition);

    // Make the targetCameraPivot look at the tank
    tank.getWorldPosition(targetPosition);
    targetCameraPivot.lookAt(targetPosition);

    // Rotate all the wheels
    wheelMeshes.forEach(obj => {
      obj.rotation.x = time * 3;
    });

    // Cycle through our cameras at render time
    const camera = cameras[(time * 0.25) % cameras.length | 0];
    infoElem.textContent = camera.desc;

    renderer.render(scene, camera.cam);

    requestAnimationFrame(render);
  }

  requestAnimationFrame(render);
}

main();
