const {expect}=require("chai");
const {createDriver}=require("../../src/utils/driver");
const LoginPage=require("../../src/pages/LoginPage");
const {By}=require("selenium-webdriver");
const {captureScreenshot}=require("../../src/utils/screenshot");

describe("Login - field validation",function(){
  let driver,login;
  beforeEach(async function(){driver=await createDriver();login=new LoginPage(driver);await login.open();});
  afterEach(async function(){if(this.currentTest.state==="failed") await captureScreenshot(driver,this.currentTest.title); if(driver) await driver.quit();});

  it("should prevent login when username is empty",async function(){
    await driver.findElement(login.password).sendKeys("admin123");
    await driver.findElement(login.loginButton).click();
    const errors=await driver.findElements(By.css(".oxd-input-field-error-message"));
    expect(errors.length).to.be.greaterThan(0);
  });

  it("should prevent login when password is empty",async function(){
    await driver.findElement(login.username).sendKeys("Admin");
    await driver.findElement(login.loginButton).click();
    const errors=await driver.findElements(By.css(".oxd-input-field-error-message"));
    expect(errors.length).to.be.greaterThan(0);
  });
});