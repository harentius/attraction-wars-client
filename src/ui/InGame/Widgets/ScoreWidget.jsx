import React from 'react';
import PropTypes from 'prop-types';
import '../Widget.scss';
import Storage from '../../../Storage';

class ScoreWidget extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      score: 0,
    };

    props.storage.on(Storage.UPDATE_SCORE, (score) => {
      this.setState({ score });
    });
  }

  componentWillUnmount() {
    this.props.storage.off(Storage.UPDATE_SCORE);
  }

  render() {
    return <div className="in-game-widget score-widget">
      Score: { this.state.score }
    </div>;
  }
}

ScoreWidget.propTypes = {
  storage: PropTypes.instanceOf(Storage),
};


export default ScoreWidget;
