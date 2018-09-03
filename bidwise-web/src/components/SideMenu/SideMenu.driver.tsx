import SideMenu from './SideMenu';
import { BaseDriver } from '../../../test/lib/base-driver';
import { ReactWrapper } from 'enzyme';

export class SideMenuDriver extends BaseDriver {
  when = {
    created: (): Promise<void> => this.render(SideMenu),
    clickFaculty: (index: number): ReactWrapper =>
      this.get.faculties.faculty(index).component().simulate('click'),
  };

  get = {
    title: (): string => this.getByDataHook('title').text(),
    subtitle: (): string => this.getByDataHook('subtitle').text(),
    faculties: {
      count: (): number => this.getByDataHook('faculty').length,
      faculty: (index: number) => {
          return ({
            component: (): ReactWrapper => this.getByDataHook('faculty').at(index),
            text: (): string => this.get.faculties.faculty(index).component().text(),
          });
      },
    },
    schools: {
      count: (): number => this.getByDataHook('school').length,
      school: (index: number) => {
          return ({
            component: (): ReactWrapper => this.getByDataHook('school').at(index),
            text: (): string => this.get.schools.school(index).component().text(),
          });
      },
    },
    yedionLink: {
      component: (): ReactWrapper => this.getByDataHook('yedion-link'),
      text: (): string => this.get.yedionLink.component().text(),
    },
    contactUsLink: {
      component: (): ReactWrapper => this.getByDataHook('contact-us-link'),
      text: (): string => this.get.contactUsLink.component().text(),
    },
    aboutLink: {
      component: (): ReactWrapper => this.getByDataHook('about-link'),
      text: (): string => this.get.aboutLink.component().text(),
    },
    helpLink: {
      component: (): ReactWrapper => this.getByDataHook('help-link'),
      text: (): string => this.get.helpLink.component().text(),
    },
    footer: {
      component: (): ReactWrapper => this.getByDataHook('footer'),
      text: (): string => this.get.footer.component().text(),
    }
  };
}
