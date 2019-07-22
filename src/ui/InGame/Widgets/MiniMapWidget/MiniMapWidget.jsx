import React from 'react';
import PropTypes from 'prop-types';
import './MiniMapWidget.scss';
import Storage from '../../../../Storage';

class MiniMapWidget extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};

    setInterval(() => {

    }, 2000);
    props.storage.on(Storage.UPDATE_SCORE, (score, size) => {
      this.setState({ score, size });
    });
  }
  render() {
    return (
      <div className="in-game-widget minimap-widget">
        <canvas>

        </canvas>
      </div>
    );
  }
}

MiniMapWidget.propTypes = {
  storage: PropTypes.instanceOf(Storage),
};

export default MiniMapWidget;
