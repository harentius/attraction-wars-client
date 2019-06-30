import React from 'react';
import PropTypes from 'prop-types';
import ScoreWidget from '../Widgets/ScoreWidget.jsx';
import ServerStatisticsWidget from '../Widgets/ServerStatisticsWidget.jsx';
import Storage from '../../../Storage';
import './InGame.scss';

class InGame extends React.Component {
  render() {
    return <div className="in-game">
      <ScoreWidget storage={this.props.storage}/>
      <ServerStatisticsWidget storage={this.props.storage}/>
    </div>;
  }
}

InGame.propTypes = {
  storage: PropTypes.instanceOf(Storage),
};

export default InGame;
