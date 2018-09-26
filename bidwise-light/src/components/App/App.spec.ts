import { expect } from 'chai';
import { AppDriver } from './App.driver';
import { ApiInterceptor } from '../../../test/lib/api-interceptor';
import {
  aFaculty,
  asFacultiesResponse,
} from '../../../test/builders/faculties.builder';
import {
  aCourse,
  asCoursesResponse,
} from '../../../test/builders/courses.builder';

describe('<App/>', () => {
  let driver: AppDriver;

  beforeEach(() => {
    driver = new AppDriver();
  });

  afterEach(() => {
    driver.cleanup();
  });

  it('should pass', async () => {
    await driver.when.created();
    expect(true).to.be.true;
  });
});
