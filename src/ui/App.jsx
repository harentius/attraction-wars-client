import React from 'react';
import PropTypes from 'prop-types';
import Client from 'attraction-wars-client-storage/src/Client';
import Storage from 'attraction-wars-client-storage/src/Storage';
import UI from './UI/UI.jsx';

const App = (props) => <UI client={props.client} storage={props.storage} />;

App.propTypes = {
  client: PropTypes.instanceOf(Client),
  storage: PropTypes.instanceOf(Storage),
};

export default App;
