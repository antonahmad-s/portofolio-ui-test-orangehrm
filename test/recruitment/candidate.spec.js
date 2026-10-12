const { expect } = require('chai');
const { createDriver } = require('../../src/utils/driver');
const LoginPage = require('../../src/pages/LoginPage');
const RecruitmentPage = require('../../src/pages/RecruitmentPage');
const config = require('../../config/env');

describe('Recruitment - candidate form', function () {
  let driver;
  let recruitment;
  let createdCandidate;

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
    if (createdCandidate && recruitment) {
      await recruitment.deleteCandidate(createdCandidate.firstName);
    }
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
    const candidate = {
      firstName: `QA${suffix}`,
      middleName: 'Automation',
      lastName: 'Candidate',
      email: `qa${suffix}@example.test`,
    };
    await recruitment.addCandidate(candidate);
    createdCandidate = candidate;
    expect(
      await driver.findElement(recruitment.successToast).getText()
    ).to.contain('Success');
    await recruitment.searchCandidate(candidate.firstName);
    const row = await recruitment.findCandidateRow(candidate.firstName);
    expect(await row.getText()).to.contain(candidate.lastName);
  });

  it('should display a matching candidate when an existing name is searched', async function () {
    const suffix = String(Date.now()).slice(-6);
    const candidate = {
      firstName: `QA${suffix}`,
      middleName: 'Automation',
      lastName: 'Candidate',
      email: `qa${suffix}@example.test`,
    };

    await recruitment.addCandidate(candidate);
    createdCandidate = candidate;
    await recruitment.searchCandidate(candidate.firstName);
    const row = await recruitment.findCandidateRow(candidate.firstName);

    expect(await row.getText()).to.contain(candidate.firstName);
    expect(await row.getText()).to.contain(candidate.lastName);
  });
});
