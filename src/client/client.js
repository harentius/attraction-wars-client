import io from 'socket.io-client';
import config from '../config';
import Game from '../phaser/Game';

class Client {
  constructor(storage) {
    this.socket = null;
    this.storage = storage;
  }

  connect() {
    this.socket = io.connect(config.serverUrl);
    this.socket.on('worldData', (data) => {
      this.storage.updateWorldData(data);
    });

    this.socket.on('playerData', (data) => {
      console.log(`Logged as ${data.username}`);
      this.storage.updatePlayerData(data);
      new Game(this.storage, this);
    });
  }

  sendKeysPressState(keysPressState) {
    this.socket.emit('keysPressState', keysPressState);
  }

  login(username) {
    this.socket.emit('login', username);
  }
}

export default Client;
