import { baseURL } from './test-common';
import * as jsdomGlobal from 'jsdom-global';

jsdomGlobal(undefined, {
  url: baseURL,
});
