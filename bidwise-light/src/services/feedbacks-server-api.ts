import axios from 'axios';
import { wixAxiosInstanceConfig } from 'wix-axios-config';

export const FEEDBACKS_ENDPOINTS = {
  getFeedbacks: (id: string) => `/feedbacks/${id}`,
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
      .get(FEEDBACKS_ENDPOINTS.getFeedbacks(req.id))
      .then(res => res.data as { feedbacks });
  }
}
