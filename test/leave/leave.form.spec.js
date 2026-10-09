const { expect } = require('chai');
const { createDriver } = require('../../src/utils/driver');
const LoginPage = require('../../src/pages/LoginPage');
const LeavePage = require('../../src/pages/LeavePage');
const config = require('../../config/env');

describe('Leave - apply form', function () {
  let driver;
  let leave;

  beforeEach(async function () {
    driver = await createDriver();
    const login = new LoginPage(driver);
    leave = new LeavePage(driver);
    await login.open();
    await login.login(config.username, config.password);
    const menu = await driver.findElements(leave.menu);
    if (menu.length === 0) this.skip();
  });

  afterEach(async function () {
    if (driver) await driver.quit();
  });

  it('should display the Apply Leave form when Apply Leave is opened', async function () {
    await leave.openApplyLeave();
    expect(await driver.findElement(leave.applyButton).isDisplayed()).to.equal(
      true
    );
  });

  it('should show validation when leave is submitted without required data', async function () {
    await leave.submitEmptyApplication();
    expect(
      (await driver.findElements(leave.validationErrors)).length
    ).to.be.greaterThan(0);
  });
});
