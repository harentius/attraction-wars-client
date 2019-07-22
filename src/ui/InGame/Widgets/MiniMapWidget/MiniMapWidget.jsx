import React from 'react';
import PropTypes from 'prop-types';
import Storage from '../../../../Storage';
import Widget from '../../../Widget/Widget.jsx';
import updateMiniMap from './services/updateMiniMap';

class MiniMapWidget extends React.Component {
  componentDidMount() {
    this.updateMiniMap();

    this.interval = setInterval(() => {
      this.updateMiniMap();
    }, 500);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  render() {
    return (
      <Widget title="Mini Map" className="in-game-widget minimap-widget">
        <canvas id="minimap" width="300" height="300" />
      </Widget>
    );
  }

  updateMiniMap() {
    const canvas = document.getElementById('minimap');
    const { worldData, playerData } = this.props.storage;
    updateMiniMap(canvas, worldData, playerData);
  }
}

MiniMapWidget.propTypes = {
  storage: PropTypes.instanceOf(Storage),
};

export default MiniMapWidget;
