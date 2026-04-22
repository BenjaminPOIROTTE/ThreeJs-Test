

export let vie = 100;


export function LooseCondition() {

  if (vie <= 0) {
    console.log("Game Over! vie: " + vie);
    
    }
  }

export function PrintHealth() {
  const healthElement = document.getElementById("health");
  healthElement.textContent = `VIE: ${vie}`;
}


export function EnemyCollision(scene,enemy,enemies, index) {
      
  vie -= 10;

  // enlever de la scène
  scene.remove(enemy.mesh);
  scene.remove(enemy.helper);

  // supprimer du tableau
  enemies.splice(index, 1);
    LooseCondition();
}



export function damage(amount) {
  vie -= amount;
}