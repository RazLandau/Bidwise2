import { expect } from 'chai';
import { CourseCardDriver } from './CourseCard.driver';

describe('<CourseCard/>', () => {
  let driver: CourseCardDriver;

  beforeEach(() => {
    driver = new CourseCardDriver();
  });

  afterEach(() => {
    driver.cleanup();
  });

  it('should have header title', async () => {
    const title = 'title';
    await driver.givenProp('title', title).when.created();
    expect(driver.get.header.title()).to.equal(title);
  });

  it('should have header suffix', async () => {
    const comments = 4;
    await driver
      .givenProp('title', 'title')
      .givenProp('comments', comments)
      .when.created();
    expect(driver.get.header.suffix()).to.equal(`${comments} תגובות`);
  });

  it('should have easy text', async () => {
    await driver.givenProp('title', 'title').when.created();
    expect(driver.get.easy.text()).to.equal('קל');
  });

  it('should have easy rating', async () => {
    const easy = 1;
    await driver
      .givenProp('title', 'title')
      .givenProp('easy', easy)
      .when.created();
    expect(driver.get.easy.rating.yes()).to.equal(easy);
    expect(driver.get.easy.rating.no()).to.equal(5 - easy);
  });

  it('should have interesting text', async () => {
    await driver.givenProp('title', 'title').when.created();
    expect(driver.get.interesting.text()).to.equal('מעניין');
  });

  it('should have easy rating', async () => {
    const interesting = 1;
    await driver
      .givenProp('title', 'title')
      .givenProp('interesting', interesting)
      .when.created();
    expect(driver.get.interesting.rating.yes()).to.equal(interesting);
    expect(driver.get.interesting.rating.no()).to.equal(5 - interesting);
  });

  it('should have recommended text', async () => {
    await driver.givenProp('title', 'title').when.created();
    expect(driver.get.recommended.text()).to.equal('מומלץ');
  });

  it('should have recommended rating', async () => {
    const recommended = 3;
    await driver
      .givenProp('title', 'title')
      .givenProp('recommended', recommended)
      .when.created();
    expect(driver.get.recommended.rating.yes()).to.equal(recommended);
    expect(driver.get.recommended.rating.no()).to.equal(5 - recommended);
  });
});
