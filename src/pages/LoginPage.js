const {By,until}=require("selenium-webdriver");
const config=require("../../config/env");

class LoginPage{
  constructor(driver){this.driver=driver;}
  username=By.name("username");
  password=By.name("password");
  loginButton=By.css("button[type='submit']");
  alert=By.css(".oxd-alert-content-text");

  async open(){await this.driver.get(config.baseUrl+"/web/index.php/auth/login");}
  async login(username,password){
    await this.driver.wait(until.elementLocated(this.username),10000);
    await this.driver.findElement(this.username).sendKeys(username);
    await this.driver.findElement(this.password).sendKeys(password);
    await this.driver.findElement(this.loginButton).click();
  }
  async getAlertText(){return (await this.driver.wait(until.elementLocated(this.alert),10000)).getText();}
}
module.exports=LoginPage;