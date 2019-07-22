const drawObject = (x, y, r, ctx) => {
  ctx.beginPath();
  ctx.arc(x, y, r, 0, 2 * Math.PI);
  ctx.fill();
};

const drawObjectsCollection = (objects, sclaleX, sclaleY, scaleSize, color, ctx) => {
  ctx.fillStyle = color;

  for (const object of Object.values(objects)) {
    drawObject(
      object.x * sclaleX,
      object.y * sclaleY,
      object.r * scaleSize,
      ctx,
    );
  }
};

const drawCurrentPlayer = (object, sclaleX, sclaleY, scaleSize, color, ctx) => {
  const x = object.x * sclaleX;
  const y = object.y * sclaleY;
  const r = object.r * scaleSize;

  ctx.fillStyle = color;
  drawObject(x, y, r, ctx);

  ctx.strokeStyle = color;
  ctx.beginPath();
  ctx.arc(x, y, r * 4, 0, 2 * Math.PI);
  ctx.stroke();
};

const updateMiniMap = (canvas, worldData, playerData) => {
  const ctx = canvas.getContext('2d');
  const worldWidth = worldData.worldBounds[2] - worldData.worldBounds[0];
  const worldHeight = worldData.worldBounds[3] - worldData.worldBounds[1];
  const sclaleX = canvas.width / worldWidth;
  const sclaleY = canvas.height / worldHeight;
  const scaleSize = 2.5 * sclaleX;

  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawObjectsCollection(worldData.asteroidsData, sclaleX, sclaleY, scaleSize, 'white', ctx);
  drawObjectsCollection(worldData.playersData, sclaleX, sclaleY, scaleSize, 'blue', ctx);
  drawCurrentPlayer(playerData, sclaleX, sclaleY, scaleSize, 'red', ctx);
};

export default updateMiniMap;
