const {By}=require("selenium-webdriver");
async function selectByVisibleText(driver,text){
  const options=await driver.findElements(By.css(".oxd-select-dropdown .oxd-select-option"));
  for(const option of options){if((await option.getText()).trim()===text){await option.click(); return true;}}
  return false;
}
module.exports={selectByVisibleText};