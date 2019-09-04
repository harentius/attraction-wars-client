import io from 'socket.io-client';
import parser from 'socket.io-msgpack-parser';
import config from '../config';
import Game from '../phaser/Game';

class Client {
  constructor(storage) {
    this.socket = null;
    this.storage = storage;
    this.game = null;
  }

  connect() {
    this.socket = io(config.serverUrl, { parser, transports: ['websocket'] });

    this.socket.on('fullWorldData', (data) => {
      this.storage.updateWorldData(data, true);

      this.socket.on('worldData', (data1) => {
        this.storage.updateWorldData(data1);
      });
    });

    this.socket.on('playerData', (data) => {
      console.log(`Logged as ${data.username}`);
      this.storage.updatePlayerData(data);
      this.game = new Game(this.storage, this);
    });

    this.socket.on('asteroidData', (data) => {
      this.storage.updateAsteroidData(data);
    });

    this.socket.on('serverStatisticsData', (data) => {
      this.storage.updateServerStatisticsData(data);
    });

    this.socket.on('disconnect', () => {
      this.disconnect();
    });
  }

  disconnect() {
    this.game.destroy(true);
    console.log('Log out');
    this.storage.refresh();
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
