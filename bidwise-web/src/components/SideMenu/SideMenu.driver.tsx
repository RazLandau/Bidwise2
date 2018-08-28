import SideMenu, { SideMenuProps } from './SideMenu';
import { BaseDriver } from '../../../test/lib/base-driver';
import { ReactWrapper } from 'enzyme';

export class SideMenuDriver extends BaseDriver<SideMenuProps> {
  when = {
    created: (): Promise<void> => this.render(SideMenu),
  };

  get = {
    copyrights: (): ReactWrapper => this.getByDataHook('copyrights'),
    yedionLink: (): ReactWrapper => this.getByDataHook('yedion-link'),
    contactUsLink: (): ReactWrapper => this.getByDataHook('contact-us-link'),
    aboutLink: (): ReactWrapper => this.getByDataHook('about-link'),
    helpLink: (): ReactWrapper => this.getByDataHook('help-link'),
    faculties: (): ReactWrapper => this.getByDataHook('faculty'),
  };
}
