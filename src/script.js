import * as THREE from "three";

const scene = new THREE.Scene();

const canvas = document.querySelector("canvas.webgl");

const sizes = {
  width: window.innerWidth,
  height: window.innerHeight,
};

// for a change in the screen size (canvas size responsive)
window.addEventListener("resize", () => {
  sizes.width = window.innerWidth;
  sizes.height = window.innerHeight;

  camera.aspect = sizes.width / sizes.height;
  camera.updateProjectionMatrix();

  renderer.setSize(sizes.width, sizes.height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2)); // to avoid blurry screen (every device has different pixel ratio so do this to have a good resolution on all devices)
});

const camera = new THREE.PerspectiveCamera(
  75,
  sizes.width / sizes.height,
  0.1,
  100
);
camera.position.z = 20;

scene.add(camera);

const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
});
renderer.setSize(sizes.width, sizes.height);

renderer.render(scene, camera);
