//joueur
export let vie = 100;

export function getVie() {
  return vie;
}

export function setVie(value) {
  vie = value;
}

export function removeVie(amount) {
  vie -= amount;
}

//enemi
export var enemySpeed = 0.1;

export function setEnemySpeed(value) {
  enemySpeed = value;
}
export function getEnemySpeed() {
  return enemySpeed;
}




export let waveSpawn = 5; 

export function setWaveSpawn(value) {
  waveSpawn = value;
}

export function getWaveSpawn() {
  return waveSpawn;
}
    


export let speedSpawn = 2000; // 2 secondes
export function setSpeedSpawn(value) {
  speedSpawn = value;
}

export function getSpeedSpawn() {
  return speedSpawn;
}



export let colorProjectiles = 0xff0000; // rouge par défaut

export function setColorProjectiles(value) {
  colorProjectiles = value;
}

export function getColorProjectiles() {
  return colorProjectiles;
}



export let enemieKilledPoint=10;

export function setEnemieKilledPoint(value) {
  enemieKilledPoint = value;
}

export function getEnemieKilledPoint() {
  return enemieKilledPoint;
}


let playerSpeed = 0.1; // Vitesse de déplacement du joueur

export function SetPlayerSpeed(value) {
    playerSpeed = value;
}

export function GetPlayerSpeed() {
    return playerSpeed;
}