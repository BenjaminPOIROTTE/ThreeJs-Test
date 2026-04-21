import * as THREE from "three";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import { RGBELoader } from "three/addons/loaders/RGBELoader.js";

const w = window.innerWidth;
const h = window.innerHeight;
const renderer = new THREE.WebGLRenderer({ antialias: true });

renderer.setSize(w, h);
document.body.appendChild(renderer.domElement);

const fov = 75;
const aspect = w / h;
const near = 0.1;
const far = 1000;

var camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
camera.position.z = -10;
const scene = new THREE.Scene();
camera.lookAt(scene.position);
let spaceship = null;
const cameraOffset = new THREE.Vector3(0, 5, -10);
let projectileMeshes = [];
let projectileMesh;
let projectile;


let spaceshipBBox;
let spaceshipHelper;

let vie = 100;

let enemies = [];
let mixer;












function init() {
  skyboxGen();
  Spaceship();


}



// Gestion des touches pour le contrôle du vaisseau
const keys = {
  forward: false,
  backward: false,
  left: false,
  right: false,
  accelerate: false,
  shoot: false,
};

document.addEventListener("keydown", (e) => {
  if (e.key === "ArrowUp") keys.forward = true;
  if (e.key === "ArrowDown") keys.backward = true;
  if (e.key === "ArrowLeft") keys.left = true;
  if (e.key === "ArrowRight") keys.right = true;
  if (e.key === "Shift") keys.turnleft = true;
  if (e.key === "1") keys.turnright = true;
  if (e.key === "!") keys.accelerate = true;
  if (e.key === "2") keys.shoot = true;
});

document.addEventListener("keyup", (e) => {
  if (e.key === "ArrowUp") keys.forward = false;
  if (e.key === "ArrowDown") keys.backward = false;
  if (e.key === "ArrowLeft") keys.left = false;
  if (e.key === "ArrowRight") keys.right = false;
  if (e.key === "Shift") keys.turnleft = false;
  if (e.key === "1") keys.turnright = false;
  if (e.key === "!") keys.accelerate = false;
  if (e.key === "2") keys.shoot = false;

});




function Spaceship() {
  const loader = new GLTFLoader();
  loader.load(
    "Spaceship.glb",
    (gltf) => {
      spaceship = gltf.scene;

      scene.add(spaceship);

      //Bounding box pour le vaisseau
      spaceshipBBox = new THREE.Box3().setFromObject(spaceship);
      spaceshipHelper = new THREE.Box3Helper(spaceshipBBox, 0x00ff00);
      scene.add(spaceshipHelper);
      
    },
    undefined,
    (error) => {
      console.error(
        "Une erreur est survenue lors du chargement du modèle:",
        error,
      );
    },
  );
  
}



function skyboxGen() {
  //fichier HDR pour la lumiere ambiante
  const pmremGenerator = new THREE.PMREMGenerator(renderer);

  const hdriLoader = new RGBELoader();
  hdriLoader.load("moonless_golf_1k.hdr", function (texture) {
    const envMap = pmremGenerator.fromEquirectangular(texture).texture;
    texture.dispose();
    scene.environment = envMap;
  });

  //skybox
  let materialArray = [];
  //charge les textures
  let texture_ft = new THREE.TextureLoader().load("./Skybox/back.png");
  let texture_bk = new THREE.TextureLoader().load("./Skybox/front.png");
  let texture_up = new THREE.TextureLoader().load("./Skybox/back.png");
  let texture_dn = new THREE.TextureLoader().load("./Skybox/bottom.png");
  let texture_rt = new THREE.TextureLoader().load("./Skybox/right.png");
  let texture_lf = new THREE.TextureLoader().load("./Skybox/left.png");
  //Ajoute les textures dans materialArray
  materialArray.push(new THREE.MeshBasicMaterial({ map: texture_ft }));
  materialArray.push(new THREE.MeshBasicMaterial({ map: texture_bk }));
  materialArray.push(new THREE.MeshBasicMaterial({ map: texture_up }));
  materialArray.push(new THREE.MeshBasicMaterial({ map: texture_dn }));
  materialArray.push(new THREE.MeshBasicMaterial({ map: texture_rt }));
  materialArray.push(new THREE.MeshBasicMaterial({ map: texture_lf }));

  //inverse le sens des texture pour que ce sois a l'interieur du cube
  for (let i = 0; i < 6; i++) {
    materialArray[i].side = THREE.BackSide;
  }

  let skyboxGeo = new THREE.BoxGeometry(1000, 1000, 1000);
  let skybox = new THREE.Mesh(skyboxGeo, materialArray);

  scene.add(skybox);
}


