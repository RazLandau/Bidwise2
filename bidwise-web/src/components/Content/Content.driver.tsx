import Content from './Content';
import { BaseDriver } from '../../../test/lib/base-driver';

export class ContentDriver extends BaseDriver {
  when = {
    created: (): Promise<void> => this.render(Content),
  };
}
