const {By,until}=require("selenium-webdriver");

class PIMPage{
  constructor(driver){this.driver=driver;}
  menu=By.css("a[href*='/pim/viewPimModule']");
  searchInput=By.css("input[placeholder='Type for hints...']");
  async open(){await this.driver.wait(until.elementLocated(this.menu),10000); await this.driver.findElement(this.menu).click();}
  async isDisplayed(){return Boolean(await this.driver.wait(until.elementLocated(By.css("h6.oxd-text--h6")),10000));}
}
module.exports=PIMPage;