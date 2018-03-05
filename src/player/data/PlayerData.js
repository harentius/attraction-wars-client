class RotationData {
  constructor(x, y, R) {
    this.x = x;
    this.y = y;
    this.R = R;
  }
}

class PlayerData {
  constructor(x, y, r) {
    this.x = x;
    this.y = y;
    this.r = r;
    this.vX = 0;
    this.vY = 0;
    this.rotationData = null;
  }
}

export { RotationData, PlayerData };
