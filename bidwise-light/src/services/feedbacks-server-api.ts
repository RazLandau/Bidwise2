import axios from 'axios';

export const FEEDBACKS_ENDPOINTS = {
  getFeedbacks: (id: string) => `/feedbacks/${id}`,
};

export class FeedbacksServerApi {
  private readonly axiosInstance;

  constructor() {
    this.axiosInstance = axios.create({
      baseURL: '/',
    });
  }

  getFeedbacks(req) {
    return this.axiosInstance
      .get(FEEDBACKS_ENDPOINTS.getFeedbacks(req.id))
      .then(res => res.data as { feedbacks });
  }
}
