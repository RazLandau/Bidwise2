import { eyes } from 'with-eyes/mocha';
import { expect } from 'chai';
import './e2e-common';
import { AppDriver } from './drivers/app.driver';

describe('<App/>', () => {
  let driver: AppDriver;

  beforeEach(() => {
    driver = new AppDriver();
  });

  afterEach(async () => {
    await driver.when.closePage();
  });

  eyes.it('should render', async () => {
    await driver.when.openPage();
    expect(await driver.get.pageTitle()).to.equal('Hello World!');
    await eyes.checkImage(await driver.when.takeScreenshot());
  });
});
