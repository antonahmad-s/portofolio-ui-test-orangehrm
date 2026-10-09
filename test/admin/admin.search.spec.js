const { expect } = require('chai');
const { createDriver } = require('../../src/utils/driver');
const LoginPage = require('../../src/pages/LoginPage');
const AdminPage = require('../../src/pages/AdminPage');
const config = require('../../config/env');

describe('Admin - user management filters', function () {
  let driver;
  let admin;

  beforeEach(async function () {
    driver = await createDriver();
    const login = new LoginPage(driver);
    admin = new AdminPage(driver);
    await login.open();
    await login.login(config.username, config.password);
  });

  afterEach(async function () {
    if (driver) await driver.quit();
  });

  it('should display the matching user when a username is searched', async function () {
    const username = await admin.getFirstUsername();
    await admin.searchUsername(username);
    const rows = await admin.getRows();
    expect(rows.length).to.be.greaterThan(0);
    expect(await rows[0].getText()).to.contain(username);
  });

  it('should clear user filters when reset is selected', async function () {
    await admin.open();
    const input = await admin.getUsernameFilter();
    await input.sendKeys('temporary-filter');
    expect(await admin.resetFilters()).to.equal(true);
  });
});
