import * as nock from 'nock';
import { baseURL } from '../test-common';

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
  getFaculties() {
    return responseBuilderFactory({
      method: Method.GET,
      endpoint: '/faculties',
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
