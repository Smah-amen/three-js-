import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

const canvas = document.querySelector('canvas.webgl');
const scene = new THREE.Scene();

const cubeTextureLoader = new THREE.CubeTextureLoader();
const environmentMap = cubeTextureLoader.load([
  './Standard-Cube-Map/px.png',
  './Standard-Cube-Map/nx.png',
  './Standard-Cube-Map/py.png',
  './Standard-Cube-Map/ny.png',
  './Standard-Cube-Map/pz.png',
  './Standard-Cube-Map/nz.png',
]);

environmentMap.magFilter = THREE.LinearFilter;
environmentMap.minFilter = THREE.LinearMipMapLinearFilter;
environmentMap.generateMipmaps = true;
environmentMap.encoding = THREE.sRGBEncoding;

scene.background = environmentMap;
scene.environment = environmentMap;

const sizes = {
  width: window.innerWidth,
  height: window.innerHeight,
};

const camera = new THREE.PerspectiveCamera(
  75,
  sizes.width / sizes.height,
  0.1,
  100
);
camera.position.set(40, 40, 40);
scene.add(camera);


const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;


const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
  antialias: true,
});
renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(window.devicePixelRatio);
renderer.outputEncoding = THREE.sRGBEncoding;


window.addEventListener('resize', () => {
  sizes.width = window.innerWidth;
  sizes.height = window.innerHeight;

  camera.aspect = sizes.width / sizes.height;
  camera.updateProjectionMatrix();

  renderer.setSize(sizes.width, sizes.height);
  renderer.setPixelRatio(window.devicePixelRatio); 
  // renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
// both lines above are valid, to reduce pixelation on high DPI screens 

});

// const sphere = new THREE.Mesh(
//   new THREE.SphereGeometry(5, 64, 64),
//   new THREE.MeshStandardMaterial({
//     envMap: environmentMap,
//     metalness: 1,
//     roughness: 0,
//   })
// );
// scene.add(sphere);

const light = new THREE.AmbientLight(0xffffff, 1);
scene.add(light);


const tick = () => {
  controls.update();
  renderer.render(scene, camera);
  requestAnimationFrame(tick);
};
tick();
