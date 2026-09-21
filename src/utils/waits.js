const {until}=require("selenium-webdriver");
async function waitForUrlContains(driver,value,timeout=10000){return driver.wait(until.urlContains(value),timeout);}
async function waitForText(driver,locator,value,timeout=10000){return driver.wait(until.elementTextContains(locator,value),timeout);}
module.exports={waitForUrlContains,waitForText};