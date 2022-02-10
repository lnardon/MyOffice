// IMPORTS
import * as THREE from "https://cdn.jsdelivr.net/npm/three@0.118/build/three.module.js";
import { OrbitControls } from "https://cdn.jsdelivr.net/npm/three@0.118/examples/jsm/controls/OrbitControls.js";

//SCENE
const scene = new THREE.Scene();

//RENDERER
const renderer = new THREE.WebGLRenderer({
  canvas: document.getElementById("canvas"),
  antialias: true,
});
renderer.setClearColor(0x070707);
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);

//CAMERA
const camera = new THREE.PerspectiveCamera(
  70,
  window.innerWidth / window.innerHeight,
  0.1,
  3000
);
camera.position.x = 50;
camera.position.y = 75;
camera.position.z = 50;

window.addEventListener(
  "resize",
  function () {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
  },
  false
);

// CONTROLS
const controls = new OrbitControls(camera, renderer.domElement);

//LIGHTS
const light1 = new THREE.AmbientLight(0xfffaff, 0.7);
const light2 = new THREE.SpotLight(0xfffaaf, 1);
light2.position.set(-40, 20, 0);
light2.castShadow = true;
light2.shadow.mapSize.width = 1024;
light2.shadow.mapSize.height = 1024;
light2.shadow.camera.near = 0.1;
light2.shadow.camera.far = 3000;
light2.shadow.camera.fov = 70;
light2.angle = -Math.PI / 4;
light2.penumbra = 1;
light2.decay = 0;
light2.distance = 3000;
light2.rotation.z = Math.PI / 2;
scene.add(light1);
scene.add(light2);

//OBJECT
const geometry = new THREE.BoxGeometry(20, 5, 20);
const material = new THREE.MeshLambertMaterial({ color: 0xfafafa });
const square = new THREE.Mesh(geometry, material);
scene.add(square);

function render() {
  controls.update();
  renderer.render(scene, camera);
  requestAnimationFrame(render);
}

render();
