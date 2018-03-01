import Phaser from 'phaser';
import config from '../config';
import Player from '../player/Player';
import getPlayerData from '../player/data-provider/getPlayerData';
import getOtherPlayersData from '../player/data-provider/getOtherPlayersData';

let player;
const otherPlayers = [];
let cursors;
let isAccelerating = false;
let accelerationValue = { dAx: 0, dAy: 0 };

export default class extends Phaser.Scene {
  constructor() {
    super({ key: 'GameScene' });
  }

  preload() {
    this.load.image('background', 'assets/images/space.jpeg');
  }

  create() {
    this.add.tileSprite(config.worldBounds[0], config.worldBounds[1], 2 * config.worldBounds[2], 2 * config.worldBounds[3], 'background');

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
    const keyPressDa = 0.2;
    player.updateData();

    if (cursors.up.isDown) {
      accelerationValue = { dAx: 0, dAy: -keyPressDa };
    } else if (cursors.down.isDown) {
      accelerationValue = { dAx: 0, dAy: keyPressDa };
    } else if (cursors.left.isDown) {
      accelerationValue = { dAx: -keyPressDa, dAy: 0 };
    } else if (cursors.right.isDown) {
      accelerationValue = { dAx: keyPressDa, dAy: 0 };
    }

    const isAcceleratingKeyPress = cursors.up.isDown
      || cursors.down.isDown
      || cursors.left.isDown
      || cursors.right.isDown
    ;

    if (isAcceleratingKeyPress && !isAccelerating) {
      isAccelerating = true;
      player.accelerate(accelerationValue);
    } else if (isAccelerating) {
      // Stop acceleration by inverting acceleration
      isAccelerating = false;
      accelerationValue = { dAx: accelerationValue.dAx * -1, dAy: accelerationValue.dAy * -1 };
      player.accelerate(accelerationValue);
    }
  }
}
