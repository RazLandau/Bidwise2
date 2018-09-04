import axios from 'axios';
import { wixAxiosInstanceConfig } from 'wix-axios-config';

export const COURSES_ENDPOINTS = {
  getCourses: '/courses',
};

export class CoursesServerApi {
  private readonly axiosInstance;

  constructor() {
    this.axiosInstance = wixAxiosInstanceConfig(axios, {
      baseURL: '/',
    });
  }

  getCourses() {
    return this.axiosInstance
      .get(COURSES_ENDPOINTS.getCourses)
      .then(res => res.data as { courses: { name: string }[] });
  }
}
