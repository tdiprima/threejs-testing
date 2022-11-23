// and with that we should be able to pick countries
import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";

function main() {
  const canvas = document.querySelector("#c");
  const renderer = new THREE.WebGLRenderer({ canvas });

  const camera = new THREE.PerspectiveCamera(60, 2, 0.1, 10);
  camera.position.z = 2.5;

  const controls = new OrbitControls(camera, canvas);
  controls.enableDamping = true;
  controls.enablePan = false;
  controls.minDistance = 1.2;
  controls.maxDistance = 4;
  controls.update();

  const scene = new THREE.Scene();
  scene.background = new THREE.Color("#246");

  const pickingScene = new THREE.Scene();
  pickingScene.background = new THREE.Color(0);

  {
    const loader = new THREE.TextureLoader();
    const geometry = new THREE.SphereGeometry(1, 64, 32);

    // https://threejs.org/manual/examples/resources/data/world/country-index-texture.png
    const indexTexture = loader.load(
      "./images/country-index-texture.png",
      render
    );
    indexTexture.minFilter = THREE.NearestFilter;
    indexTexture.magFilter = THREE.NearestFilter;

    const pickingMaterial = new THREE.MeshBasicMaterial({ map: indexTexture });
    pickingScene.add(new THREE.Mesh(geometry, pickingMaterial));

    // https://threejs.org/manual/examples/resources/data/world/country-outlines-4k.png
    const texture = loader.load(
      "./images/country-outlines-4k.png",
      render
    );

    const material = new THREE.MeshBasicMaterial({ map: texture });
    scene.add(new THREE.Mesh(geometry, material));
  }

  async function loadJSON(url) {
    const req = await fetch(url);
    return req.json();
  }

  let numCountriesSelected = 0;
  let countryInfos;
  async function loadCountryData() {
    // https://threejs.org/manual/examples/resources/data/world/country-info.json
    countryInfos = await loadJSON("./data/country-info.json");

    const lonFudge = Math.PI * 1.5;
    const latFudge = Math.PI;

    // these helpers will make it easy to position the boxes
    // We can rotate the lon helper on its Y axis to the longitude
    const lonHelper = new THREE.Object3D();

    // We rotate the latHelper on its X axis to the latitude
    const latHelper = new THREE.Object3D();
    lonHelper.add(latHelper);

    // The position helper moves the object to the edge of the sphere
    const positionHelper = new THREE.Object3D();
    positionHelper.position.z = 1;
    latHelper.add(positionHelper);

    const labelParentElem = document.querySelector("#labels");

    for (let i = 0; i < countryInfos.length; i++) {
      const countryInfo = countryInfos[i];
      const { lat, lon, min, max, name } = countryInfo;

      // adjust the helpers to point to the latitude and longitude
      lonHelper.rotation.y = THREE.MathUtils.degToRad(lon) + lonFudge;
      latHelper.rotation.x = THREE.MathUtils.degToRad(lat) + latFudge;

      // get the position of the lat/lon
      positionHelper.updateWorldMatrix(true, false);
      const position = new THREE.Vector3();
      positionHelper.getWorldPosition(position);
      countryInfo.position = position;

      // compute the area for each country
      const width = max[0] - min[0];
      const height = max[1] - min[1];
      const area = width * height;
      countryInfo.area = area;

      // add an element for each country
      const elem = document.createElement("div");
      elem.textContent = name;
      labelParentElem.appendChild(elem);
      countryInfo.elem = elem;
    }

    requestRenderIfNotRequested();
  }
  loadCountryData();

  const tempV = new THREE.Vector3();
  const cameraToPoint = new THREE.Vector3();
  const cameraPosition = new THREE.Vector3();
  const normalMatrix = new THREE.Matrix3();

  const settings = {
    minArea: 20,
    maxVisibleDot: -0.2
  };

  function updateLabels() {
    // exit if we have not loaded the data yet
    if (!countryInfos) {
      return;
    }

    const large = settings.minArea * settings.minArea;
    // get a matrix that represents a relative orientation of the camera
    normalMatrix.getNormalMatrix(camera.matrixWorldInverse);
    // get the camera's position
    camera.getWorldPosition(cameraPosition);

    for (let i = 0; i < countryInfos.length; i++) {
      const countryInfo = countryInfos[i];
      const { position, elem, area, selected } = countryInfo;

      const largeEnough = area >= large;

      const show = selected || (numCountriesSelected === 0 && largeEnough);
      if (!show) {
        elem.style.display = "none";
        continue; // todo: hang on - continue?
      }

      // Orient the position based on the camera's orientation.
      // Since the sphere is at the origin and the sphere is a unit sphere
      // this gives us a camera relative direction vector for the position.
      tempV.copy(position);
      tempV.applyMatrix3(normalMatrix);

      // compute the direction to this position from the camera
      cameraToPoint.copy(position);
      cameraToPoint.applyMatrix4(camera.matrixWorldInverse).normalize();

      // get the dot product of camera relative direction to this position
      // on the globe with the direction from the camera to that point.
      // 1 = facing directly towards the camera
      // 0 = exactly on tangent of the sphere from the camera
      // < 0 = facing away
      const dot = tempV.dot(cameraToPoint);

      // if the orientation is not facing us hide it.
      if (dot > settings.maxVisibleDot) {
        elem.style.display = "none";
        continue; // todo: no-continue
      }

      // restore the element to its default display style
      elem.style.display = "";

      // get the normalized screen coordinate of that position
      // x and y will be in the -1 to +1 range with x = -1 being
      // on the left and y = -1 being on the bottom
      tempV.copy(position);
      tempV.project(camera);

      // convert the normalized position to CSS coordinates
      const x = (tempV.x * 0.5 + 0.5) * canvas.clientWidth;
      const y = (tempV.y * -0.5 + 0.5) * canvas.clientHeight;

      // move the elem to that position
      elem.style.transform = `translate(-50%, -50%) translate(${x}px,${y}px)`;

      // set the zIndex for sorting
      // todo: no-bitwise
      elem.style.zIndex = ((-tempV.z * 0.5 + 0.5) * 100000) | 0;
    }
  }

  class GPUPickHelper {
    constructor() {
      // create a 1x1 pixel render target
      this.pickingTexture = new THREE.WebGLRenderTarget(1, 1);
      this.pixelBuffer = new Uint8Array(4);
    }

    pick(cssPosition, scene, camera) {
      const { pickingTexture, pixelBuffer } = this;

      // set the view offset to represent just a single pixel under the mouse
      const pixelRatio = renderer.getPixelRatio();
      camera.setViewOffset(
        renderer.getContext().drawingBufferWidth, // full width
        renderer.getContext().drawingBufferHeight, // full top
        (cssPosition.x * pixelRatio) | 0, // rect x
        (cssPosition.y * pixelRatio) | 0, // rect y
        1, // rect width
        1 // rect height
      );
      // render the scene
      renderer.setRenderTarget(pickingTexture);
      renderer.render(scene, camera);
      renderer.setRenderTarget(null);
      // clear the view offset so rendering returns to normal
      camera.clearViewOffset();
      // read the pixel
      renderer.readRenderTargetPixels(
        pickingTexture,
        0, // x
        0, // y
        1, // width
        1, // height
        pixelBuffer
      );

      const id =
        (pixelBuffer[0] << 0) |
        (pixelBuffer[1] << 8) |
        (pixelBuffer[2] << 16);

      return id;
    }
  }

  const pickHelper = new GPUPickHelper();

  function getCanvasRelativePosition(event) {
    const rect = canvas.getBoundingClientRect();
    return {
      x: ((event.clientX - rect.left) * canvas.width) / rect.width,
      y: ((event.clientY - rect.top) * canvas.height) / rect.height
    };
  }

  function pickCountry(event) {
    // exit if we have not loaded the data yet
    if (!countryInfos) {
      return;
    }

    const position = getCanvasRelativePosition(event);
    const id = pickHelper.pick(position, pickingScene, camera);
    if (id > 0) {
      // we clicked a country. Toggle its "selected" property
      const countryInfo = countryInfos[id - 1];
      const selected = !countryInfo.selected;
      // if we're selecting this country and modifiers are not
      // pressed unselect everything else.
      if (selected && !event.shiftKey && !event.ctrlKey && !event.metaKey) {
        unselectAllCountries();
      }
      numCountriesSelected += selected ? 1 : -1;
      countryInfo.selected = selected;
    } else if (numCountriesSelected) {
      unselectAllCountries();
    }
    requestRenderIfNotRequested();
  }

  function unselectAllCountries() {
    numCountriesSelected = 0;
    countryInfos.forEach(countryInfo => {
      countryInfo.selected = false;
    });
  }

  canvas.addEventListener("pointerup", pickCountry);

  function resizeRendererToDisplaySize(renderer) {
    const canvas = renderer.domElement;
    const width = canvas.clientWidth;
    const height = canvas.clientHeight;
    const needResize = canvas.width !== width || canvas.height !== height;
    if (needResize) {
      renderer.setSize(width, height, false);
    }
    return needResize;
  }

  let renderRequested = false;

  function render() {
    renderRequested = undefined;

    if (resizeRendererToDisplaySize(renderer)) {
      const canvas = renderer.domElement;
      camera.aspect = canvas.clientWidth / canvas.clientHeight;
      camera.updateProjectionMatrix();
    }

    controls.update();

    updateLabels();

    renderer.render(scene, camera);
  }

  render();

  function requestRenderIfNotRequested() {
    if (!renderRequested) {
      renderRequested = true;
      requestAnimationFrame(render);
    }
  }

  controls.addEventListener("change", requestRenderIfNotRequested);
  window.addEventListener("resize", requestRenderIfNotRequested);
}

main();
