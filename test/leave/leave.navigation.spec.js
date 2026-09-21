const {expect}=require("chai");
const {By,until}=require("selenium-webdriver");
const {createDriver}=require("../../src/utils/driver");
const LoginPage=require("../../src/pages/LoginPage");
const config=require("../../config/env");

describe("Leave - navigation",function(){
  let driver;
  beforeEach(async function(){
    driver=await createDriver();
    const login=new LoginPage(driver);
    await login.open();
    await login.login(config.username,config.password);
    await driver.get(config.baseUrl+"/web/index.php/leave/viewLeaveModule");
    await driver.wait(until.elementLocated(By.css("body")),10000);
  });
  afterEach(async function(){if(driver) await driver.quit();});

  it("should load Leave page",async function(){
    expect(await driver.getCurrentUrl()).to.contain("/leave/");
  });

  it("should display leave navigation content",async function(){
    const text=(await driver.findElement(By.css("body")).getText()).toLowerCase();
    expect(text).to.contain("leave");
  });
});