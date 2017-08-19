import React from 'react';
import ReactDOM from 'react-dom';
import App from './app';
import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'
import surfacetsApp from './reducers/index';
import './index.css';
import thunk from 'redux-thunk'

let store = createStore(surfacetsApp,
  applyMiddleware(thunk));

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);
