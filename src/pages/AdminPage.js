const { By, until } = require('selenium-webdriver');
const config = require('../../config/env');

class AdminPage {
  constructor(driver) {
    this.driver = driver;
  }

  tableRows = By.css('.oxd-table-body .oxd-table-row');
  filterInputs = By.css('input');

  async open() {
    await this.driver.get(
      config.baseUrl + '/web/index.php/admin/viewSystemUsers'
    );
    await this.driver.wait(until.elementLocated(By.css('.oxd-table')), 10000);
  }

  async getUsernameFilter() {
    const inputs = await this.driver.findElements(this.filterInputs);
    for (const input of inputs) {
      const placeholder = await input.getAttribute('placeholder');
      if (!placeholder) return input;
    }
    throw new Error('Admin username filter was not found');
  }

  async searchUsername(username) {
    await this.open();
    const input = await this.getUsernameFilter();
    await input.sendKeys(username);
    await this.clickButton('Search');
    await this.driver.wait(
      until.elementLocated(By.css('.oxd-table-body')),
      10000
    );
  }

  async getFirstUsername() {
    await this.open();
    await this.clickButton('Search');
    await this.driver.wait(until.elementLocated(this.tableRows), 10000);
    const row = await this.driver.findElement(this.tableRows);
    const cells = await row.findElements(By.css('[role="cell"]'));
    return (await cells[1].getText()).trim();
  }

  async resetFilters() {
    await this.clickButton('Reset');
    const input = await this.getUsernameFilter();
    return (await input.getAttribute('value')) === '';
  }

  async getRows() {
    return this.driver.findElements(this.tableRows);
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
}

module.exports = AdminPage;
