import React from 'react';
import PropTypes from 'prop-types';
import Client from 'attraction-wars-client-storage/src/Client';
import Storage from 'attraction-wars-client-storage/src/Storage';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import LoginForm from '../LoginForm/LoginForm.jsx';
import './UI.scss';
import InGame from '../InGame/InGame/InGame.jsx';
import Tutorial from '../Tutorial/Tutorial.jsx';
import DeathScreen from '../DeathScreen/DeathScreen.jsx';

class UI extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLogged: false,
      isTutorial: false,
      isDeathScreen: false,
      deathScreenData: {
        score: 0,
        size: 0,
      },
      name: '',
    };

    this.props.storage.on(Storage.CONNECT, () => {
      this.setState({
        isLogged: true,
        isDeathScreen: false,
      });
    });

    this.props.storage.on(Storage.DISCONNECT, (playerData) => {
      this.setState({
        isLogged: false,
        isTutorial: false,
        isDeathScreen: true,
        deathScreenData: {
          score: playerData.score,
          size: playerData.r,
        },
      });
    });

    this.props.storage.on(Storage.NOTIFICATION, (data) => {
      toast(data.message, {
        type: data.type,
      });
    });

    this.onLoginFormSubmit = this.onLoginFormSubmit.bind(this);
    this.startGame = this.startGame.bind(this);
    this.backToLogin = this.backToLogin.bind(this);
  }

  onLoginFormSubmit({ name, showTutorial }) {
    if (showTutorial) {
      this.setState({
        name,
        isTutorial: showTutorial,
      });
    } else {
      this.setState({ name }, () => this.startGame());
    }
  }

  startGame() {
    this.props.client.login(this.state.name);
  }

  backToLogin() {
    this.setState({
      isLogged: false,
      isTutorial: false,
      isDeathScreen: false,
    });
  }

  render() {
    return (
      <div className="page-container">
        <ToastContainer />
        { this.state.isDeathScreen &&
          <DeathScreen
            onStartGame={this.startGame}
            onBackToLogin={this.backToLogin}
            {...this.state.deathScreenData}
          />
        }

        { !this.state.isDeathScreen && !this.state.isLogged && !this.state.isTutorial &&
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
