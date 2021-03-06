import React from 'react';
import PropTypes from 'prop-types';
import Storage from 'attraction-wars-client-storage/src/Storage';
import ScoreWidget from '../Widgets/ScoreWidget/ScoreWidget.jsx';
import './InGame.scss';
import LeaderboardWidget from '../Widgets/LeaderboardWidget/LeaderboardWidget.jsx';
import MinimapWidget from '../Widgets/MiniMapWidget/MiniMapWidget.jsx';

class InGame extends React.Component {
  render() {
    return <div className="in-game">
      <div className="widgets-row">
        <div className="left-widgets-wrapper">
          <ScoreWidget storage={this.props.storage} />
        </div>

        <div>
          <LeaderboardWidget storage={this.props.storage} />
        </div>
      </div>

      <div className="widgets-row">
        <MinimapWidget storage={this.props.storage} />
      </div>
    </div>;
  }
}

InGame.propTypes = {
  storage: PropTypes.instanceOf(Storage),
};

export default InGame;
