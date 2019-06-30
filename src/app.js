import './style.scss';
import Storage from './Storage';
import Client from './client/Client';
import startUi from './ui/startUi.jsx';

const storage = new Storage();
const client = new Client(storage);
startUi(client, storage);
