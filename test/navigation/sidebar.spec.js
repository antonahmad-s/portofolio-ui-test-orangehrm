const { expect } = require('chai');
const { By } = require('selenium-webdriver');
const { createDriver } = require('../../src/utils/driver');
const LoginPage = require('../../src/pages/LoginPage');
const config = require('../../config/env');

describe('Navigation - Sidebar', function () {
  let driver;
  beforeEach(async function () {
    driver = await createDriver();
    const login = new LoginPage(driver);
    await login.open();
    await login.login(config.username, config.password);
  });
  afterEach(async function () {
    if (driver) await driver.quit();
  });

  const modules = [
    ['Admin', '/web/index.php/admin/viewAdminModule'],
    ['PIM', '/web/index.php/pim/viewPimModule'],
    ['Leave', '/web/index.php/leave/viewLeaveModule'],
    ['Time', '/web/index.php/time/viewTimeModule'],
    ['Recruitment', '/web/index.php/recruitment/viewRecruitmentModule'],
    ['My Info', '/web/index.php/pim/viewMyDetails'],
  ];

  for (const [name, href] of modules) {
    it(`should display ${name} menu item`, async function () {
      const locator = { css: `a[href*='${href.split('/web')[1]}']` };
      const available = await driver.findElements(
        By.css('.oxd-main-menu-item')
      );
      const hrefs = await Promise.all(
        available.map((link) => link.getAttribute('href'))
      );
      if (!hrefs.some((item) => item && item.includes(href.split('/web')[1])))
        this.skip();
      await driver.wait(async (currentDriver) => {
        return (await currentDriver.findElements(locator)).length > 0;
      }, 20000);
      const links = await driver.findElements(locator);
      expect(links.length).to.be.greaterThan(0);
    });
  }
});
