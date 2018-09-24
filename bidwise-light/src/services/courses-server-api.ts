import axios from 'axios';
import { wixAxiosInstanceConfig } from 'wix-axios-config';

export const COURSES_ENDPOINTS = {
  getCourses: (id: string) => `/courses/${id}`,
};

export class CoursesServerApi {
  private readonly axiosInstance;

  constructor() {
    this.axiosInstance = wixAxiosInstanceConfig(axios, {
      baseURL: '/',
    });
  }

  getCourses(req) {
    return this.axiosInstance
      .get(COURSES_ENDPOINTS.getCourses(req.getCoursesId))
      .then(res => res.data as { courses: { name: string; id: string }[] });
  }
}
