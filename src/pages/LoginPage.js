const { By, until } = require('selenium-webdriver');
const config = require('../../config/env');

class LoginPage {
  constructor(driver) {
    this.driver = driver;
  }
  username = By.name('username');
  password = By.name('password');
  loginButton = By.css("button[type='submit']");
  alert = By.css('.oxd-alert-content-text');
  dashboardHeader = By.css('h6.oxd-topbar-header-breadcrumb-module');
  mainMenuItem = By.css('.oxd-main-menu-item');

  async open() {
    await this.driver.get(config.baseUrl + '/web/index.php/auth/login');
    await this.driver.wait(until.elementLocated(this.username), 10000);
  }
  async login(username, password) {
    await this.driver.wait(until.elementLocated(this.username), 10000);
    await this.driver.findElement(this.username).sendKeys(username);
    await this.driver.findElement(this.password).sendKeys(password);
    await this.driver.findElement(this.loginButton).click();
    await this.driver.wait(async (driver) => {
      const dashboard = await driver.findElements(this.dashboardHeader);
      const alert = await driver.findElements(this.alert);
      return dashboard.length > 0 || alert.length > 0;
    }, 10000);
    const dashboard = await this.driver.findElements(this.dashboardHeader);
    if (dashboard.length > 0) {
      await this.driver.wait(async (driver) => {
        return (await driver.findElements(this.mainMenuItem)).length > 0;
      }, 20000);
    }
  }
  async getAlertText() {
    return (
      await this.driver.wait(until.elementLocated(this.alert), 10000)
    ).getText();
  }
}
module.exports = LoginPage;
