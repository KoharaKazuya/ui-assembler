import React from 'react';
import { render } from 'react-dom';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import reducers from './reducers';
import App from './components/App';

const store = createStore(reducers);

const appElem = document.querySelector('#app');
render(
  <Provider store={ store }>
    <App />
  </Provider>,
  appElem
);
