document.addEventListener("DOMContentLoaded", function () {
  let progress = 0;
  let progressBar = document.getElementById("progress-bar");
  let progressText = document.getElementById("progress-text");

  let interval = setInterval(() => {
    progress += Math.random() * 7;
    if (progress >= 100) {
      progress = 100;
      clearInterval(interval);
      document.getElementById("loading-screen").style.display = "none";
      document.getElementById("main-content").style.display = "block";
    }
    progressBar.style.width = progress + "%";
    progressText.innerText = Math.floor(progress) + "%";
  }, 350);

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(75, 1, 0.1, 1000);
  const renderer = new THREE.WebGLRenderer({ alpha: true });

  renderer.setSize(200, 200);
  document.getElementById("skin-viewer").appendChild(renderer.domElement);

  const texture = new THREE.TextureLoader().load("assets/steve-skin.png");

  function createBox(w, h, d, x, y, z, tx, ty, tw, th) {
    const geometry = new THREE.BoxGeometry(w, h, d);
    const materials = [];

    for (let i = 0; i < 6; i++) {
      materials.push(
        new THREE.MeshBasicMaterial({
          map: texture,
          transparent: true,
        })
      );
    }

    const box = new THREE.Mesh(geometry, materials);
    box.position.set(x, y, z);
    return box;
  }

  const head = createBox(8, 8, 8, 0, 12, 0);
  const body = createBox(8, 12, 4, 0, 2, 0);
  const leftArm = createBox(4, 12, 4, -6, 2, 0);
  const rightArm = createBox(4, 12, 4, 6, 2, 0);
  const leftLeg = createBox(4, 12, 4, -2, -10, 0);
  const rightLeg = createBox(4, 12, 4, 2, -10, 0);

  const player = new THREE.Group();
  player.add(head, body, leftArm, rightArm, leftLeg, rightLeg);
  scene.add(player);

  camera.position.z = 30;

  function animate() {
    requestAnimationFrame(animate);
    player.rotation.y += 0.02;
    renderer.render(scene, camera);
  }
  animate();
});

document.getElementById("play-button").addEventListener("click", function () {
  window.location.href = "start-minecraft.bat";
});
