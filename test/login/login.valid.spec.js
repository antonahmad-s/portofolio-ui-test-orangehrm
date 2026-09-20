const {expect}=require("chai");
const {createDriver}=require("../../src/utils/driver");
const LoginPage=require("../../src/pages/LoginPage");
const DashboardPage=require("../../src/pages/DashboardPage");
const config=require("../../config/env");
const {captureScreenshot}=require("../../src/utils/screenshot");

describe("Login - valid credentials",function(){
  let driver,login,dashboard;
  beforeEach(async function(){driver=await createDriver();login=new LoginPage(driver);dashboard=new DashboardPage(driver);await login.open();});
  afterEach(async function(){if(this.currentTest.state==="failed") await captureScreenshot(driver,this.currentTest.title); if(driver) await driver.quit();});
  it("should login successfully",async function(){
    await login.login(config.username,config.password);
    expect(await dashboard.isDisplayed()).to.equal(true);
  });
});