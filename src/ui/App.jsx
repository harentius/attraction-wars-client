import React from 'react';
import PropTypes from 'prop-types';
import LoginForm from './LoginForm/LoginForm.jsx';
import Client from '../client/client';

function App(props) {
  return <LoginForm client={props.client} />;
}

App.propTypes = {
  client: PropTypes.instanceOf(Client),
};

export default App;
