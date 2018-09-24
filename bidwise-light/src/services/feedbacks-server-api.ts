import axios from 'axios';
import { wixAxiosInstanceConfig } from 'wix-axios-config';

export const FEEDBACKS_ENDPOINTS = {
  getFeedbacks: (courseId: string) => `/feedbacks/${courseId}`,
};

export class FeedbacksServerApi {
  private readonly axiosInstance;

  constructor() {
    this.axiosInstance = wixAxiosInstanceConfig(axios, {
      baseURL: '/',
    });
  }

  getFeedbacks(req) {
    return this.axiosInstance
      .get(FEEDBACKS_ENDPOINTS.getFeedbacks(req.courseId))
      .then(
        res =>
          res.data as {
            feedbacks: {
              date: string;
              lecturer: string;
              easy: number;
              interesting: number;
              recommended: number;
              text: string;
            }[];
          },
      );
  }
}
