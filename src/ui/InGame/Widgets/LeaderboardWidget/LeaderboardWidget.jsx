import React from 'react';
import PropTypes from 'prop-types';
import Storage from '../../../../Storage';
import getLeaderboard from './services/getLeaderboard';
import './LeaderboardWidget.scss';
import Widget from '../../../Widget/Widget.jsx';

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
    }, 2000);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  render() {
    return (
      <Widget title="Leaderboard" className="leaderboard-widget">
        <table>
          <tbody>
            {this.state.leaderboard.map((p) =>
              <tr className={`player ${p.isCurrentPlayer ? 'current-player' : ''}`} key={p.position}>
                <td className="player-position">{p.position}</td>
                <td className="player-name">{p.username}</td>
                <td className="player-score">{p.score}</td>
              </tr>,
            )}
          </tbody>
        </table>
      </Widget>
    );
  }
}

LeaderboardWidget.propTypes = {
  storage: PropTypes.instanceOf(Storage),
};

export default LeaderboardWidget;
