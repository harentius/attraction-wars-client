import React from 'react';
import PropTypes from 'prop-types';
import Storage from '../../../../Storage';
import Widget from '../../../Widget/Widget.jsx';
import updateMiniMap from './services/updateMiniMap';
import './MiniMapWidget.scss';

class MiniMapWidget extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      onlineCount: props.storage.worldData.serverStatistics.onlineCount,
    };

    props.storage.on(Storage.UPDATE_SERVER_STATISTICS, (serverStatistics) => {
      this.setState({ onlineCount: serverStatistics.onlineCount });
    });
  }

  componentDidMount() {
    this.updateMiniMap();

    this.interval = setInterval(() => {
      this.updateMiniMap();
    }, 500);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
    this.props.storage.off(Storage.UPDATE_SERVER_STATISTICS);
  }

  render() {
    return (
      <Widget className="in-game-widget minimap-widget">
        <p>Online: {this.state.onlineCount}</p>
        <canvas id="minimap" className="minimap" width="300" height="300" />
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
