const { expect } = require('chai');
const { By, until } = require('selenium-webdriver');
const { createDriver } = require('../../src/utils/driver');
const LoginPage = require('../../src/pages/LoginPage');
const config = require('../../config/env');
const { waitForText } = require('../../src/utils/waits');

describe('PIM - negative validation', function () {
  let driver;
  beforeEach(async function () {
    driver = await createDriver();
    const login = new LoginPage(driver);
    await login.open();
    await login.login(config.username, config.password);
    await driver.get(config.baseUrl + '/web/index.php/pim/addEmployee');
    await waitForText(driver, By.css('body'), 'Add Employee');
  });
  afterEach(async function () {
    if (driver) await driver.quit();
  });

  it('should show required validation when employee is submitted without mandatory fields', async function () {
    const buttons = await driver.findElements(By.css('button'));
    const texts = await Promise.all(buttons.map((b) => b.getText()));
    const save = buttons[texts.findIndex((t) => t.trim() === 'Save')];
    expect(save).to.not.equal(undefined);
    await save.click();
    await driver.wait(
      until.elementLocated(By.css('.oxd-input-field-error-message')),
      10000
    );
    const errors = await driver.findElements(
      By.css('.oxd-input-field-error-message')
    );
    expect(errors.length).to.be.greaterThan(0);
  });
});
