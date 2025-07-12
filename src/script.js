import * as THREE from 'three';


const scene = new THREE.Scene();

const canvas = document.querySelector("canvas.webgl");

const sizes = {
  width:window.innerWidth,
  height:window.innerHeight
}

const camera = new THREE.PerspectiveCamera (
  75 ,
  sizes.width / sizes.height ,
  0.1 ,
  100
 ) ;
 camera.position.z = 20;

 scene.add(camera);

const renderer = new THREE.WebGLRenderer()
renderer.setSize(sizes.width, sizes.height);

renderer.render(scene, camera);

 
