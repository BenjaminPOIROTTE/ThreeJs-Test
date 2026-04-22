import * as THREE from "three";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import { RGBELoader } from "three/addons/loaders/RGBELoader.js";


import {skyboxGen} from "./js/skybox.js";
import { scene, camera, cameraOffset, renderer } from "./js/scene.js";
import { keys, updateMovement } from "./js/controller.js";
import { Spaceship, spaceship, spaceshipBBox, spaceshipHelper, updateProjectile, CreateProjectile,addCameraFollow } from "./js/spacechip.js";

import { vie, LooseCondition, PrintHealth, EnemyCollision } from "./js/gamerule.js";
import { UpdateBoundingBox } from "./js/collision.js";
import { Enemy } from "./js/enemy.js";
import { updateEnemies, handleEnemyCollisions } from "./js/enemyCollision.js";

import { startEnemySpawner } from "./js/enemySpawner.js";


let enemies = [];
let mixer;




function init() {
  skyboxGen(renderer, scene);
  Spaceship(scene);
  startEnemySpawner(scene, enemies, spaceship);
}





function animate() {
  updateMovement(scene);
  updateProjectile(scene);
  UpdateBoundingBox(spaceship, spaceshipBBox, enemies);
  addCameraFollow(camera, spaceship);
  PrintHealth();

  updateEnemies(enemies, spaceship);
   handleEnemyCollisions(scene, enemies, spaceshipBBox);


    renderer.render(scene, camera);
  requestAnimationFrame(animate);
  
}













init();
animate();
