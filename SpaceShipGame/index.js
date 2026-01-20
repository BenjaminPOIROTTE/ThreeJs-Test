import * as THREE from "three";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import { RGBELoader } from "three/addons/loaders/RGBELoader.js";

const w = window.innerWidth;
const h = window.innerHeight;
const renderer = new THREE.WebGLRenderer({ antialias: true });

renderer.setSize(w, h);
document.body.appendChild(renderer.domElement);

const fov = 75;
const aspect = w / h;
const near = 0.1;
const far = 1000;

var camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
camera.position.z = -10;
const scene = new THREE.Scene();
camera.lookAt(scene.position);
let spaceship = null;
const cameraOffset = new THREE.Vector3(0, 3, -10);
let projectileMeshes = [];
let projectileMesh;
let projectile;

function init() {
  skyboxGen();
  Spaceship();
}

const keys = {
  forward: false,
  backward: false,
  left: false,
  right: false,
  accelerate: false,
  shoot: false,
};

document.addEventListener("keydown", (e) => {
  if (e.key === "ArrowUp") keys.forward = true;
  if (e.key === "ArrowDown") keys.backward = true;
  if (e.key === "ArrowLeft") keys.left = true;
  if (e.key === "ArrowRight") keys.right = true;
  if (e.key === "c") keys.accelerate = true;
  if (e.key === "x") keys.shoot = true;
});

document.addEventListener("keyup", (e) => {
  if (e.key === "ArrowUp") keys.forward = false;
  if (e.key === "ArrowDown") keys.backward = false;
  if (e.key === "ArrowLeft") keys.left = false;
  if (e.key === "ArrowRight") keys.right = false;
  if (e.key === "c") keys.accelerate = false;
  if (e.key === "x") keys.shoot = false;

});

let mixer;

function Spaceship() {
  const loader = new GLTFLoader();
  loader.load(
    "Spaceship.glb",
    (gltf) => {
      spaceship = gltf.scene;

      scene.add(spaceship);
    },
    undefined,
    (error) => {
      console.error(
        "Une erreur est survenue lors du chargement du modèle:",
        error,
      );
    },
  );
}

function skyboxGen() {
  //fichier HDR pour la lumiere ambiante
  const pmremGenerator = new THREE.PMREMGenerator(renderer);

  const hdriLoader = new RGBELoader();
  hdriLoader.load("moonless_golf_1k.hdr", function (texture) {
    const envMap = pmremGenerator.fromEquirectangular(texture).texture;
    texture.dispose();
    scene.environment = envMap;
  });

  //skybox
  let materialArray = [];
  //charge les textures
  let texture_ft = new THREE.TextureLoader().load("./Skybox/back.png");
  let texture_bk = new THREE.TextureLoader().load("./Skybox/front.png");
  let texture_up = new THREE.TextureLoader().load("./Skybox/back.png");
  let texture_dn = new THREE.TextureLoader().load("./Skybox/bottom.png");
  let texture_rt = new THREE.TextureLoader().load("./Skybox/right.png");
  let texture_lf = new THREE.TextureLoader().load("./Skybox/left.png");
  //Ajoute les textures dans materialArray
  materialArray.push(new THREE.MeshBasicMaterial({ map: texture_ft }));
  materialArray.push(new THREE.MeshBasicMaterial({ map: texture_bk }));
  materialArray.push(new THREE.MeshBasicMaterial({ map: texture_up }));
  materialArray.push(new THREE.MeshBasicMaterial({ map: texture_dn }));
  materialArray.push(new THREE.MeshBasicMaterial({ map: texture_rt }));
  materialArray.push(new THREE.MeshBasicMaterial({ map: texture_lf }));

  //inverse le sens des texture pour que ce sois a l'interieur du cube
  for (let i = 0; i < 6; i++) {
    materialArray[i].side = THREE.BackSide;
  }

  let skyboxGeo = new THREE.BoxGeometry(1000, 1000, 1000);
  let skybox = new THREE.Mesh(skyboxGeo, materialArray);

  scene.add(skybox);
}

function animate() {
  if (spaceship) {
    if (keys.forward) spaceship.rotation.x += 0.01;
    if (keys.backward) spaceship.rotation.x -= 0.01;
    if (keys.left) spaceship.rotation.z += 0.03;
    if (keys.right) spaceship.rotation.z -= 0.03;
    if (keys.accelerate) {
      const direction = new THREE.Vector3(0, 0, 1);
      direction.applyQuaternion(spaceship.quaternion);
      spaceship.position.addScaledVector(direction, 0.2);
    }
    if (keys.shoot) {
      CreateProjectile()
  }

  addCameraFollow();

}


    renderer.render(scene, camera);
  requestAnimationFrame(animate);
}

function addCameraFollow() {
  if (!spaceship) return;

  // Offset caméra transformé selon la rotation du vaisseau
  const offset = cameraOffset.clone();
  offset.applyQuaternion(spaceship.quaternion);

  // Position de la caméra
  const targetPosition = spaceship.position.clone().add(offset);

  // Lissage du mouvement de la caméra
  camera.position.lerp(targetPosition, 0.1);

  // La caméra regarde le vaisseau
  camera.lookAt(spaceship.position);
}

function CreateProjectile() {
  let geometry = new THREE.SphereGeometry(0.2, 16, 16);
  let material = new THREE.MeshBasicMaterial({ color: 0xff0000 });

  projectile = new THREE.Mesh(geometry, material);

  const direction = new THREE.Vector3(0, 0, 4);
  direction.applyQuaternion(spaceship.quaternion);

  projectile.position
    .copy(spaceship.position)
    .addScaledVector(direction, 2);

  scene.add(projectile);
  projectileMeshes.push(projectile);


}

function updateProjectile() {
   projectileMeshes.forEach((projectile, index) => {
		projectile.position.z -= 0.5;
		if(projectile.position.z < -20){
			scene.remove(projectile);
			projectileMeshes.splice(index, 1);
		  }
	});
}
init();
animate();
