import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App'
import TicTacToe from './TicTacToe/TicTacToe';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(
  (
  <div>
    <App heading="TicTacToe"/>
      <div>
        <TicTacToe />
      </div>
  </div>
  ), document.getElementById('root')
);
registerServiceWorker();
