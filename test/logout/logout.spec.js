const {expect}=require("chai");
const {createDriver}=require("../../src/utils/driver");
const LoginPage=require("../../src/pages/LoginPage");
const DashboardPage=require("../../src/pages/DashboardPage");
const config=require("../../config/env");

describe("Logout",function(){
  let driver,dashboard;
  beforeEach(async function(){
    driver=await createDriver();
    const login=new LoginPage(driver);
    dashboard=new DashboardPage(driver);
    await login.open();
    await login.login(config.username,config.password);
  });
  afterEach(async function(){if(driver) await driver.quit();});

  it("should logout successfully",async function(){
    await dashboard.logout();
    expect(await driver.getCurrentUrl()).to.contain("/auth/login");
  });
});