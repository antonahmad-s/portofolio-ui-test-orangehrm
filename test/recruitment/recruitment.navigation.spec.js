const { expect } = require('chai');
const { createDriver } = require('../../src/utils/driver');
const LoginPage = require('../../src/pages/LoginPage');
const config = require('../../config/env');
const { waitForText } = require('../../src/utils/waits');

describe('Recruitment - navigation', function () {
  let driver;
  beforeEach(async function () {
    driver = await createDriver();
    const login = new LoginPage(driver);
    await login.open();
    await login.login(config.username, config.password);
    await driver.get(
      config.baseUrl + '/web/index.php/recruitment/viewCandidates'
    );
    await waitForText(driver, { css: 'body' }, 'Candidates');
  });
  afterEach(async function () {
    if (driver) await driver.quit();
  });

  it('should load Recruitment module', async function () {
    expect(await driver.getCurrentUrl()).to.contain('/recruitment/');
  });

  it('should display Candidates content', async function () {
    const body = (await driver.findElement({ css: 'body' })).getText();
    expect((await body).toLowerCase()).to.contain('candidates');
  });
});
