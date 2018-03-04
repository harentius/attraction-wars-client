import Phaser from 'phaser';
import config from '../config';
import Player from '../player/Player';
import getPlayerData from '../player/data-provider/getPlayerData';
import getOtherPlayersData from '../player/data-provider/getOtherPlayersData';
import { startRotatingIfNeed } from '../player/Physics';

let player;
const otherPlayers = [];
let cursors;
let dv = { dAx: 0, dAy: 0 };

export default class extends Phaser.Scene {
  constructor() {
    super({ key: 'GameScene' });
  }

  preload() {
    this.load.image('background', 'assets/images/space.jpeg');
  }

  create() {
    this.add.tileSprite(config.worldBounds[0], config.worldBounds[1], 2 * config.worldBounds[2], 2 * config.worldBounds[3], 'background');

    getOtherPlayersData().forEach((e) => {
      const otherPlayer = new Player(this);
      otherPlayer.spawn(e, +(Math.random() * 16777215));
      otherPlayers.push(otherPlayer);
    });

    player = new Player(this);
    player.spawn(getPlayerData());

    cursors = this.input.keyboard.createCursorKeys();

    this.cameras.main.setSize(config.width, config.height);
    this.cameras.main.startFollow(player.circle);
    this.cameras.main.setBounds(...config.worldBounds, true, true, true, true);
  }

  update() {
    player.updateData();
    startRotatingIfNeed(player, otherPlayers);
    this._moveIfInput();
  }

  _moveIfInput() {
    if (cursors.up.isDown) {
      dv = { dVx: 0, dVy: -config.keyPressDv };
    } else if (cursors.down.isDown) {
      dv = { dVx: 0, dVy: config.keyPressDv };
    } else if (cursors.left.isDown) {
      dv = { dVx: -config.keyPressDv, dVy: 0 };
    } else if (cursors.right.isDown) {
      dv = { dVx: config.keyPressDv, dVy: 0 };
    }

    const isAcceleratingKeyPress = cursors.up.isDown
      || cursors.down.isDown
      || cursors.left.isDown
      || cursors.right.isDown
    ;

    if (isAcceleratingKeyPress) {
      player.changeVelocity(dv);
    } else if (!player.isStoppedX() || !player.isStoppedY()) {
      dv = {
        dVx: player.isStoppedX() ? 0 : config.releaseDv * (player.playerData.vX > 0 ? -1 : 1),
        dVy: player.isStoppedY() ? 0 : config.releaseDv * (player.playerData.vY > 0 ? -1 : 1),
      };
      player.changeVelocity(dv);
    }
  }
}
