import { Enemy } from "./enemy.js";
import { getSpeedSpawn, getWaveSpawn } from "./difficultyconf.js";

export function startEnemySpawner(scene, enemies, spaceship) {

  setInterval(() => {

    if (enemies.length < getWaveSpawn()) {
      for (let i = 0; i < getWaveSpawn(); i++) {
        enemies.push(new Enemy(scene));
      }
    }

  }, getSpeedSpawn());
}