import React from 'react';
import PropTypes from 'prop-types';
import '../Widget.scss';
import Storage from '../../../Storage';

class ServerStatisticsWidget extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      serverStatistics: {
        loadPercent: 0,
        maxLoadPercent: 0,
        averageLoadPercent: 0,
      },
    };

    props.storage.on(Storage.UPDATE_SERVER_STATISTICS, (serverStatistics) => {
      this.setState({ serverStatistics });
    });
  }

  componentWillUnmount() {
    this.props.storage.off(Storage.UPDATE_SERVER_STATISTICS);
  }

  render() {
    return <div className="in-game-widget server-statistics-widget">
      <p>Server Load Percent: { this.state.serverStatistics.loadPercent }</p>
      <p>Server Average Load Percent: { this.state.serverStatistics.averageLoadPercent }</p>
      <p>Server Max Load Percent: { this.state.serverStatistics.maxLoadPercent }</p>
    </div>;
  }
}

ServerStatisticsWidget.propTypes = {
  storage: PropTypes.instanceOf(Storage),
};

export default ServerStatisticsWidget;
