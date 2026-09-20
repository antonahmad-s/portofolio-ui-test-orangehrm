# OrangeHRM UI Automation Portfolio

UI automation framework for OrangeHRM using JavaScript, Selenium WebDriver, Mocha, Chai, Page Object Model, Mochawesome, dotenv, and GitHub Actions.

## Application Under Test
https://opensource-demo.orangehrmlive.com/

## Stack
- Node.js
- JavaScript
- Selenium WebDriver
- Mocha
- Chai
- Mochawesome
- dotenv
- GitHub Actions

## Coverage
- Valid login
- Invalid login
- Dashboard navigation
- PIM / employee search
- Leave module
- Logout

## Setup
```bash
npm install
cp .env.example .env
```

Populate `.env` with demo credentials.

## Run
```bash
npm test
npm run test:headed
npm run report
```

## Structure
```text
config/
src/pages/
src/utils/
src/constants/
test/login/
test/dashboard/
test/pim/
test/leave/
reports/
.github/workflows/
```

The framework demonstrates reusable page objects, environment configuration, failure screenshots, HTML reporting, and CI execution.