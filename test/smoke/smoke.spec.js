const { expect } = require('chai');
const { createDriver } = require('../../src/utils/driver');
const LoginPage = require('../../src/pages/LoginPage');
const DashboardPage = require('../../src/pages/DashboardPage');
const config = require('../../config/env');
const { waitForUrlContains } = require('../../src/utils/waits');

describe('Smoke Suite', function () {
  let driver, login, dashboard;
  beforeEach(async function () {
    driver = await createDriver();
    login = new LoginPage(driver);
    dashboard = new DashboardPage(driver);
    await login.open();
  });
  afterEach(async function () {
    if (driver) await driver.quit();
  });

  it('SMOKE-001 - application login is available', async function () {
    await login.login(config.username, config.password);
    expect(await dashboard.isDisplayed()).to.equal(true);
  });

  it('SMOKE-002 - dashboard is reachable after login', async function () {
    await login.login(config.username, config.password);
    await waitForUrlContains(driver, '/dashboard/index');
    expect(await driver.getCurrentUrl()).to.contain('/dashboard/index');
  });

  it('SMOKE-003 - authenticated user can logout', async function () {
    await login.login(config.username, config.password);
    await dashboard.logout();
    await waitForUrlContains(driver, '/auth/login');
    expect(await driver.getCurrentUrl()).to.contain('/auth/login');
  });
});
