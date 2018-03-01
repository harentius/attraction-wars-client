import Phaser from 'phaser';
import config from '../config';
import Player from '../player/Player';
import getPlayerData from '../player/data-provider/getPlayerData';
import getOtherPlayersData from '../player/data-provider/getOtherPlayersData';

let player;
const otherPlayers = [];
let cursors;

export default class extends Phaser.Scene {
  constructor() {
    super({ key: 'GameScene' });
  }

  preload() {
    this.load.image('background', 'assets/images/space.jpeg');
  }

  create() {
    this.add.tileSprite(...config.worldBounds, 'background');

    player = new Player(this);
    player.spawn(getPlayerData());

    getOtherPlayersData().forEach((e) => {
      const otherPlayer = new Player(this);
      otherPlayer.spawn(e);
      otherPlayers.push(otherPlayer);
    });

    cursors = this.input.keyboard.createCursorKeys();

    this.cameras.main.setSize(config.width, config.height);
    this.cameras.main.startFollow(player.circle);
    this.cameras.main.setBounds(...config.worldBounds, true, true, true, true);
  }

  update() {
    const moveStep = 20;

    if (cursors.up.isDown) {
      player.move(0, -moveStep);
    } else if (cursors.down.isDown) {
      player.move(0, moveStep);
    } else if (cursors.left.isDown) {
      player.move(-moveStep, 0);
    } else if (cursors.right.isDown) {
      player.move(moveStep, 0);
    }
  }
}
