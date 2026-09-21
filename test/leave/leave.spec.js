const { expect } = require('chai');
const { By } = require('selenium-webdriver');
const { createDriver } = require('../../src/utils/driver');
const LoginPage = require('../../src/pages/LoginPage');
const LeavePage = require('../../src/pages/LeavePage');
const config = require('../../config/env');

describe('Leave', function () {
  let driver, leave;
  beforeEach(async function () {
    driver = await createDriver();
    const login = new LoginPage(driver);
    leave = new LeavePage(driver);
    await login.open();
    await login.login(config.username, config.password);
    const menu = await driver.findElements(
      By.css("a[href*='/leave/viewLeaveModule']")
    );
    if (menu.length === 0) this.skip();
  });
  afterEach(async function () {
    if (driver) await driver.quit();
  });
  it('should open Leave module', async function () {
    await leave.open();
    expect(await leave.isDisplayed()).to.equal(true);
  });
});
