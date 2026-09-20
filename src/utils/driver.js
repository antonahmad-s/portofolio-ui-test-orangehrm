const {Builder}=require("selenium-webdriver");
const chrome=require("selenium-webdriver/chrome");
const config=require("../../config/env");

async function createDriver(){
  const options=new chrome.Options();
  if(config.headless) options.addArguments("--headless=new");
  options.addArguments("--window-size=1440,1000","--disable-gpu","--no-sandbox");
  return new Builder().forBrowser(config.browser).setChromeOptions(options).build();
}

module.exports={createDriver};