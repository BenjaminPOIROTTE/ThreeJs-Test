import { EnemyCollision } from "./gamerule.js";

export function updateEnemies(enemies, spaceship) {
  enemies.forEach(enemy => {
    enemy.update(spaceship.position);
  });
}

export function handleEnemyCollisions(scene, enemies, spaceshipBBox) {
  if (!spaceshipBBox) return;

  for (let i = enemies.length - 1; i >= 0; i--) {
    const enemy = enemies[i];

    //si un enemie touche on lance les degats et detruit l'enemie
    if (spaceshipBBox.intersectsBox(enemy.bbox)) {

      EnemyCollision(scene, enemy, enemies, i);
    }
  }
}