import {getVie,setVie} from "./difficultyconf.js";



export function LooseCondition() {

  if (getVie() <= 0) {
   
    }
  }

export function PrintHealth() {
  const healthElement = document.getElementById("health");
  healthElement.textContent = `VIE: ${getVie()}`;
}


export function EnemyCollision(scene,enemy,enemies, index) {
      
  setVie(getVie() - 10);

  // enlever de la scène
  scene.remove(enemy.mesh);
  scene.remove(enemy.helper);

  // supprimer du tableau
  enemies.splice(index, 1);
    LooseCondition();
}



