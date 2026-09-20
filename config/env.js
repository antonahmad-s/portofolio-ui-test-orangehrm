require("dotenv").config();

module.exports={
  baseUrl: process.env.BASE_URL || "https://opensource-demo.orangehrmlive.com",
  username: process.env.USERNAME || "Admin",
  password: process.env.PASSWORD || "admin123",
  headless: String(process.env.HEADLESS || "true").toLowerCase() === "true",
  browser: process.env.BROWSER || "chrome"
};