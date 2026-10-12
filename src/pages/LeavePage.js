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
  formLoader = By.css('.oxd-form-loader');
  noLeaveTypesMessage = By.xpath(
    "//*[contains(normalize-space(), 'No Leave Types with Leave Balance')]"
  );
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

  async hasAvailableLeaveType(label) {
    await this.waitForFormReady();
    if ((await this.driver.findElements(this.noLeaveTypesMessage)).length > 0) {
      return false;
    }

    const options = By.css('[role="option"]');
    if ((await this.driver.findElements(options)).length === 0) {
      await this.openLeaveTypeDropdown();
    }

    const available = await this.driver.findElements(options);
    if (!label) return available.length > 0;
    for (const option of available) {
      if ((await option.getText()).trim() === label) return true;
    }
    return false;
  }

  async waitForFormReady() {
    await this.driver.wait(async (driver) => {
      const loaders = await driver.findElements(this.formLoader);
      if (loaders.length === 0) return true;
      try {
        return !(await loaders[0].isDisplayed());
      } catch (error) {
        if (error.name === 'StaleElementReferenceError') return false;
        throw error;
      }
    }, 10000);
  }

  async submitEmptyApplication() {
    await this.clickApplyButton();
    await this.driver.wait(until.elementLocated(this.validationErrors), 10000);
  }

  async submitLeaveRequest({ leaveType, fromDate, toDate, comment = '' }) {
    await this.selectLeaveType(leaveType);
    const dateInputs = await this.driver.findElements(this.dateInputs);
    await dateInputs[0].clear();
    await dateInputs[0].sendKeys(fromDate);
    await dateInputs[1].clear();
    await dateInputs[1].sendKeys(toDate);

    const commentInput = await this.driver.findElement(
      By.css('textarea[placeholder="Type here"]')
    );
    await commentInput.clear();
    await commentInput.sendKeys(comment);

    await this.clickApplyButton();
    await this.driver.wait(until.elementLocated(this.successToast), 10000);
  }

  async selectLeaveType(label) {
    const options = By.css('[role="option"]');
    if ((await this.driver.findElements(options)).length === 0) {
      await this.openLeaveTypeDropdown();
    }
    const available = await this.driver.findElements(options);
    for (const option of available) {
      if ((await option.getText()).trim() === label) {
        await option.click();
        return;
      }
    }
    throw new Error(`Leave type '${label}' was not found`);
  }

  async openLeaveTypeDropdown() {
    const options = By.css('[role="option"]');
    await this.driver.wait(async (driver) => {
      try {
        const dropdowns = await driver.findElements(By.css('.oxd-select-text'));
        for (const dropdown of dropdowns) {
          const text = (await dropdown.getText()).trim();
          if (text.includes('Select') || text.includes('-- Select --')) {
            await dropdown.click();
            return (await driver.findElements(options)).length > 0;
          }
        }
        return false;
      } catch (error) {
        if (error.name === 'StaleElementReferenceError') return false;
        throw error;
      }
    }, 10000);
  }

  async clickApplyButton() {
    await this.driver.wait(async (driver) => {
      try {
        const button = await driver.findElement(this.applyButton);
        await button.click();
        return true;
      } catch (error) {
        if (error.name === 'StaleElementReferenceError') return false;
        throw error;
      }
    }, 10000);
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
