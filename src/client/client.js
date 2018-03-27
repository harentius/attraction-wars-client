import io from 'socket.io-client';
import config from '../config';

const socket = io.connect(config.serverUrl);

class Client {
  constructor(storage) {
    this.storage = storage;
  }

  connect() {
    socket.on('worldData', (data) => {
      this.storage.updateWorldData(data);
    });

    socket.on('playerData', (data) => {
      this.storage.updatePlayerData(data);
    });
  }

  sendKeysPressState(keysPressState) {
    socket.emit('keysPressState', keysPressState);
  }
}

export default Client;
