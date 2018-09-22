import MainPage from './MainPage';
import { BaseDriver } from '../../../test/lib/base-driver';
import { ReactWrapper } from 'enzyme';

export class MainPageDriver extends BaseDriver {
  when = {
    created: (): Promise<void> => this.render(MainPage),
    clickCourse: (index: number) =>
      this.get.courses.course(index).simulate('click'),
    clickBack: () => this.get.backButton().simulate('click'),
  };

  get = {
    courses: {
      count: (): number => this.getByDataHook('course').length,
      course: (index: number): ReactWrapper =>
        this.getByDataHook('course').at(index),
    },
    feedbacks: {
      count: (): number => this.getByDataHook('feedback').length,
    },
    backButton: (): ReactWrapper =>
      this.getByDataHook('page-header-backbutton'),
  };
}
