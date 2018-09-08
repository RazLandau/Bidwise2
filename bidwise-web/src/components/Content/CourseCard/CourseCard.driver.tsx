import CourseCard, { CourseCardProps } from './CourseCard';
import { BaseDriver } from '../../../../test/lib/base-driver';
import { ReactWrapper } from 'enzyme';

export class CourseCardDriver extends BaseDriver<CourseCardProps> {
  when = {
    created: (): Promise<void> => this.render(CourseCard),
  };

  get = {
    header: {
      title: (): string => this.getByDataHook('title').text(),
      suffix: (): string => this.getByDataHook('suffix').text(),
    },
    easy: {
      text: () => this.getByDataHook('easy-text').text(),
      rating: {
        yes: (): number => this.getByDataHook('easy-yes').length,
        no: (): number => this.getByDataHook('easy-no').length,
      },
    },
    interesting: {
      text: () => this.getByDataHook('interesting-text').text(),
      rating: {
        yes: (): number => this.getByDataHook('interesting-yes').length,
        no: (): number => this.getByDataHook('interesting-no').length,
      },
    },
    recommended: {
      text: () => this.getByDataHook('recommended-text').text(),
      rating: {
        yes: (): number => this.getByDataHook('recommended-yes').length,
        no: (): number => this.getByDataHook('recommended-no').length,
      },
    },
  };
}
