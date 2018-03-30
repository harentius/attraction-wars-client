import Phaser from 'phaser';

class Player {
  constructor(scene) {
    this.scene = scene;
    this.graphics = null;
    this.circle = null;
    this.playerData = null;
  }

  spawn(playerData) {
    this.playerData = playerData;
    this.circle = new Phaser.Geom.Circle(playerData.x, playerData.y, playerData.r);
    this.graphics = this.scene.add.graphics({ fillStyle: { color: playerData.color } });
    this.graphics.fillCircleShape(this.circle);
  }

  redraw() {
    this.circle.x = this.playerData.x;
    this.circle.y = this.playerData.y;
    this.graphics.clear();
    this.graphics.fillCircleShape(this.circle);
  }
}

export default Player;
