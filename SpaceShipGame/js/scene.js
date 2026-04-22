import * as THREE from "three";


const w = window.innerWidth;
const h = window.innerHeight;
export const renderer = new THREE.WebGLRenderer({ antialias: true });

renderer.setSize(w, h);
document.body.appendChild(renderer.domElement);

export const fov = 75;
export const aspect = w / h;
export const near = 0.1;
export const far = 1000;

export var camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
camera.position.z = -10;
export const scene = new THREE.Scene();
camera.lookAt(scene.position);
export const cameraOffset = new THREE.Vector3(0, 5, -10);
