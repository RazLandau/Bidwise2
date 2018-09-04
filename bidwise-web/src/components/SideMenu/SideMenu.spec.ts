import { expect } from 'chai';
import { SideMenuDriver } from './SideMenu.driver';
import { ApiInterceptor } from '../../../test/lib/api-interceptor';
import {
  aFaculty,
  asFacultiesResponse,
} from '../../../test/builders/faculties.builder';

describe('<SideMenu/>', () => {
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
      expect(driver.get.title()).to.equal('&idwise');
    });

    it('should have subtitle', async () => {
      await driver
        .givenApiMock(
          ApiInterceptor.getFaculties().replyWith(
            asFacultiesResponse([aFaculty()]),
          ),
        )
        .when.created();
      expect(driver.get.subtitle()).to.equal('חכמים יותר מהבידינג');
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
      expect(driver.get.faculties.count()).to.equal(2);
      expect(driver.get.faculties.faculty(0).text()).to.equal('הכל');
      expect(driver.get.faculties.faculty(1).text()).to.equal('מדעים מדויקים');
    });

    it('should load schools on faculty click', async () => {
      await driver
        .givenApiMock(
          ApiInterceptor.getFaculties().replyWith(
            asFacultiesResponse([aFaculty()]),
          ),
        )
        .when.created();
      driver.when.clickFaculty(1);
      expect(driver.get.schools.count()).to.equal(2);
      expect(driver.get.schools.school(0).text()).to.equal('הכל');
      expect(driver.get.schools.school(1).text()).to.equal('מדעי המחשב');
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
      expect(driver.get.yedionLink.text()).to.equal('ידיעון האוניברסיטה');
    });

    it('should have contact us link', async () => {
      await driver
        .givenApiMock(
          ApiInterceptor.getFaculties().replyWith(
            asFacultiesResponse([aFaculty()]),
          ),
        )
        .when.created();
      expect(driver.get.contactUsLink.text()).to.equal('ליצירת קשר');
    });

    it('should have about link', async () => {
      await driver
        .givenApiMock(
          ApiInterceptor.getFaculties().replyWith(
            asFacultiesResponse([aFaculty()]),
          ),
        )
        .when.created();
      expect(driver.get.aboutLink.text()).to.equal('אודות');
    });

    it('should have help link', async () => {
      await driver
        .givenApiMock(
          ApiInterceptor.getFaculties().replyWith(
            asFacultiesResponse([aFaculty()]),
          ),
        )
        .when.created();
      expect(driver.get.helpLink.text()).to.equal('עזרה');
    });
  });

  describe('footer', () => {
    it('should have text', async () => {
      await driver
        .givenApiMock(
          ApiInterceptor.getFaculties().replyWith(
            asFacultiesResponse([aFaculty()]),
          ),
        )
        .when.created();
      expect(driver.get.footer.text()).to.equal('© כל הזכויות שמורות');
    });
  });
});
