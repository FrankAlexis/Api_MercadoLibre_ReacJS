import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import {App, NASA} from './App';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(
  <div>
    <App />
    <NASA />
  </div>,
  document.getElementById('root')
);
registerServiceWorker();
