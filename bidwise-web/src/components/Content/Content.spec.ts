import { expect } from 'chai';
import { ContentDriver } from './Content.driver';
import { ApiInterceptor } from '../../../test/lib/api-interceptor';
import {
  aCourse,
  asCoursesResponse,
} from '../../../test/builders/courses.builder';
import configureStore from '../../store/configureStore';
import { eventually } from '../../../test/test-common';
import { updateGetCoursesId } from '../../actions';

describe('<Content/>', () => {
  let driver: ContentDriver;

  beforeEach(() => {
    driver = new ContentDriver();
  });

  afterEach(() => {
    driver.cleanup();
  });

  it('should load courses', async () => {
    const getCoursesId = 'some-id';
    const store = configureStore({});
    await driver
      .givenDependency('store', store)
      .givenApiMock(
        ApiInterceptor.getCourses({ getCoursesId }).replyWith(
          asCoursesResponse([aCourse()]),
        ),
      )
      .when.created();
    store.dispatch(updateGetCoursesId(getCoursesId));
    eventually(() => expect(driver.get.courses.count()).to.equal(1));
  });
});
