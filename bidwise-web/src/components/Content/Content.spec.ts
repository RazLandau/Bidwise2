import { expect } from 'chai';
import { ContentDriver } from './Content.driver';
import { ApiInterceptor } from '../../../test/lib/api-interceptor';
import {
  aCourse,
  asCoursesResponse,
} from '../../../test/builders/courses.builder';

describe('<Content/>', () => {
  let driver: ContentDriver;

  beforeEach(() => {
    driver = new ContentDriver();
  });

  afterEach(() => {
    driver.cleanup();
  });

  it('should load courses', async () => {
    await driver
      .givenApiMock(
        ApiInterceptor.getCourses().replyWith(asCoursesResponse([aCourse()])),
      )
      .when.created();
  });
});
