import axios from 'axios';

export const COURSES_ENDPOINTS = {
  COURSES: '/courses/',
};

export class CoursesServerApi {
  private readonly axiosInstance;

  constructor() {
    this.axiosInstance = axios.create({
      baseURL: '/',
    });
  }

  getCourses() {
    return this.axiosInstance
      .get(COURSES_ENDPOINTS.COURSES)
      .then(res => res.data as { courses });
  }
}
