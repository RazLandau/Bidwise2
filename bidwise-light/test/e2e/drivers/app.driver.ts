import { Page } from 'puppeteer';
import { baseURL } from '../e2e-common';
import { dataHook } from '../../test-common';

export class AppDriver {
  private page: Page;

  when = {
    openPage: async () => {
      this.page = await global.browser.newPage();
      await this.page.setViewport({ width: 1440, height: 900 });
      await this.page.goto(baseURL);
    },
    closePage: async () => {
      return this.page.close();
    },
    takeScreenshot: () => {
      return this.page.screenshot();
    },
  };

  get = {
    elementText: async (selector: string) => {
      await this.page.waitForSelector(selector, { timeout: 5000 });
      return this.page.$eval(selector, e => e.textContent);
    },
    pageTitle: () => this.get.elementText(dataHook('title')),
  };
}
