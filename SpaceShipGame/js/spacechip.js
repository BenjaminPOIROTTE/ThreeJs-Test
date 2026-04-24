import {getColorProjectiles} from "./difficultyconf.js";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";
import * as THREE from "three";

export const cameraOffset = new THREE.Vector3(0, 5, -10);

export let spaceship = null;

 export let spaceshipBBox;
export let spaceshipHelper;



export let projectileMeshes = [];
export let projectileMesh;
export let projectile;




export function Spaceship(scene) {
  const loader = new GLTFLoader();
  loader.load(
    "Spaceship.glb",
    (gltf) => {
      spaceship = gltf.scene;

      scene.add(spaceship);
      spaceship.scale.set(0.2, 0.2,0.2);
      //Bounding box pour le vaisseau
      spaceshipBBox = new THREE.Box3().setFromObject(spaceship);
      spaceshipHelper = new THREE.Box3Helper(spaceshipBBox, 0x00ff00);
      scene.add(spaceshipHelper);
      

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



export function addCameraFollow(camera, spaceship) {
  if (!spaceship) return;

  // Offset caméra transformé selon la rotation du vaisseau
  const offset = cameraOffset.clone();
  offset.applyQuaternion(spaceship.quaternion);

  // Position de la caméra
  const targetPosition = spaceship.position.clone().add(offset);

  // Lissage du mouvement de la caméra
  camera.position.lerp(targetPosition, 0.1);


  camera.fov = 75;

  // La caméra regarde le vaisseau
  camera.lookAt(spaceship.position);
}





export function CreateProjectile(scene) {
  let geometry = new THREE.SphereGeometry(0.2, 16, 16);
  let material = new THREE.MeshBasicMaterial({ color: getColorProjectiles() });

  projectile = new THREE.Mesh(geometry, material);

  const direction = new THREE.Vector3(0, 0,0);



  // Applique la rotation du vaisseau à la direction
  direction.applyQuaternion(spaceship.quaternion);
// Positionne le projectile devant le vaisseau
  projectile.position
    .copy(spaceship.position)
    .addScaledVector(direction,0.1);



      projectile.userData.life = 0;
  scene.add(projectile);
  projectileMeshes.push(projectile);


}

export function updateProjectile(scene, delta = 1) {
  for (let i = projectileMeshes.length - 1; i >= 0; i--) {
    const p = projectileMeshes[i];

    const direction = new THREE.Vector3(0, 0, 1);
    direction.applyQuaternion(spaceship.quaternion);

    p.position.addScaledVector(direction, 5);

    p.userData.life += delta;

    if (p.userData.life > 60) {
      scene.remove(p);
      projectileMeshes.splice(i, 1);
    }
  }
}