function addCameraFollow() {
  if (!spaceship) return;

  // Offset caméra transformé selon la rotation du vaisseau
  const offset = cameraOffset.clone();
  offset.applyQuaternion(spaceship.quaternion);

  // Position de la caméra
  const targetPosition = spaceship.position.clone().add(offset);

  // Lissage du mouvement de la caméra
  camera.position.lerp(targetPosition, 0.1);


  camera.fov = 75;

  // La caméra regarde le vaisseau
  camera.lookAt(spaceship.position);
}

function CreateProjectile() {
  let geometry = new THREE.SphereGeometry(0.2, 16, 16);
  let material = new THREE.MeshBasicMaterial({ color: 0xff0000 });

  projectile = new THREE.Mesh(geometry, material);

  const direction = new THREE.Vector3(0, 0, 4);
  // Applique la rotation du vaisseau à la direction
  direction.applyQuaternion(spaceship.quaternion);
// Positionne le projectile devant le vaisseau
  projectile.position
    .copy(spaceship.position)
    .addScaledVector(direction,1);

  scene.add(projectile);
  projectileMeshes.push(projectile);


}

function updateProjectile() {
   projectileMeshes.forEach((projectile, index) => {


    const direction = new THREE.Vector3(0, 0, 1);
    direction.applyQuaternion(spaceship.quaternion);
    projectile.position.addScaledVector(direction, 5);
    setTimeout(() => {
      scene.remove(projectile);
      projectileMeshes.splice(index, 1);
    }, 800);
    
	});
}




class Enemy {
   constructor(scene) {
    this.scene = scene;

    const geometry = new THREE.BoxGeometry(2, 2, 2);
    const material = new THREE.MeshStandardMaterial({ color: 0xff0000 });
      


    this.mesh = new THREE.Mesh(geometry, material);

    this.mesh.position.set(
      (Math.random() - 0.5) * 200,
      (Math.random() - 0.5) * 101,
      -50
    );

    this.speed = 0.05;
    // 🔥 Bounding box
    this.bbox = new THREE.Box3().setFromObject(this.mesh);

    // 🔍 Helper (debug visuel)
    this.helper = new THREE.Box3Helper(this.bbox, 0x00ff00);
    scene.add(this.helper);

    scene.add(this.mesh);
  
  }

  
  update(targetPosition) {
    const dir = new THREE.Vector3()
      .subVectors(targetPosition, this.mesh.position)
      .normalize();

    this.mesh.position.addScaledVector(dir, this.speed);
  }
}


// Génération d'ennemis toutes les 2 secondes
setInterval(() => {
  if (spaceship && enemies.length < 5) {
    for (let i = 0; i < 5; i++) {
       enemies.push(new Enemy(scene));
    console.log("Enemy added");
    }
   
  }
}, 2000);



// Met à jour les bounding boxes du vaisseau et des ennemis
function UpdateBoundingBox() {
  if (spaceship && spaceshipBBox) {
    spaceshipBBox.setFromObject(spaceship);
  }

  enemies.forEach(enemy => {
    enemy.bbox.setFromObject(enemy.mesh);
  });

}



function PrintHealth() {
  const healthElement = document.getElementById("health");
  healthElement.textContent = `VIE: ${vie}`;
}


function EnemyCollision(enemy, index) {
      
  vie -= 10;

  // enlever de la scène
  scene.remove(enemy.mesh);
  scene.remove(enemy.helper);

  // supprimer du tableau
  enemies.splice(index, 1);
    LooseCondition();
    }



function LooseCondition() {

  if (vie <= 0) {
    console.log("Game Over! vie: " + vie);
    
    }
  }













function animate() {
  if (spaceship) {
          const direction = new THREE.Vector3(0, 0, 1);

       direction.applyQuaternion(spaceship.quaternion);
      spaceship.position.addScaledVector(direction, 0.1);
    if (keys.forward) spaceship.rotation.x += 0.01;
    if (keys.backward) spaceship.rotation.x -= 0.01;
    if (keys.left) spaceship.rotation.z += 0.03;
    if (keys.right) spaceship.rotation.z -= 0.03;
    if (keys.turnleft) spaceship.rotation.y += 0.03;
    if (keys.turnright) spaceship.rotation.y -= 0.03;
    if (keys.accelerate) {
     
      direction.applyQuaternion(spaceship.quaternion);
      spaceship.position.addScaledVector(direction, 0.3);
    }
    if (keys.shoot) {
      CreateProjectile()
  }
  updateProjectile();
  UpdateBoundingBox();
  addCameraFollow();
  PrintHealth();
  //collision avec les ennemis
if (spaceshipBBox) {
  for (let i = enemies.length - 1; i >= 0; i--) {
    const enemy = enemies[i];

    if (spaceshipBBox.intersectsBox(enemy.bbox)) {
      EnemyCollision(enemy, i);
    }
  }
}




//update de la position des ennemis
enemies.forEach(enemy => {
  enemy.update(spaceship.position);
});
}


    renderer.render(scene, camera);
  requestAnimationFrame(animate);
  
}













init();
animate();
