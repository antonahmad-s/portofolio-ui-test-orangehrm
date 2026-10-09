const { By, until } = require('selenium-webdriver');
const config = require('../../config/env');

class RecruitmentPage {
  constructor(driver) {
    this.driver = driver;
  }

  firstName = By.name('firstName');
  middleName = By.name('middleName');
  lastName = By.name('lastName');
  email = By.css("input[placeholder='Type here']");
  saveButton = By.css("button[type='submit']");
  validationErrors = By.css('.oxd-input-field-error-message');
  successToast = By.css('.oxd-toast-content-text');

  async openAddCandidate() {
    await this.driver.get(
      config.baseUrl + '/web/index.php/recruitment/addCandidate'
    );
    await this.driver.wait(until.elementLocated(this.firstName), 10000);
  }

  async submitEmptyCandidate() {
    await this.openAddCandidate();
    await this.driver.findElement(this.saveButton).click();
    await this.driver.wait(until.elementLocated(this.validationErrors), 10000);
  }

  async addCandidate({ firstName, middleName = '', lastName, email }) {
    await this.openAddCandidate();
    await this.driver.findElement(this.firstName).sendKeys(firstName);
    if (middleName)
      await this.driver.findElement(this.middleName).sendKeys(middleName);
    await this.driver.findElement(this.lastName).sendKeys(lastName);
    const emailInput = (await this.driver.findElements(this.email))[0];
    await emailInput.sendKeys(email);
    await this.selectFirstVacancy();
    await this.driver.findElement(this.saveButton).click();
    await this.driver.wait(until.elementLocated(this.successToast), 10000);
  }

  async selectFirstVacancy() {
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
    throw new Error('No recruitment vacancy was available');
  }
}

module.exports = RecruitmentPage;
