import React from 'react';
import PropTypes from 'prop-types';
import LoginForm from '../LoginForm/LoginForm.jsx';
import './UI.scss';
import Client from '../../client/client';
import Storage from '../../storage';

class UI extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLogged: false,
    };

    this.props.storage.on(Storage.CONNECT, () => {
      this.setState({
        isLogged: true,
      });
    });

    this.props.storage.on(Storage.DISCONNECT, () => {
      this.setState({
        isLogged: false,
      });
    });
  }

  render() {
    return (
      <div className="page-container">
        {!this.state.isLogged && <LoginForm client={this.props.client}/> }
      </div>
    );
  }
}

UI.propTypes = {
  client: PropTypes.instanceOf(Client),
  storage: PropTypes.instanceOf(Storage),
};

export default UI;
