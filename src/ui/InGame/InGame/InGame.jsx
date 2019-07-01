import React from 'react';
import PropTypes from 'prop-types';
import ScoreWidget from '../Widgets/ScoreWidget.jsx';
import ServerStatisticsWidget from '../Widgets/ServerStatisticsWidget.jsx';
import Storage from '../../../Storage';
import './InGame.scss';
import LeaderboardWidget from '../Widgets/LeaderboardWidget/LeaderboardWidget.jsx';

class InGame extends React.Component {
  render() {
    return <div className="in-game">
      <div className="left-widgets-wrapper">
        <ScoreWidget storage={this.props.storage}/>
        <ServerStatisticsWidget storage={this.props.storage}/>
      </div>

      <div>
        <LeaderboardWidget storage={this.props.storage}/>
      </div>
    </div>;
  }
}

InGame.propTypes = {
  storage: PropTypes.instanceOf(Storage),
};

export default InGame;
