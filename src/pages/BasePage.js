const {By,until}=require("selenium-webdriver");

class BasePage{
  constructor(driver){this.driver=driver;}
  async waitVisible(locator,timeout=10000){return this.driver.wait(until.elementLocated(locator),timeout);}
  async click(locator){await this.waitVisible(locator); await this.driver.findElement(locator).click();}
  async type(locator,value){const el=await this.waitVisible(locator); await el.clear(); await el.sendKeys(value);}
  async text(locator){return this.driver.findElement(locator).getText();}
  async url(){return this.driver.getCurrentUrl();}
}
module.exports=BasePage;