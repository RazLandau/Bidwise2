import { expect } from 'chai';
import { AppDriver } from './App.driver';
import { ApiInterceptor } from '../../../test/lib/api-interceptor';
import {
  aFaculty,
  asFacultiesResponse,
} from '../../../test/builders/faculties.builder';

describe('<App/>', () => {
  let driver: AppDriver;

  beforeEach(() => {
    driver = new AppDriver();
  });

  afterEach(() => {
    driver.cleanup();
  });

  it('should have side menu', async () => {
    await driver
      .givenApiMock(
        ApiInterceptor.getFaculties().replyWith(
          asFacultiesResponse([aFaculty()]),
        ),
      )
      .when.created();
    expect(driver.get.sideMenu().exists()).to.be.true;
  });
});
