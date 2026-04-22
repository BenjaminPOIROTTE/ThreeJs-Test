import * as THREE from "three";


export class Enemy {
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

    this.speed = 0.5;
    this.bbox = new THREE.Box3().setFromObject(this.mesh);
//debug
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



