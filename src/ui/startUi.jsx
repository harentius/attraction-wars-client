import React from 'react';
import ReactDOM from 'react-dom';
import App from './App.jsx';

const startUi = (client, storage) => {
  const mountNode = document.getElementById('ui-app');
  ReactDOM.render(<App client={client} storage={storage}/>, mountNode);
};

export default startUi;
