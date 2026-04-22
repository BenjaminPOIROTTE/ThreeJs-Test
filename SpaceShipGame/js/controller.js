import * as THREE from "three";
import { spaceship } from "./spacechip.js";
import { CreateProjectile, updateProjectile } from "./spacechip.js";






// Gestion des touches pour le contrôle du vaisseau
export const keys = {
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
  if (e.key === "Shift") keys.turnleft = true;
  if (e.key === "1") keys.turnright = true;
  if (e.key === "!") keys.accelerate = true;
  if (e.key === "2") keys.shoot = true;
});

document.addEventListener("keyup", (e) => {
  if (e.key === "ArrowUp") keys.forward = false;
  if (e.key === "ArrowDown") keys.backward = false;
  if (e.key === "ArrowLeft") keys.left = false;
  if (e.key === "ArrowRight") keys.right = false;
  if (e.key === "Shift") keys.turnleft = false;
  if (e.key === "1") keys.turnright = false;
  if (e.key === "!") keys.accelerate = false;
  if (e.key === "2") keys.shoot = false;

});





export function updateMovement(scene) {
    if (!spaceship) return;

  const direction = new THREE.Vector3(0, 0, 1);
  direction.applyQuaternion(spaceship.quaternion);

  spaceship.position.addScaledVector(direction, 0.1);

  if (keys.forward) spaceship.rotation.x += 0.01;
  if (keys.backward) spaceship.rotation.x -= 0.01;
  if (keys.left) spaceship.rotation.z += 0.03;
  if (keys.right) spaceship.rotation.z -= 0.03;
  if (keys.turnleft) spaceship.rotation.y += 0.03;
  if (keys.turnright) spaceship.rotation.y -= 0.03;

  if (keys.accelerate) {
    spaceship.position.addScaledVector(direction, 0.3);
  }

    if (keys.shoot) {
    CreateProjectile(scene);
  }
}



export function updateShooting() {


  updateProjectile();
}
