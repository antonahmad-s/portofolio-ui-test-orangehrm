const { By, Key, until } = require('selenium-webdriver');
const config = require('../../config/env');

class PIMPage {
  constructor(driver) {
    this.driver = driver;
  }

  menu = By.css("a[href*='/pim/viewPimModule']");
  searchInput = By.css("input[placeholder='Type for hints...']");
  firstNameInput = By.name('firstName');
  middleNameInput = By.name('middleName');
  lastNameInput = By.name('lastName');
  saveButton = By.css("button[type='submit']");
  tableRows = By.css('.oxd-table-body .oxd-table-row');
  successToast = By.css('.oxd-toast-content-text');
  validationMessages = By.css('.oxd-input-field-error-message');
  formLoader = By.css('.oxd-form-loader');

  async open() {
    await this.driver.wait(until.elementLocated(this.menu), 10000);
    await this.driver.findElement(this.menu).click();
  }

  async isDisplayed() {
    return Boolean(
      await this.driver.wait(
        until.elementLocated(By.css('h6.oxd-text--h6')),
        10000
      )
    );
  }

  async openEmployeeList() {
    await this.driver.get(
      config.baseUrl + '/web/index.php/pim/viewEmployeeList'
    );
    await this.driver.wait(until.elementLocated(By.css('.oxd-table')), 10000);
  }

  async openAddEmployee() {
    await this.driver.get(config.baseUrl + '/web/index.php/pim/addEmployee');
    await this.driver.wait(until.elementLocated(this.firstNameInput), 10000);
  }

  async addEmployee({ firstName, middleName = '', lastName }) {
    await this.openAddEmployee();
    await this.driver.findElement(this.firstNameInput).sendKeys(firstName);
    if (middleName) {
      await this.driver.findElement(this.middleNameInput).sendKeys(middleName);
    }
    await this.driver.findElement(this.lastNameInput).sendKeys(lastName);
    await this.waitForFormReady();
    await this.driver.findElement(this.saveButton).click();
    await this.waitForFormReady();
    await this.driver.wait(until.elementLocated(this.successToast), 10000);
  }

  async submitEmptyEmployee() {
    await this.openAddEmployee();
    await this.clickButton('Save');
    await this.driver.wait(
      until.elementLocated(this.validationMessages),
      10000
    );
  }

  async getValidationMessages() {
    const messages = await this.driver.findElements(this.validationMessages);
    return Promise.all(messages.map((message) => message.getText()));
  }

  async searchEmployee(firstName) {
    await this.openEmployeeList();
    const input = await this.driver.wait(
      until.elementLocated(this.searchInput),
      10000
    );
    await input.sendKeys(firstName);
    const options = By.css("[role='option']");
    await this.driver.wait(until.elementLocated(options), 10000);
    const suggestions = await this.driver.findElements(options);
    for (const suggestion of suggestions) {
      if ((await suggestion.getText()).includes(firstName)) {
        await suggestion.click();
        break;
      }
    }
    await this.clickButton('Search');
    await this.driver.wait(
      until.elementLocated(By.css('.oxd-table-body')),
      10000
    );
    await this.driver.wait(
      until.elementLocated(this.employeeRow(firstName)),
      10000
    );
  }

  async getFirstEmployeeName() {
    await this.openEmployeeList();
    await this.clickButton('Search');
    await this.driver.wait(
      until.elementLocated(By.css('.oxd-table-body')),
      10000
    );
    const row = await this.driver.findElement(this.tableRows);
    const cells = await row.findElements(By.css('[role="cell"]'));
    return (await cells[2].getText()).trim();
  }

  async editEmployee(firstName, updatedLastName) {
    await this.searchEmployee(firstName);
    const row = await this.findEmployeeRow(firstName);
    const actions = await row.findElements(By.css('button'));
    await actions[0].click();
    await this.driver.wait(until.elementLocated(this.firstNameInput), 10000);
    await this.waitForFormReady();
    const input = await this.driver.findElement(this.lastNameInput);
    await input.clear();
    await input.sendKeys(updatedLastName);
    await input.sendKeys(Key.TAB);
    await this.waitForFormReady();
    await this.driver.findElement(this.saveButton).click();
    await this.driver.wait(until.elementLocated(this.successToast), 10000);
  }

  async editFirstEmployee() {
    await this.openEmployeeList();
    await this.clickButton('Search');
    await this.driver.wait(until.elementLocated(this.tableRows), 10000);
    const row = await this.driver.findElement(this.tableRows);
    const actions = await row.findElements(By.css('button'));
    await actions[0].click();
    await this.driver.wait(until.elementLocated(this.firstNameInput), 10000);
    await this.driver.findElement(this.saveButton).click();
    await this.driver.wait(until.elementLocated(this.successToast), 10000);
  }

  async deleteEmployee(firstName) {
    await this.searchEmployee(firstName);
    const row = await this.findEmployeeRow(firstName);
    const actions = await row.findElements(By.css('button'));
    await actions[1].click();
    const confirm = By.xpath("//button[normalize-space()='Yes, Delete']");
    await this.driver.wait(until.elementLocated(confirm), 10000);
    await this.driver.findElement(confirm).click();
    await this.driver.wait(until.stalenessOf(row), 10000);
    await this.driver.wait(until.elementLocated(this.successToast), 10000);
  }

  async findEmployeeRow(firstName) {
    return this.driver.findElement(this.employeeRow(firstName));
  }

  employeeRow(firstName) {
    const escapedFirstName = this.escapeXPathLiteral(firstName);
    return By.xpath(
      `//div[contains(@class,'oxd-table-row')][.//div[@role='cell'][contains(concat(' ', normalize-space(), ' '), concat(' ', ${escapedFirstName}, ' '))]]`
    );
  }

  escapeXPathLiteral(value) {
    if (!value.includes("'")) return `'${value}'`;
    if (!value.includes('"')) return `"${value}"`;
    return `concat('${value.split("'").join("', \"'\", '")}')`;
  }

  async clickButton(label) {
    const buttons = await this.driver.findElements(By.css('button'));
    for (const button of buttons) {
      if ((await button.getText()).trim() === label) {
        await this.driver.executeScript(
          'arguments[0].scrollIntoView({block: "center"});',
          button
        );
        await button.click();
        return;
      }
    }
    throw new Error(`Button '${label}' was not found`);
  }

  async waitForFormReady() {
    await this.driver.wait(async (driver) => {
      const loaders = await driver.findElements(this.formLoader);
      if (loaders.length === 0) return true;
      try {
        return !(await loaders[0].isDisplayed());
      } catch (error) {
        return false;
      }
    }, 10000);
  }
}

module.exports = PIMPage;
