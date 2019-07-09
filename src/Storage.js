class Storage {
  static get PLAYER_DATA_CREATED() { return 'player_data_created'; }
  static get WORLD_DATA_CREATED() { return 'world_data_created'; }
  static get CONNECT() { return 'connect'; }
  static get DISCONNECT() { return 'disconnect'; }
  static get UPDATE_SCORE() { return 'update_score'; }
  static get UPDATE_SERVER_STATISTICS() { return 'update_server_statistics'; }

  constructor() {
    this.refresh();
    this._events = {};
  }

  refresh(
    worldData = {
      playersData: {},
      asteroidsData: {},
      worldBounds: [],
      relativeZonesSizes: [],
      asteroidAttractionRadiusMultiplier: 1.0,
      serverStatistics: {},
    },
    playerData = {},
  ) {
    if (this._playerId) {
      this.trigger(Storage.DISCONNECT);
    }

    this.worldData = worldData;
    this.playerData = playerData;
    this._playerId = null;
    this.isConnected = false;
  }

  updateWorldData(worldData) {
    const isCreated = Object.keys(this.worldData.playersData).length === 0
      && Object.keys(worldData).length !== 0
    ;
    // Can be moved to some kind of init event and send only once
    this.worldData.worldBounds = worldData.worldBounds;
    this.worldData.relativeZonesSizes = worldData.relativeZonesSizes;
    this.worldData.asteroidAttractionRadiusMultiplier
      = worldData.asteroidAttractionRadiusMultiplier
    ;

    // Players Data sync
    for (const key of Object.keys(worldData.playersData)) {
      if (this.worldData.playersData[key]) {
        Object.assign(this.worldData.playersData[key], worldData.playersData[key]);
      } else {
        this.worldData.playersData[key] = worldData.playersData[key];
      }
    }

    for (const key of Object.keys(this.worldData.playersData)) {
      if (!worldData.playersData[key]) {
        delete this.worldData.playersData[key];
      }
    }

    // Current player data sync
    if (worldData.playersData[this._playerId]) {
      const newScore = Math.round(worldData.playersData[this._playerId].score);

      if (this.playerData.score !== newScore) {
        this.trigger(Storage.UPDATE_SCORE, [
          newScore,
          Math.round(worldData.playersData[this._playerId].r),
        ]);
      }
    }

    Object.assign(this.playerData, worldData.playersData[this._playerId]);

    // Asteroids Data sync
    for (const key of Object.keys(worldData.asteroidsData)) {
      if (this.worldData.asteroidsData[key]) {
        Object.assign(this.worldData.asteroidsData[key], worldData.asteroidsData[key]);
      } else {
        this.worldData.asteroidsData[key] = worldData.asteroidsData[key];
      }
    }

    for (const key of Object.keys(this.worldData.asteroidsData)) {
      if (!worldData.asteroidsData[key]) {
        delete this.worldData.asteroidsData[key];
      }
    }

    // Server Statistics sync
    if (JSON.stringify(this.worldData.serverStatistics)
      !== JSON.stringify(worldData.serverStatistics)
    ) {
      this.trigger(Storage.UPDATE_SERVER_STATISTICS, [worldData.serverStatistics]);
      this.worldData.serverStatistics = worldData.serverStatistics;
    }

    if (isCreated) {
      this.trigger(Storage.WORLD_DATA_CREATED);
    }

    this._checkConnected();
  }

  updatePlayerData(playerData) {
    const isConnected = Object.keys(this.playerData).length === 0
      && Object.keys(playerData).length !== 0
    ;

    Object.assign(this.playerData, playerData);
    this._playerId = playerData.id;

    if (isConnected) {
      this.trigger(Storage.PLAYER_DATA_CREATED);
    }

    this._checkConnected();
  }

  on(event, callback) {
    if (typeof this._events[event] === 'undefined') {
      this._events[event] = [];
    }

    this._events[event].push(callback);

    return this;
  }

  off(event) {
    if (typeof this._events[event] === 'undefined') {
      return;
    }

    this._events[event] = [];
  }

  trigger(event, data) {
    if (typeof this._events[event] === 'undefined') {
      return;
    }

    for (const callback of this._events[event]) {
      callback.apply(this, data);
    }
  }

  _checkConnected() {
    if (!this.isConnected
      && Object.keys(this.worldData.playersData).length > 0
      && this._playerId
      && this.worldData.playersData[this._playerId]
    ) {
      this.isConnected = true;
      this.trigger(Storage.CONNECT);
    }
  }
}

export default Storage;
