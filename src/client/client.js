import io from 'socket.io-client';
import config from '../config';
import Game from '../phaser/Game';

class Client {
  constructor(storage) {
    this.socket = null;
    this.storage = storage;
    this.game = null;
  }

  connect() {
    this.socket = io.connect(config.serverUrl);
    this.socket.on('worldData', (data) => {
      this.storage.updateWorldData(data);
    });

    this.socket.on('playerData', (data) => {
      console.log(`Logged as ${data.username}`);
      this.storage.updatePlayerData(data);
      this.game = new Game(this.storage, this);
    });

    this.socket.on('disconnect', (data) => {
      this.disconnect();
    });
  }

  disconnect() {
    this.game.destroy(true);
  }

  sendKeysPressState(keysPressState) {
    this.socket.emit('keysPressState', keysPressState);
  }

  login(username) {
    this.connect();
    this.socket.emit('login', username);
  }
}

export default Client;
