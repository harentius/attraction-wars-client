import React from 'react';
import PropTypes from 'prop-types';
import Widget from '../Widget/Widget.jsx';
import './DeathScreen.scss';
import Feedback from '../Feedback/Feedback.jsx';

class DeathScreen extends React.Component {
  render() {
    return <div className="death-screen">
      <Widget title="Game Over" className="widget-death-screen">
        <div className="session-info">
          <p>Score: {this.props.score}</p>
          <p>Reached size: {this.props.size}</p>
        </div>

        <Feedback />

        <div className="buttons">
          <button
            type="submit"
            className="button-back-to-login"
            onClick={this.props.onBackToLogin}
          >
            Back to Login
          </button>

          <button
            type="submit"
            className="button-start-again"
            onClick={this.props.onStartGame}
          >
            Start Again
          </button>
        </div>
      </Widget>
    </div>;
  }
}

DeathScreen.propTypes = {
  score: PropTypes.number.isRequired,
  size: PropTypes.number.isRequired,
  onStartGame: PropTypes.func,
  onBackToLogin: PropTypes.func,
};

DeathScreen.defaultProps = {
  onStartGame: () => {},
  onBackToLogin: () => {},
};

export default DeathScreen;
