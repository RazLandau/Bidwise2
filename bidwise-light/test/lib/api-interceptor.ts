import * as nock from 'nock';
import { baseURL } from '../test-common';
import { COURSES_ENDPOINTS } from '../../src/services/courses-server-api';
import { FEEDBACKS_ENDPOINTS } from '../../src/services/feedbacks-server-api';

export interface ApiInterceptorResult {
  method: Method;
  endpoint: string;
  status?: number;
  response: any;
  body?: any;
}

export enum Method {
  GET = 'get',
  POST = 'post',
}

const responseBuilderFactory = ({
  method = Method.GET,
  endpoint,
  body = null,
}) => ({
  replyWith(response): ApiInterceptorResult {
    return {
      method,
      endpoint,
      response,
      body,
      status: 200,
    };
  },
  failWith(status = 500, response): ApiInterceptorResult {
    return {
      method,
      endpoint,
      response,
      body,
      status,
    };
  },
});

export const ApiInterceptor = {
  getCourses(req) {
    return responseBuilderFactory({
      method: Method.GET,
      endpoint: COURSES_ENDPOINTS.COURSES,
    });
  },
  getFeedbacks(req) {
    return responseBuilderFactory({
      method: Method.GET,
      endpoint: FEEDBACKS_ENDPOINTS.getFeedbacks(req.courseId),
    });
  },
  apply(apiMocks: ApiInterceptorResult[]) {
    apiMocks.forEach(mock => {
      if (mock.method === Method.GET) {
        nock(baseURL)
          .get(mock.endpoint)
          .reply(mock.status, mock.response);
      } else if (mock.method === Method.POST) {
        nock(baseURL)
          .post(mock.endpoint, mock.body)
          .reply(mock.status, mock.response);
      }
    });
    apiMocks.length = 0;
  },
};
