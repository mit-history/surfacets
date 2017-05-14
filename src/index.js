import React from 'react';
import ReactDOM from 'react-dom';
import App from './app';
import { Provider } from 'react-redux'
import { createStore } from 'redux'
import surfacetsApp from './reducers/index';
import './index.css';

let store = createStore(surfacetsApp);

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);
