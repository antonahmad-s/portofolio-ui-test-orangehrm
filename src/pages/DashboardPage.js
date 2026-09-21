const { By, until } = require('selenium-webdriver');

class DashboardPage {
  constructor(driver) {
    this.driver = driver;
  }
  dashboardHeader = By.css('h6.oxd-topbar-header-breadcrumb-module');
  userDropdown = By.css('.oxd-userdropdown');
  async isDisplayed() {
    return Boolean(
      await this.driver.wait(until.elementLocated(this.dashboardHeader), 10000)
    );
  }
  async openUserMenu() {
    await this.driver.wait(until.elementLocated(this.userDropdown), 10000);
    await this.driver.findElement(this.userDropdown).click();
  }
  async logout() {
    await this.openUserMenu();
    const logoutLink = By.css("a[href='/web/index.php/auth/logout']");
    await this.driver.wait(until.elementLocated(logoutLink), 10000);
    await this.driver.findElement(logoutLink).click();
    await this.driver.wait(until.elementLocated(By.name('username')), 10000);
  }
}
module.exports = DashboardPage;
