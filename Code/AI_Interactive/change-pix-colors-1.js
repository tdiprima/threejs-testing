// const IMAGE = "https://threejs.org/examples/textures/uv_grid_opengl.jpg";
    const IMAGE = "https://threejs.org/examples/textures/uv_grid_opengl.jpg";

    // Set up the scene, camera and renderer
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 5;

    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);

    // Load the image texture
    const textureLoader = new THREE.TextureLoader();
    textureLoader.load(IMAGE, (texture) => {
      const material = new THREE.MeshBasicMaterial({ map: texture });
      const geometry = new THREE.PlaneGeometry(2, 2);
      const mesh = new THREE.Mesh(geometry, material);
      scene.add(mesh);
    });

    // Handle mouse move event to change pixel colors
    window.addEventListener('mousemove', (event) => {
      const mouse = new THREE.Vector2(
        (event.clientX / window.innerWidth) * 2 - 1,
        -(event.clientY / window.innerHeight) * 2 + 1
      );
      const raycaster = new THREE.Raycaster();
      raycaster.setFromCamera(mouse, camera);
      const intersects = raycaster.intersectObjects(scene.children, true);
      if (intersects.length > 0) {
        const face = intersects[0].face;
        const mesh = intersects[0].object;
        const uv = face.uv;
        const texture = mesh.material.map;
        const pixelBuffer = new Uint8Array(4);
        texture.image.onload = () => {
          const canvas = document.createElement('canvas');
          canvas.width = texture.image.width;
          canvas.height = texture.image.height;
          const context = canvas.getContext('2d');
          context.drawImage(texture.image, 0, 0);
          const pixelData = context.getImageData(uv.x * texture.image.width, uv.y * texture.image.height, 1, 1);
          const color = new THREE.Color(`rgb(${pixelData.data[0]}, ${pixelData.data[1]}, ${pixelData.data[2]})`);
          color.offsetHSL(0, 0.5, 0);
          pixelData.data[0] = color.r * 255;
          pixelData.data[1] = color.g * 255;
          pixelData.data[2] = color.b * 255;
          context.putImageData(pixelData, uv.x * texture.image.width, uv.y * texture.image.height);
          texture.image.src = canvas.toDataURL();
          texture.needsUpdate = true;
        };
      }
    });

    // Render the scene
    const animate = () => {
      requestAnimationFrame(animate);
      renderer.render(scene, camera);
    };
    animate();
