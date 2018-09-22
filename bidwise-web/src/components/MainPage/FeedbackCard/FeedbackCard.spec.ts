import { expect } from 'chai';
import { FeedbackCardDriver } from './FeedbackCard.driver';

describe('<FeedbackCard/>', () => {
  let driver: FeedbackCardDriver;

  beforeEach(() => {
    driver = new FeedbackCardDriver();
  });

  afterEach(() => {
    driver.cleanup();
  });

  it('should have header title', async () => {
    const title = 'title';
    await driver.givenProp('title', title).when.created();
    expect(driver.get.header.title()).to.equal(title);
  });

  it('should have header subtitle', async () => {
    const subtitle = 'subtitle';
    await driver
      .givenProp('title', 'title')
      .givenProp('subtitle', subtitle)
      .when.created();
    expect(driver.get.header.subtitle()).to.equal(subtitle);
  });

  describe('header suffix', () => {
    it('should have easy rating', async () => {
      const easy = 1;
      await driver
        .givenProp('title', 'title')
        .givenProp('easy', easy)
        .when.created();
      expect(driver.get.header.suffix.easy.yes()).to.equal(easy);
      expect(driver.get.header.suffix.easy.no()).to.equal(5 - easy);
    });

    it('should have interesting rating', async () => {
      const interesting = 1;
      await driver
        .givenProp('title', 'title')
        .givenProp('interesting', interesting)
        .when.created();
      expect(driver.get.header.suffix.interesting.yes()).to.equal(interesting);
      expect(driver.get.header.suffix.interesting.no()).to.equal(
        5 - interesting,
      );
    });

    it('should have recommended rating', async () => {
      const recommended = 3;
      await driver
        .givenProp('title', 'title')
        .givenProp('recommended', recommended)
        .when.created();
      expect(driver.get.header.suffix.recommended.yes()).to.equal(recommended);
      expect(driver.get.header.suffix.recommended.no()).to.equal(
        5 - recommended,
      );
    });
  });

  it('should have text', async () => {
    const text = 'text';
    await driver
      .givenProp('title', 'title')
      .givenProp('text', text)
      .when.created();
    expect(driver.get.text()).to.equal(text);
  });
});
