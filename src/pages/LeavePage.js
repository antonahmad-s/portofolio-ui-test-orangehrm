const { By, until } = require('selenium-webdriver');
const config = require('../../config/env');

class LeavePage {
  constructor(driver) {
    this.driver = driver;
  }
  menu = By.css("a[href*='/leave/viewLeaveModule']");
  applyButton = By.css("button[type='submit']");
  dateInputs = By.css("input[placeholder='yyyy-dd-mm']");
  validationErrors = By.css('.oxd-input-field-error-message');
  successToast = By.css('.oxd-toast-content-text');
  async open() {
    await this.driver.wait(until.elementLocated(this.menu), 20000);
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

  async openApplyLeave() {
    await this.driver.get(config.baseUrl + '/web/index.php/leave/applyLeave');
    await this.driver.wait(until.elementLocated(this.applyButton), 10000);
  }

  async submitEmptyApplication() {
    await this.openApplyLeave();
    await this.driver.wait(async (driver) => {
      const buttons = await driver.findElements(this.applyButton);
      if (buttons.length > 0) {
        await driver.executeScript('arguments[0].click();', buttons[0]);
        return true;
      }
      return false;
    }, 10000);
    await this.driver.wait(until.elementLocated(this.validationErrors), 10000);
  }

  async selectFirstOption() {
    const dropdown = (
      await this.driver.findElements(By.css('.oxd-select-text'))
    )[0];
    await dropdown.click();
    const options = By.css('[role="option"]');
    await this.driver.wait(until.elementLocated(options), 10000);
    const available = await this.driver.findElements(options);
    for (const option of available) {
      if ((await option.getText()).trim() !== '-- Select --') {
        await option.click();
        return;
      }
    }
    throw new Error('No leave type option was available');
  }
}
module.exports = LeavePage;
