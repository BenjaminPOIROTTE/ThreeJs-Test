// Met à jour les bounding boxes du vaisseau et des ennemis
export function UpdateBoundingBox(spaceship, spaceshipBBox, enemies) {
  if (spaceship && spaceshipBBox) {
    spaceshipBBox.setFromObject(spaceship);
  }

  enemies.forEach(enemy => {
    enemy.bbox.setFromObject(enemy.mesh);
  });

}





