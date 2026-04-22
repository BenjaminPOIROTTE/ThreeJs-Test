import { Enemy } from "./enemy.js";

export function startEnemySpawner(scene, enemies, spaceship) {

  setInterval(() => {

    if (enemies.length < 5) {
      for (let i = 0; i < 5; i++) {
        enemies.push(new Enemy(scene));
      }
      console.log("Enemies spawned");
    }

  }, 2000);
}