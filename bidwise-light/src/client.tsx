import * as React from 'react';
import * as ReactDOM from 'react-dom';
import * as axios from 'axios';
import { wixAxiosConfig } from 'wix-axios-config';
import { Provider } from 'react-redux';
import App from './components/App';
import configureStore from './store/configureStore';

const baseURL = window.__BASEURL__;

wixAxiosConfig(axios, { baseURL });

const store = configureStore({});

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root'),
);
