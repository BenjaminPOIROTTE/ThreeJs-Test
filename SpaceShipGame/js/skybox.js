import * as THREE from "three";
import { RGBELoader } from "three/addons/loaders/RGBELoader.js";

export function skyboxGen(renderer, scene) {
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
  let texture_up = new THREE.TextureLoader().load("./Skybox/bottom.png");//le haut et le bas sont inversé dans les textures
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