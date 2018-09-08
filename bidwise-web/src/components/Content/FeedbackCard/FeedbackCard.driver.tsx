import FeedbackCard, { FeedbackCardProps } from './FeedbackCard';
import { BaseDriver } from '../../../../test/lib/base-driver';
import { ReactWrapper } from 'enzyme';

export class FeedbackCardDriver extends BaseDriver<FeedbackCardProps> {
  when = {
    created: (): Promise<void> => this.render(FeedbackCard),
  };

  get = {
    header: {
      title: (): string => this.getByDataHook('title').text(),
      subtitle: (): string => this.getByDataHook('subtitle').text(),
      suffix: {
        component: (): ReactWrapper => this.getByDataHook('suffix'),
        exists: (): boolean => this.get.header.suffix.component().exists(),
        text: (): string => this.getByDataHook('suffix').text(),
        easy: {
          yes: (): number => this.getByDataHook('easy-yes').length,
          no: (): number => this.getByDataHook('easy-no').length,
        },
        interesting: {
          yes: (): number => this.getByDataHook('interesting-yes').length,
          no: (): number => this.getByDataHook('interesting-no').length,
        },
        recommended: {
          yes: (): number => this.getByDataHook('recommended-yes').length,
          no: (): number => this.getByDataHook('recommended-no').length,
        },
      },
    },
    text: () => this.getByDataHook('text').text(),
  };
}
