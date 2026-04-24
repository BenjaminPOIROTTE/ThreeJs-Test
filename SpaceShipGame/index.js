import * as THREE from "three";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import { RGBELoader } from "three/addons/loaders/RGBELoader.js";


import {skyboxGen} from "./js/skybox.js";
import { scene, camera, cameraOffset, renderer } from "./js/scene.js";
import { keys, updateMovement } from "./js/controller.js";
import { Spaceship, spaceship, spaceshipBBox, spaceshipHelper, updateProjectile, CreateProjectile,addCameraFollow,projectileMesh,projectileMeshes } from "./js/spacechip.js";

import {  LooseCondition, PrintHealth, EnemyCollision } from "./js/gamerule.js";
import { UpdateBoundingBox } from "./js/collision.js";
import { Enemy } from "./js/enemy.js";
import { updateEnemies, handleEnemyCollisions } from "./js/enemyCollision.js";

import { startEnemySpawner } from "./js/enemySpawner.js";
import { checkProjectileCollisions } from "./js/projectileCollision.js";
import { score, updateScore, PrintScore } from "./js/score.js";

import {  easyDifficulty,MediumDifficulty,hardDifficulty} from "./js/difficultyCalcul.js";
let enemies = [];
let mixer;




document.getElementById("easy").addEventListener("click", () => {
  launchGame();
  easyDifficulty();
});

document.getElementById("medium").addEventListener("click", () => {
    launchGame();

  MediumDifficulty();
});

document.getElementById("hard").addEventListener("click", () => {
  launchGame();
  hardDifficulty();
});


function launchGame(){
  document.querySelector(".hud").style.opacity = "1";
    document.getElementById("difficulty-btn").style.display = "none";
    document.getElementById("title").style.display = "none";
  init();
  animate();



}



function init() {
  skyboxGen(renderer, scene);
  Spaceship(scene);
  startEnemySpawner(scene, enemies, spaceship);
  updateScore();

}




function animate() {

  updateMovement(scene);
  updateProjectile(scene);
  UpdateBoundingBox(spaceship, spaceshipBBox, enemies);
  addCameraFollow(camera, spaceship);
  PrintHealth();
  PrintScore();
  checkProjectileCollisions(projectileMeshes, spaceship, enemies, scene);
  updateEnemies(enemies, spaceship);
   handleEnemyCollisions(scene, enemies, spaceshipBBox);
  
    renderer.render(scene, camera);
  requestAnimationFrame(animate);
    
}













