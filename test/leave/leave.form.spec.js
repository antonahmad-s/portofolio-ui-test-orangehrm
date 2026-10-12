const { expect } = require('chai');
const { createDriver } = require('../../src/utils/driver');
const LoginPage = require('../../src/pages/LoginPage');
const LeavePage = require('../../src/pages/LeavePage');
const config = require('../../config/env');

describe('Leave - apply form', function () {
  let driver;
  let leave;

  beforeEach(async function () {
    driver = await createDriver();
    const login = new LoginPage(driver);
    leave = new LeavePage(driver);
    await login.open();
    await login.login(config.username, config.password);
    const menu = await driver.findElements(leave.menu);
    if (menu.length === 0) this.skip();
  });

  afterEach(async function () {
    if (driver) await driver.quit();
  });

  it('should display the Apply Leave form when Apply Leave is opened', async function () {
    await leave.openApplyLeave();
    expect(await driver.findElement(leave.applyButton).isDisplayed()).to.equal(
      true
    );
  });

  it('should show validation when leave is submitted without required data', async function () {
    await leave.openApplyLeave();
    if (!(await leave.hasAvailableLeaveType('Annual Leave'))) {
      this.skip();
    }
    await leave.submitEmptyApplication();
    expect(
      (await driver.findElements(leave.validationErrors)).length
    ).to.be.greaterThan(0);
  });

  it('should submit leave when required data is provided', async function () {
    const fromDate = new Date(Date.now() + 86400000);
    const toDate = new Date(Date.now() + 172800000);

    await leave.openApplyLeave();
    if (!(await leave.hasAvailableLeaveType('Annual Leave'))) {
      this.skip();
    }

    await leave.submitLeaveRequest({
      leaveType: 'Annual Leave',
      fromDate: fromDate.toISOString().slice(0, 10),
      toDate: toDate.toISOString().slice(0, 10),
      comment: 'Quarterly leave request',
    });

    expect(await driver.findElement(leave.successToast).getText()).to.contain(
      'Success'
    );
  });
});
