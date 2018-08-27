import App, { AppProps } from './App';
import { BaseDriver } from '../../../test/lib/base-driver';

export class AppDriver extends BaseDriver<AppProps> {
  when = {
    created: () => this.render(App),
  };
  get = {
    title: () => this.getByDataHook('title').text(),
  };
}
