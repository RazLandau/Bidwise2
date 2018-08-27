import axios from 'axios';
import { wixAxiosConfig } from 'wix-axios-config';
import { baseURL } from './test-common';
import 'jsdom-global/register';

wixAxiosConfig(axios, { baseURL });
