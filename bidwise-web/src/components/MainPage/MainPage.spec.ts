import { expect } from 'chai';
import { MainPageDriver } from './MainPage.driver';
import { ApiInterceptor } from '../../../test/lib/api-interceptor';
import {
  aCourse,
  asCoursesResponse,
} from '../../../test/builders/courses.builder';
import configureStore from '../../store/configureStore';
import { eventually } from '../../../test/test-common';
import { updateGetCoursesId } from '../../actions';
import {
  aFeedback,
  asFeedbacksResponse,
} from '../../../test/builders/feedbacks.builder';

describe('<Content/>', () => {
  let driver: MainPageDriver;

  beforeEach(() => {
    driver = new MainPageDriver();
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
    await eventually(() => expect(driver.get.courses.count()).to.equal(1));
  });

  it('should load feedbacks on course click', async () => {
    const getCoursesId = 'some-id';
    const store = configureStore({});
    await driver
      .givenDependency('store', store)
      .givenApiMock(
        ApiInterceptor.getCourses({ getCoursesId }).replyWith(
          asCoursesResponse([aCourse()]),
        ),
      )
      .givenApiMock(
        ApiInterceptor.getFeedbacks({ courseId: 0 }).replyWith(
          asFeedbacksResponse([aFeedback()]),
        ),
      )
      .when.created();
    store.dispatch(updateGetCoursesId(getCoursesId));
    await eventually(() => expect(driver.get.courses.count()).to.equal(1));
    await driver.when.clickCourse(0);
    await eventually(() => expect(driver.get.feedbacks.count()).to.equal(1));
  });

  it.skip('should unload feedbacks on back click', async () => {
    const getCoursesId = 'some-id';
    const store = configureStore({});
    await driver
      .givenDependency('store', store)
      .givenApiMock(
        ApiInterceptor.getCourses({ getCoursesId }).replyWith(
          asCoursesResponse([aCourse()]),
        ),
      )
      .givenApiMock(
        ApiInterceptor.getFeedbacks({ courseId: 0 }).replyWith(
          asFeedbacksResponse([aFeedback()]),
        ),
      )
      .when.created();
    store.dispatch(updateGetCoursesId(getCoursesId));
    await eventually(() => expect(driver.get.courses.count()).to.equal(1));
    await driver.when.clickCourse(0);
    await eventually(() => expect(driver.get.feedbacks.count()).to.equal(1));
    await eventually(() => expect(driver.get.backButton().exists()).to.be.true);
    await driver.when.clickBack();
    await eventually(() => expect(driver.get.feedbacks.count()).to.equal(0));
  });
});
