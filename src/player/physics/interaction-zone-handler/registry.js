import thirdInteractionZoneHandler from './third';
import defaultInteractionZoneHandler from './default';

const zoneHandlers = {
  3: thirdInteractionZoneHandler,
};

export default (zoneNumber) => {
  if (zoneHandlers[zoneNumber]) {
    return zoneHandlers[zoneNumber];
  }

  return defaultInteractionZoneHandler;
};
