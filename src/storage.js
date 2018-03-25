class Storage {
  static get PLAYER_DATA_CREATED() { return 'player_data_created'; }
  static get WORLD_DATA_CREATED() { return 'world_data_created'; }

  constructor(worldData = {}, playerData = {}) {
    this.worldData = worldData;
    this.playerData = playerData;
    this._playerId = null;
    this._events = {};
  }

  updateWorldData(worldData) {
    if (Object.keys(this.worldData).length === 0 && Object.keys(worldData).length !== 0) {
      this.trigger(Storage.WORLD_DATA_CREATED);
    }

    Object.assign(this.worldData, worldData);
    Object.assign(this.playerData, worldData.playersData[this._playerId]);
  }

  updatePlayerData(playerData) {
    if (Object.keys(this.playerData).length === 0 && Object.keys(playerData).length !== 0) {
      this.trigger(Storage.PLAYER_DATA_CREATED);
    }

    Object.assign(this.playerData, playerData);
    this._playerId = playerData.id;
  }

  on(event, callback) {
    if (typeof this._events[event] === 'undefined') {
      this._events[event] = [];
    }

    this._events[event].push(callback);

    return this;
  }

  trigger(event, data) {
    if (typeof this._events[event] === 'undefined') {
      return;
    }

    for (const callback of this._events[event]) {
      callback.call(data);
    }
  }
}

export default Storage;
