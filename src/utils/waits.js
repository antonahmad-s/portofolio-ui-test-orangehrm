const { until } = require('selenium-webdriver');
async function waitForUrlContains(driver, value, timeout = 10000) {
  return driver.wait(until.urlContains(value), timeout);
}
async function waitForText(driver, locator, value, timeout = 10000) {
  return driver.wait(async (currentDriver) => {
    const element = await currentDriver.findElement(locator);
    return (await element.getText())
      .toLowerCase()
      .includes(value.toLowerCase());
  }, timeout);
}
module.exports = { waitForUrlContains, waitForText };
