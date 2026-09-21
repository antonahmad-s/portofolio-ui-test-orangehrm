const {Builder}=require("selenium-webdriver");
const chrome=require("selenium-webdriver/chrome");
const chromedriver=require("chromedriver");
const config=require("../../config/env");

async function createDriver(){
  const options=new chrome.Options();
  if(config.headless) options.addArguments("--headless=new");
  options.addArguments("--window-size=1440,1000","--disable-gpu","--no-sandbox");
  const service=new chrome.ServiceBuilder(chromedriver.path);
  return new Builder()
    .forBrowser(config.browser)
    .setChromeService(service)
    .setChromeOptions(options)
    .build();
}

module.exports={createDriver};
