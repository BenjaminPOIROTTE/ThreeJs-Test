import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { RGBELoader } from 'three/addons/loaders/RGBELoader.js';
const w = window.innerWidth;
const h = window.innerHeight;
const renderer = new THREE.WebGLRenderer({antialias : true});

renderer.setSize(w,h);
document.body.appendChild(renderer.domElement);

const fov = 75;
const aspect= w/h;
const near = 0.1;
const far=1000;

const camera = new THREE.PerspectiveCamera(fov , aspect ,near ,far);
camera.position.z=2;
const scene= new THREE.Scene();
const controls = new OrbitControls( camera, renderer.domElement );

function init()
{

    //fichier HDR pour la lumiere ambiante
    const pmremGenerator = new THREE.PMREMGenerator( renderer );


    const hdriLoader = new RGBELoader()
    hdriLoader.load( 'qwantani_moon_noon_1k.hdr', function ( texture ) {
      const envMap = pmremGenerator.fromEquirectangular( texture ).texture;
      texture.dispose(); 
      scene.environment = envMap
    } );


    //skybox
    let materialArray= [];
    //charge les textures
    let texture_ft = new THREE.TextureLoader().load('xpos.png');
    let texture_bk = new THREE.TextureLoader().load('xneg.png');
    let texture_up = new THREE.TextureLoader().load('ypos.png');
    let texture_dn = new THREE.TextureLoader().load('yneg.png');
    let texture_rt = new THREE.TextureLoader().load('zpos.png');
    let texture_lf = new THREE.TextureLoader().load('zneg.png');
    //Ajoute les textures dans materialArray
    materialArray.push(new THREE.MeshBasicMaterial({map: texture_ft}));
    materialArray.push(new THREE.MeshBasicMaterial({map: texture_bk}));
    materialArray.push(new THREE.MeshBasicMaterial({map: texture_up}));
    materialArray.push(new THREE.MeshBasicMaterial({map: texture_dn}));
    materialArray.push(new THREE.MeshBasicMaterial({map: texture_rt}));
    materialArray.push(new THREE.MeshBasicMaterial({map: texture_lf}));
    //inverse le sens des texture pour que ce sois a l'interieur du cube
    for(let i=0;i<6;i++)
    {
        materialArray[i].side = THREE.BackSide;
    }

    let skyboxGeo = new THREE.BoxGeometry(100,100,100);
    let skybox = new THREE.Mesh(skyboxGeo,materialArray);

    
scene.add(skybox);


}



function animate() {
    
renderer.render(scene, camera);

requestAnimationFrame(animate);

}

let mixer;

function Mog() {
    const loader = new GLTFLoader();
    loader.load('mog.glb', (gltf) => {
        const model = gltf.scene;
        scene.add(model);

     

        // Créer un AnimationMixer et jouer l'animation par défaut (première animation)
        if (gltf.animations && gltf.animations.length > 0) {
            mixer = new THREE.AnimationMixer(model);  // Créer un mixer pour ce modèle
            const action = mixer.clipAction(gltf.animations[0]);  // Jouer la première animation disponible
            action.play();  // Démarrer l'animation
        }

    }, undefined, (error) => {
        console.error('Une erreur est survenue lors du chargement du modèle:', error);
    });
}


animate();
init();
Mog();



