const { expect } = require('chai');
const { By } = require('selenium-webdriver');
const { createDriver } = require('../../src/utils/driver');
const LoginPage = require('../../src/pages/LoginPage');
const DashboardPage = require('../../src/pages/DashboardPage');
const config = require('../../config/env');

describe('Dashboard - navigation', function () {
  let driver, dashboard;
  beforeEach(async function () {
    driver = await createDriver();
    const login = new LoginPage(driver);
    dashboard = new DashboardPage(driver);
    await login.open();
    await login.login(config.username, config.password);
  });
  afterEach(async function () {
    if (driver) await driver.quit();
  });

  it('should display dashboard URL', async function () {
    expect(await driver.getCurrentUrl()).to.contain('/dashboard/index');
  });

  it('should display quick launch or dashboard content', async function () {
    const elements = await driver.findElements(
      By.css('.oxd-dashboard-grid, .oxd-sheet')
    );
    expect(elements.length).to.be.greaterThan(0);
  });

  it('should display the user menu when the user dropdown is opened', async function () {
    await dashboard.openUserMenu();
    expect(await dashboard.isUserMenuDisplayed()).to.equal(true);
  });
});
