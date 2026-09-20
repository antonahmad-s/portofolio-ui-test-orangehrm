const {expect}=require("chai");
const {createDriver}=require("../../src/utils/driver");
const LoginPage=require("../../src/pages/LoginPage");
const {captureScreenshot}=require("../../src/utils/screenshot");

describe("Login - invalid credentials",function(){
  let driver,login;
  beforeEach(async function(){driver=await createDriver();login=new LoginPage(driver);await login.open();});
  afterEach(async function(){if(this.currentTest.state==="failed") await captureScreenshot(driver,this.currentTest.title); if(driver) await driver.quit();});
  it("should show invalid credentials",async function(){
    await login.login("InvalidUser","InvalidPassword");
    expect(await login.getAlertText()).to.contain("Invalid credentials");
  });
});