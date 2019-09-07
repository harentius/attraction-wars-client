import io from 'socket.io-client';
import parser from 'socket.io-msgpack-parser';
import config from '../config';
import Game from '../phaser/Game';
import Storage from './Storage';

class Client {
  constructor(storage) {
    this.socket = null;
    this.storage = storage;
    this.game = null;
  }

  sendKeysPressState(keysPressState) {
    this.socket.emit('keysPressState', keysPressState);
  }

  login(username) {
    if (this.socket) {
      return;
    }

    this._connect();
    this.socket.emit('login', username);
  }

  _connect() {
    this.socket = io(config.serverUrl, {
      parser,
      transports: ['websocket'],
      reconnection: false,
      timeout: 1500,
    });

    const handleConnectionError = () => {
      if (this.game) {
        this.game.destroy(true);
      }

      this.storage.refresh();
      this.socket = null;
      this.storage.trigger(Storage.NOTIFICATION, [{
        type: 'error',
        message: 'Server Connection Error. Please try again later',
      }]);
    };

    this.socket.on('connect_error', () => {
      handleConnectionError();
    });
    this.socket.on('connect_timeout', () => {
      handleConnectionError();
    });

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
      this._disconnect();
    });

    this.socket.on('notification', (data) => {
      this.storage.trigger(Storage.NOTIFICATION, [data]);
    });
  }

  _disconnect() {
    this.game.destroy(true);
    console.log('Log out');
    this.storage.refresh();
    this.socket = null;
  }
}

export default Client;
