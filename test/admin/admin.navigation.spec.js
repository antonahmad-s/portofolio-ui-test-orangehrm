const { expect } = require('chai');
const { createDriver } = require('../../src/utils/driver');
const LoginPage = require('../../src/pages/LoginPage');
const config = require('../../config/env');
const { waitForText } = require('../../src/utils/waits');

describe('Admin - navigation', function () {
  let driver;
  beforeEach(async function () {
    driver = await createDriver();
    const login = new LoginPage(driver);
    await login.open();
    await login.login(config.username, config.password);
    await driver.get(config.baseUrl + '/web/index.php/admin/viewAdminModule');
    await waitForText(driver, { css: 'body' }, 'User Management');
  });
  afterEach(async function () {
    if (driver) await driver.quit();
  });

  it('should load Admin module', async function () {
    expect(await driver.getCurrentUrl()).to.contain('/admin/');
  });

  it('should display User Management content', async function () {
    const body = (await driver.findElement({ css: 'body' })).getText();
    expect((await body).toLowerCase()).to.contain('user management');
  });
});
