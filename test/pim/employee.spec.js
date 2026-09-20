const {expect}=require("chai");
const {createDriver}=require("../../src/utils/driver");
const LoginPage=require("../../src/pages/LoginPage");
const PIMPage=require("../../src/pages/PIMPage");
const config=require("../../config/env");

describe("PIM",function(){
  let driver,pim;
  beforeEach(async function(){
    driver=await createDriver();
    const login=new LoginPage(driver);
    pim=new PIMPage(driver);
    await login.open();
    await login.login(config.username,config.password);
  });
  afterEach(async function(){if(driver) await driver.quit();});
  it("should open PIM module",async function(){await pim.open(); expect(await pim.isDisplayed()).to.equal(true);});
});