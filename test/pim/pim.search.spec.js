const { expect } = require('chai');
const { By, until } = require('selenium-webdriver');
const { createDriver } = require('../../src/utils/driver');
const LoginPage = require('../../src/pages/LoginPage');
const config = require('../../config/env');

describe('PIM - employee search', function () {
  let driver;
  beforeEach(async function () {
    driver = await createDriver();
    const login = new LoginPage(driver);
    await login.open();
    await login.login(config.username, config.password);
    await driver.get(config.baseUrl + '/web/index.php/pim/viewEmployeeList');
    await driver.wait(until.elementLocated(By.css('.oxd-table')), 10000);
  });
  afterEach(async function () {
    if (driver) await driver.quit();
  });

  it('should display employee list', async function () {
    await driver.wait(
      until.elementLocated(By.css('.oxd-table-body .oxd-table-row')),
      10000
    );
    expect(
      (await driver.findElements(By.css('.oxd-table-body .oxd-table-row')))
        .length
    ).to.be.greaterThan(0);
  });

  it('should display employee search filters', async function () {
    expect(
      (await driver.findElements(By.css('input'))).length
    ).to.be.greaterThan(0);
  });

  it('should have reset and search controls', async function () {
    const buttons = await driver.findElements(By.css('button'));
    const texts = await Promise.all(buttons.map((b) => b.getText()));
    expect(texts.some((t) => t.trim() === 'Search')).to.equal(true);
    expect(texts.some((t) => t.trim() === 'Reset')).to.equal(true);
  });
});
