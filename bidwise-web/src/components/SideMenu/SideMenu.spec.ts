import { expect } from 'chai';
import { SideMenuDriver } from './SideMenu.driver';
import { ApiInterceptor } from '../../../test/lib/api-interceptor';
import {
  aFaculty,
  asFacultiesResponse,
} from '../../../test/builders/faculties.builder';

describe('<App/>', () => {
  let driver: SideMenuDriver;

  beforeEach(() => {
    driver = new SideMenuDriver();
  });

  afterEach(() => {
    driver.cleanup();
  });

  describe('header', () => {
    it('should have title', async () => {
      await driver
        .givenApiMock(
          ApiInterceptor.getFaculties().replyWith(
            asFacultiesResponse([aFaculty()]),
          ),
        )
        .when.created();
      expect(false).to.equal(true);
    });

    it('should have subtitle', async () => {
      await driver
        .givenApiMock(
          ApiInterceptor.getFaculties().replyWith(
            asFacultiesResponse([aFaculty()]),
          ),
        )
        .when.created();
      expect(false).to.equal(true);
    });
  });

  describe('dynamic navigation', () => {
    it('should load facaulties', async () => {
      await driver
        .givenApiMock(
          ApiInterceptor.getFaculties().replyWith(
            asFacultiesResponse([aFaculty()]),
          ),
        )
        .when.created();
      expect(driver.get.faculties().length).to.equal(1);
    });
  });

  describe('static navigation', () => {
    it('should have yedion link', async () => {
      await driver
        .givenApiMock(
          ApiInterceptor.getFaculties().replyWith(
            asFacultiesResponse([aFaculty()]),
          ),
        )
        .when.created();
      expect(driver.get.yedionLink().text()).to.equal('ידיעון האוניברסיטה');
    });

    it('should have contact us link', async () => {
      await driver
        .givenApiMock(
          ApiInterceptor.getFaculties().replyWith(
            asFacultiesResponse([aFaculty()]),
          ),
        )
        .when.created();
      expect(driver.get.contactUsLink().text()).to.equal('ליצירת קשר');
    });

    it('should have about link', async () => {
      await driver
        .givenApiMock(
          ApiInterceptor.getFaculties().replyWith(
            asFacultiesResponse([aFaculty()]),
          ),
        )
        .when.created();
      expect(driver.get.aboutLink().text()).to.equal('אודות');
    });

    it('should have help link', async () => {
      await driver
        .givenApiMock(
          ApiInterceptor.getFaculties().replyWith(
            asFacultiesResponse([aFaculty()]),
          ),
        )
        .when.created();
      expect(driver.get.helpLink().text()).to.equal('עזרה');
    });
  });

  describe('footer', () => {
    it('should have copyrights footer', async () => {
      await driver
        .givenApiMock(
          ApiInterceptor.getFaculties().replyWith(
            asFacultiesResponse([aFaculty()]),
          ),
        )
        .when.created();
      expect(driver.get.copyrights().text()).to.equal('© כל הזכויות שמורות');
    });
  });
});
