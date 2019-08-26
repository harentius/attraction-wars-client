import React from 'react';
import PropTypes from 'prop-types';
import Storage from '../../../../Storage';
import './ScoreWidget.scss';
import Widget from '../../../Widget/Widget.jsx';

class ScoreWidget extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      score: 0,
      size: 0,
    };

    props.storage.on(Storage.UPDATE_SCORE, (oldScore, score, size) => {
      this.setState({ score, size });
    });
  }

  componentWillUnmount() {
    this.props.storage.off(Storage.UPDATE_SCORE);
  }

  render() {
    return (
      <Widget title={`Score ${this.state.score}`} className="score-widget">
        <p>Size: { this.state.size }</p>
      </Widget>
    );
  }
}

ScoreWidget.propTypes = {
  storage: PropTypes.instanceOf(Storage),
};


export default ScoreWidget;
