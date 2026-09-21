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
npm run test:smoke
npm run test:regression
npm run test:headed
npm run report
```

`test:smoke` runs the critical login, dashboard, and logout flow. `test:regression` runs all other specs and excludes the smoke suite.

## Test Isolation

Each UI test creates its own browser session and logs in through `beforeEach`, then closes the session in `afterEach`. This intentionally repeats login so tests remain independent and do not depend on execution order or state left by another test. A shared `before` session is only suitable for read-only tests; it is not used globally because flows such as logout change the authenticated state.

The current suites contain 3 smoke tests and 28 regression tests. Browser console warnings from Chrome or the remote demo application do not affect the test result unless Mocha reports a failed test.

Some OrangeHRM demo accounts do not receive every module permission. Leave, Time, or Recruitment checks are reported as pending when the corresponding sidebar menu is not provided by the server; this distinguishes unavailable permissions from a real UI failure.

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
