const { expect } = require('chai');
const { createDriver } = require('../../src/utils/driver');
const LoginPage = require('../../src/pages/LoginPage');
const PIMPage = require('../../src/pages/PIMPage');
const config = require('../../config/env');

describe('PIM - negative validation', function () {
  let driver;
  let pim;
  beforeEach(async function () {
    driver = await createDriver();
    const login = new LoginPage(driver);
    pim = new PIMPage(driver);
    await login.open();
    await login.login(config.username, config.password);
  });
  afterEach(async function () {
    if (driver) await driver.quit();
  });

  it('should require first and last name when an employee is submitted empty', async function () {
    await pim.submitEmptyEmployee();
    const validationMessages = await pim.getValidationMessages();

    expect(validationMessages).to.have.lengthOf(2);
    expect(validationMessages).to.deep.equal(['Required', 'Required']);
    expect(await driver.getCurrentUrl()).to.contain('/pim/addEmployee');
    expect(await driver.findElements(pim.successToast)).to.have.lengthOf(0);
  });
});
