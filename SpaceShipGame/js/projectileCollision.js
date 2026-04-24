import * as THREE from 'three';


export function checkProjectileCollisions(projectiles, spaceship, enemies,scene) {

for (let i = projectiles.length - 1; i >= 0; i--) {
    const projectile = projectiles[i];
    const projectileBox = new THREE.Box3().setFromObject(projectile);
    
for (let j = enemies.length - 1; j >= 0; j--) {
      const enemy = enemies[j];
      if (projectileBox.intersectsBox(enemy.bbox)) {
        console.log("Collision détectée entre un projectile et un ennemi!");
          scene.remove(enemy.mesh);
        scene.remove(enemy.helper);
        enemies.splice(j, 1);

        scene.remove(projectile);
        projectiles.splice(i, 1);
        break; 
      }

    }
}
}