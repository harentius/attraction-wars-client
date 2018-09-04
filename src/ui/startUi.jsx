import React from 'react';
import ReactDOM from 'react-dom';
import App from './App.jsx';

const startUi = (client) => {
  const mountNode = document.getElementById('ui-app');
  ReactDOM.render(<App client={client}/>, mountNode);
};

export default startUi;
