require('dotenv').config();

module.exports = {
  baseUrl: process.env.BASE_URL || 'https://opensource-demo.orangehrmlive.com',
  username: process.env.ORANGEHRM_USERNAME || 'Admin',
  password: process.env.ORANGEHRM_PASSWORD || 'admin123',
  headless: String(process.env.HEADLESS || 'false').toLowerCase() === 'true',
  browser: process.env.BROWSER || 'chrome',
};
