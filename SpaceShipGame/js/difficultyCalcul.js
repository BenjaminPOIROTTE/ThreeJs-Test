import { setColorProjectiles,setEnemySpeed,setSpeedSpawn,setVie,setWaveSpawn,getColorProjectiles,getEnemySpeed,getSpeedSpawn, getVie,getWaveSpawn,setEnemieKilledPoint, getEnemieKilledPoint, SetPlayerSpeed } from "./difficultyconf.js";
import { getScore, getScoreMultiplier, setScoreMultiplier } from "./score.js";




export function easyDifficulty() {
    setEnemySpeed(0.05);
    setSpeedSpawn(3000);
    setVie(150);
    setWaveSpawn(6);
    setColorProjectiles(0x00ff00);
    SetPlayerSpeed(0.7);
    setScoreMultiplier(1.1);
    setEnemieKilledPoint(100);
}


export function MediumDifficulty() {
    setEnemySpeed(0.07);
    setSpeedSpawn(3000);
    setVie(100);
    setWaveSpawn(9);
    setColorProjectiles(0x00ff00);
    setScoreMultiplier(1.25);
    setEnemieKilledPoint(200);
    SetPlayerSpeed(1.1);
}

export function hardDifficulty() {
    setEnemySpeed(0.1);
    setSpeedSpawn(2500);
    setVie(70);
    setWaveSpawn(12);
    setColorProjectiles(0x0000ff);
    setScoreMultiplier(1.5);
    setEnemieKilledPoint(500);
    SetPlayerSpeed(1.3);
}

