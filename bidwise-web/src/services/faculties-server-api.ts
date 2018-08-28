import axios from 'axios';
import { wixAxiosInstanceConfig } from 'wix-axios-config';

export class FacultiesServerApi {
  private readonly axiosInstance;

  constructor() {
    this.axiosInstance = wixAxiosInstanceConfig(axios, {
      baseURL: '/',
    });
  }

  getFaculties(): Promise<{ faculties: { name: string }[] }> {
    return this.axiosInstance
      .get('/faculties')
      .then(res => res.data as { faculties: { name: string }[] });
  }
}
