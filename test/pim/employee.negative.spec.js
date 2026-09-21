const {expect}=require("chai");
const {By}=require("selenium-webdriver");
const {createDriver}=require("../../src/utils/driver");
const LoginPage=require("../../src/pages/LoginPage");
const config=require("../../config/env");

describe("PIM - negative validation",function(){
  let driver;
  beforeEach(async function(){
    driver=await createDriver();
    const login=new LoginPage(driver);
    await login.open();
    await login.login(config.username,config.password);
    await driver.get(config.baseUrl+"/web/index.php/pim/addEmployee");
  });
  afterEach(async function(){if(driver) await driver.quit();});

  it("should show required validation when employee is submitted without mandatory fields",async function(){
    const buttons=await driver.findElements(By.css("button"));
    const texts=await Promise.all(buttons.map(b=>b.getText()));
    const save=buttons[texts.findIndex(t=>t.trim()==="Save")];
    if(save) await save.click();
    const errors=await driver.findElements(By.css(".oxd-input-field-error-message"));
    expect(errors.length).to.be.greaterThan(0);
  });
});