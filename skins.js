let scene, camera, renderer, player;

function initSkinViewer() {
  scene = new THREE.Scene();
  camera = new THREE.PerspectiveCamera(75, 1, 0.1, 1000);
  renderer = new THREE.WebGLRenderer({ alpha: true });

  renderer.setSize(200, 200);
  document.getElementById("skin-viewer").appendChild(renderer.domElement);

  const texture = new THREE.TextureLoader().load("assets/default-skin.png");

  function createBox(w, h, d, x, y, z) {
    const geometry = new THREE.BoxGeometry(w, h, d);
    const material = new THREE.MeshBasicMaterial({ map: texture });
    const box = new THREE.Mesh(geometry, material);
    box.position.set(x, y, z);
    return box;
  }

  player = new THREE.Group();
  player.add(createBox(8, 8, 8, 0, 12, 0)); // Голова
  player.add(createBox(8, 12, 4, 0, 2, 0)); // Тело
  player.add(createBox(4, 12, 4, -6, 2, 0)); // Левая рука
  player.add(createBox(4, 12, 4, 6, 2, 0)); // Правая рука
  player.add(createBox(4, 12, 4, -2, -10, 0)); // Левая нога
  player.add(createBox(4, 12, 4, 2, -10, 0)); // Правая нога

  scene.add(player);
  camera.position.z = 30;

  function animate() {
    requestAnimationFrame(animate);
    player.rotation.y += 0.02;
    renderer.render(scene, camera);
  }
  animate();
}

function applySkin() {
  const fileInput = document.getElementById("skin-upload");
  if (fileInput.files.length > 0) {
    const file = fileInput.files[0];
    const reader = new FileReader();
    reader.onload = function (e) {
      const texture = new THREE.TextureLoader().load(e.target.result);
      player.children.forEach((part) => {
        part.material.map = texture;
        part.material.needsUpdate = true;
      });
    };
    reader.readAsDataURL(file);
  }
}

window.onload = initSkinViewer;
