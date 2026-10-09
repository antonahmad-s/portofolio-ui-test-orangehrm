const { expect } = require('chai');
const { createDriver } = require('../../src/utils/driver');
const LoginPage = require('../../src/pages/LoginPage');
const PIMPage = require('../../src/pages/PIMPage');
const config = require('../../config/env');

function createEmployeeData() {
  const suffix = String(Date.now()).slice(-7);
  return {
    firstName: `QA${suffix}`,
    middleName: 'Automation',
    lastName: 'Employee',
  };
}

describe('PIM - employee management', function () {
  let driver;
  let pim;
  let employee;

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

  it('should create an employee when valid employee data is submitted', async function () {
    employee = createEmployeeData();
    try {
      await pim.addEmployee(employee);
      await pim.searchEmployee(employee.firstName);
      const row = await pim.findEmployeeRow(employee.firstName);
      expect(await row.getText()).to.contain(employee.firstName);
      expect(await row.getText()).to.contain(employee.lastName);
    } finally {
      await pim.deleteEmployee(employee.firstName);
    }
  });

  it('should display a matching employee when an existing name is searched', async function () {
    const firstName = await pim.getFirstEmployeeName();
    await pim.searchEmployee(firstName);
    const row = await pim.findEmployeeRow(firstName);
    expect(await row.getText()).to.contain(firstName);
  });

  it('should save updated employee data when an employee is edited', async function () {
    employee = createEmployeeData();
    const updatedLastName = `${employee.lastName}Updated`;
    try {
      await pim.addEmployee(employee);
      await pim.editEmployee(employee.firstName, updatedLastName);
      await pim.searchEmployee(employee.firstName);
      const row = await pim.findEmployeeRow(employee.firstName);
      expect(await row.getText()).to.contain(updatedLastName);
    } finally {
      try {
        await pim.deleteEmployee(employee.firstName);
      } catch {}
    }
  });

  it('should remove an employee when deletion is confirmed', async function () {
    employee = createEmployeeData();
    await pim.addEmployee(employee);
    await pim.deleteEmployee(employee.firstName);
    await pim.openEmployeeList();
    await pim.clickButton('Search');
    expect(
      await driver.findElements(pim.employeeRow(employee.firstName))
    ).to.have.lengthOf(0);
  });
});
