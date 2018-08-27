import { expect } from 'chai';
import { AppDriver } from './App.driver';

describe('<App/>', () => {
  let driver: AppDriver;
  beforeEach(() => {
    driver = new AppDriver();
  });
  afterEach(() => {
    driver.cleanup();
  });
  it('renders a title correctly', async () => {
    await driver.when.created();
    expect(driver.get.title()).to.equal('Hello World!');
  });
});
