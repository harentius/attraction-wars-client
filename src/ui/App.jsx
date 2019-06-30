import React from 'react';
import PropTypes from 'prop-types';
import Client from '../client/Client';
import UI from './UI/UI.jsx';
import Storage from '../Storage';

const App = (props) => <UI client={props.client} storage={props.storage} />;

App.propTypes = {
  client: PropTypes.instanceOf(Client),
  storage: PropTypes.instanceOf(Storage),
};

export default App;
