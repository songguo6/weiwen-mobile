import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

import { UALProvider } from 'ual-reactjs-renderer';
import { TokenPocket } from 'ual-token-pocket';

import { appName, network } from './api/config';

const chain = {
  chainId: network.chainId,
  rpcEndpoints: [
    {
      protocol: network.protocol,
      host: network.host,
      port: network.port,
    },
  ],
}

const supportedChains = [chain];
const supportedAuthenticators = [new TokenPocket([chain])];

ReactDOM.render(
  <UALProvider chains={supportedChains} authenticators={supportedAuthenticators} appName={appName}>
      <App />
  </UALProvider>, 
  document.getElementById('root')
);
