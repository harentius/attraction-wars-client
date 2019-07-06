import React from 'react';
import PropTypes from 'prop-types';
import Storage from '../../../../Storage';
import getLeaderboard from './services/getLeaderboard';

class LeaderboardWidget extends React.Component {
  constructor(props) {
    super(props);
    const { storage } = this.props;

    this.state = {
      leaderboard: getLeaderboard(storage.playerData, storage.worldData.playersData),
    };

    this.interval = setInterval(() => {
      this.setState({
        leaderboard: getLeaderboard(storage.playerData, storage.worldData.playersData),
      });
    }, 10000);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  render() {
    return <div className="in-game-widget leaderboard-widget">
      <h4>Leaderboard</h4>
      {this.state.leaderboard.map((i) =>
        <p key={i.position}>{i.position}. {i.username}</p>,
      )}
    </div>;
  }
}

LeaderboardWidget.propTypes = {
  storage: PropTypes.instanceOf(Storage),
};

export default LeaderboardWidget;
