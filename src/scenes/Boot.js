import Phaser from 'phaser';
import config from '../config';

export default class extends Phaser.Scene {
  constructor() {
    super({ key: 'BootScene' });
  }

  create() {
    const text = this.add.text(100, 100, 'Booting...', { fontSize: 72 });
    const zone = this.add.zone(config.width / 2, config.height / 2, config.width, config.height);
    Phaser.Display.Align.In.Center(text, zone);
    this.scene.start('GameScene');
  }
}
