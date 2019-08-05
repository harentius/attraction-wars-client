import React from 'react';
import PropTypes from 'prop-types';
import LoginForm from '../LoginForm/LoginForm.jsx';
import './UI.scss';
import Client from '../../client/Client';
import InGame from '../InGame/InGame/InGame.jsx';
import Storage from '../../Storage';
import Tutorial from '../Tutorial/Tutorial.jsx';

class UI extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLogged: false,
      isTutorial: false,
      name: '',
    };

    this.props.storage.on(Storage.CONNECT, () => {
      this.setState({
        isLogged: true,
      });
    });

    this.props.storage.on(Storage.DISCONNECT, () => {
      this.setState({
        isLogged: false,
        isTutorial: false,
      });
    });
    this.onLoginFormSubmit = this.onLoginFormSubmit.bind(this);
    this.startGame = this.startGame.bind(this);
  }

  onLoginFormSubmit({ name, showTutorial }) {
    this.setState({ name });

    if (showTutorial) {
      this.setState({ isTutorial: showTutorial });
    } else {
      this.startGame();
    }
  }

  startGame() {
    this.props.client.login(this.state.name);
  }

  render() {
    return (
      <div className="page-container">
        { !this.state.isLogged && !this.state.isTutorial &&
          <LoginForm client={this.props.client} onSubmit={this.onLoginFormSubmit} />
        }

        { this.state.isTutorial && !this.state.isLogged &&
          <Tutorial onStartGame={this.startGame}/>
        }

        { this.state.isLogged &&
          <InGame storage={this.props.storage}/>
        }
      </div>
    );
  }
}

UI.propTypes = {
  client: PropTypes.instanceOf(Client),
  storage: PropTypes.instanceOf(Storage),
};

export default UI;
