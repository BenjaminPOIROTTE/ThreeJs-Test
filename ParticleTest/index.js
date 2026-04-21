import * as THREE from "three";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";
//Creation fenetre
const w = window.innerWidth;
const h = window.innerHeight;
const renderer = new THREE.WebGLRenderer({antialias : true});
renderer.setSize(w,h);
document.body.appendChild(renderer.domElement);

//Creation camera

const fov = 75;
const aspect= w/h;
const near = 0.1;
const far=10;

const camera = new THREE.PerspectiveCamera(fov , aspect ,near ,far);
camera.position.z=2;



//Creation scene
const scene= new THREE.Scene();

let model3d = null;
const geo = new THREE.SphereGeometry(1,32,32);




//Material
const mat = new THREE.MeshBasicMaterial({
  color: 0x00000,
  transparent: true,
  opacity: 0.5,
  depthWrite: false
});


const matBall = new THREE.MeshBasicMaterial({
  color: 0xf56042,
  transparent: true,
  opacity: 0.3,
  depthWrite: false
});

const particlesMaterial = new THREE.PointsMaterial({
    size: 0.02,
    sizeAttenuation: true
})

const particles = new THREE.Points(geo, particlesMaterial)
scene.add(particles)



const mesh = new THREE.Mesh(geo,mat);
scene.add(mesh);





//chargement model 3d
function loadmodel3d() {
  const loader = new GLTFLoader();
  loader.load(
    "pokeball.glb",
    (gltf) => {
      model3d = gltf.scene;
      scene.add(model3d);
model3d.traverse((child) => {
  if (child.isMesh) {
    child.material = matBall;
  }
});

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


function animate(t=0){
    requestAnimationFrame(animate);
    particles.rotation.y = t * 0.0005;

    model3d.scale.setScalar(Math.cos(t*0.001)+0.015);
    

    renderer.render(scene,camera); 
}


loadmodel3d();
animate();
