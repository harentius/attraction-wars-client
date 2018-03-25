import Storage from './storage';
import Client from './client/client';
import Game from './phaser/Game';

const storage = new Storage();
const client = new Client(storage);
client.connect();

storage.on(Storage.WORLD_DATA_CREATED, () => {
  new Game(storage, client);
});