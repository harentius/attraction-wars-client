import React from 'react';
import PropTypes from 'prop-types';
import Storage from '../../../../Storage';
import '../../Widget.scss';
import './ScoreWidget.scss';

class ScoreWidget extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      score: 0,
      size: 0,
    };

    props.storage.on(Storage.UPDATE_SCORE, (score, size) => {
      this.setState({ score, size });
    });
  }

  componentWillUnmount() {
    this.props.storage.off(Storage.UPDATE_SCORE);
  }

  render() {
    return <div className="in-game-widget score-widget">
      <p className="score">Score: { this.state.score }</p>
      <p>Size: { this.state.size }</p>
    </div>;
  }
}

ScoreWidget.propTypes = {
  storage: PropTypes.instanceOf(Storage),
};


export default ScoreWidget;
