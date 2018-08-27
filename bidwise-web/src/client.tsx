import * as React from 'react';
import * as ReactDOM from 'react-dom';
import * as axios from 'axios';
import { wixAxiosConfig } from 'wix-axios-config';
import App from './components/App';

const baseURL = window.__BASEURL__;

wixAxiosConfig(axios, { baseURL });

ReactDOM.render(<App />, document.getElementById('root'));
