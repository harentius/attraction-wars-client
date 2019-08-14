const serverUrl = SERVER_URL || 'http://localhost:4000';

export default {
  serverUrl,
  width: window.innerWidth,
  height: window.innerHeight,
  localStorageName: 'attraction-wars',
  maxVisibleSize: 150,
  minVisibleSize: 50,
  minZoom: 0.4,
  maxZoom: 1.4,
  zoomChange: 0.2,
};
