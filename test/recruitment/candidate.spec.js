const { expect } = require('chai');
const { createDriver } = require('../../src/utils/driver');
const LoginPage = require('../../src/pages/LoginPage');
const RecruitmentPage = require('../../src/pages/RecruitmentPage');
const config = require('../../config/env');

describe('Recruitment - candidate form', function () {
  let driver;
  let recruitment;

  beforeEach(async function () {
    driver = await createDriver();
    const login = new LoginPage(driver);
    recruitment = new RecruitmentPage(driver);
    await login.open();
    await login.login(config.username, config.password);
    const menu = await driver.findElements({
      css: "a[href*='/recruitment/viewRecruitmentModule']",
    });
    if (menu.length === 0) this.skip();
  });

  afterEach(async function () {
    if (driver) await driver.quit();
  });

  it('should show validation when a candidate is submitted without required data', async function () {
    await recruitment.submitEmptyCandidate();
    expect(
      (await driver.findElements(recruitment.validationErrors)).length
    ).to.be.greaterThan(0);
  });

  it('should create a candidate when valid candidate data is submitted', async function () {
    const suffix = String(Date.now()).slice(-6);
    await recruitment.addCandidate({
      firstName: `QA${suffix}`,
      middleName: 'Automation',
      lastName: 'Candidate',
      email: `qa${suffix}@example.test`,
    });
    expect(
      await driver.findElement(recruitment.successToast).getText()
    ).to.contain('Success');
  });
});
