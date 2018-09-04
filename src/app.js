import Storage from './storage';
import Client from './client/client';
import startUi from './ui/startUi.jsx';

const storage = new Storage();
const client = new Client(storage);
client.connect();
startUi(client);
