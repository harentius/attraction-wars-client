import './style.scss';
import Storage from './client/Storage';
import Client from './client/Client';
import startUi from './ui/startUi.jsx';
import config from './config';
import Game from './phaser/Game';

const storage = new Storage();
const client = new Client(storage, config.serverUrl);
let game;

startUi(client, storage);

storage.on(Storage.PLAYER_DATA_RECEIVED, (playerData) => {
  if (playerData.r * storage.zoom > config.maxVisibleSize
    && storage.zoom - config.zoomChange >= config.minZoom
  ) {
    storage.setZoom(storage.zoom - config.zoomChange);
  }

  if (playerData.r * storage.zoom < config.minVisibleSize
    && storage.zoom + config.zoomChange <= config.maxZoom
  ) {
    storage.setZoom(storage.zoom + config.zoomChange);
  }
});

storage.on(Storage.CONNECT, () => {
  game = new Game(storage, client);
});

storage.on(Storage.DISCONNECT, () => {
  if (game) {
    game.destroy(true);
    game = null;
  }
});
