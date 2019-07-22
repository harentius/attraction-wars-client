import React from 'react';
import PropTypes from 'prop-types';
import './ServerStatisticsWidget.scss';
import Storage from '../../../../Storage';
import Widget from '../../../Widget/Widget.jsx';

class ServerStatisticsWidget extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      serverStatistics: {
        loadPercent: 0,
        maxLoadPercent: 0,
        averageLoadPercent: 0,
        onlineCount: 0,
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
    return (
      <Widget className="server-statistics-widget" title="Server Statistics">
        <p>Online Players: { this.state.serverStatistics.onlineCount }</p>
        <p>Server Load: { this.state.serverStatistics.loadPercent }%</p>
        <p>Server Average Load: { this.state.serverStatistics.averageLoadPercent }%</p>
        <p>Server Max Load: { this.state.serverStatistics.maxLoadPercent }%</p>
      </Widget>
    );
  }
}

ServerStatisticsWidget.propTypes = {
  storage: PropTypes.instanceOf(Storage),
};

export default ServerStatisticsWidget;
