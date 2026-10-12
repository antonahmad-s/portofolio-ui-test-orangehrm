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
  searchInput = By.css("input[placeholder='Type for hints...']");
  validationErrors = By.css('.oxd-input-field-error-message');
  successToast = By.css('.oxd-toast-content-text');
  tableRows = By.css('.oxd-table-body .oxd-table-row');

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

  async openCandidateList() {
    await this.driver.get(
      config.baseUrl + '/web/index.php/recruitment/viewCandidates'
    );
    await this.driver.wait(until.elementLocated(By.css('.oxd-table')), 10000);
  }

  async searchCandidate(firstName) {
    await this.openCandidateList();
    const input = await this.driver.wait(
      until.elementLocated(this.searchInput),
      10000
    );
    await input.clear();
    await input.sendKeys(firstName);
    await this.clickButton('Search');
    await this.driver.wait(
      until.elementLocated(By.css('.oxd-table-body')),
      10000
    );
    await this.driver.wait(
      until.elementLocated(this.candidateRow(firstName)),
      10000
    );
  }

  async findCandidateRow(firstName) {
    return this.driver.findElement(this.candidateRow(firstName));
  }

  async deleteCandidate(firstName) {
    await this.searchCandidate(firstName);
    const row = await this.findCandidateRow(firstName);
    const actions = await row.findElements(By.css('button'));
    if (actions.length < 2) {
      throw new Error(`Delete action was not found for candidate '${firstName}'`);
    }
    await actions[actions.length - 1].click();
    const confirm = By.xpath("//button[normalize-space()='Yes, Delete']");
    await this.driver.wait(until.elementLocated(confirm), 10000);
    await this.driver.findElement(confirm).click();
    await this.driver.wait(until.stalenessOf(row), 10000);
    await this.driver.wait(until.elementLocated(this.successToast), 10000);
  }

  candidateRow(firstName) {
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
        await button.click();
        return;
      }
    }
    throw new Error(`Button '${label}' was not found`);
  }

  async selectFirstVacancy() {
    const options = By.css('[role="option"]');
    await this.driver.wait(async (driver) => {
      try {
        let available = await driver.findElements(options);
        if (available.length === 0) {
          const dropdowns = await driver.findElements(By.css('.oxd-select-text'));
          if (dropdowns.length === 0) return false;
          await dropdowns[0].click();
          available = await driver.findElements(options);
        }
        for (const option of available) {
          if ((await option.getText()).trim() !== '-- Select --') {
            await option.click();
            return true;
          }
        }
        return false;
      } catch (error) {
        if (error.name === 'StaleElementReferenceError') return false;
        throw error;
      }
    }, 10000);
  }
}

module.exports = RecruitmentPage;
