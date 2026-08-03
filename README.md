# Automation Practice

End-to-end test automation project built with Playwright and TypeScript. The current test covers a user checkout flow, including login, adding products to the cart, proceeding through checkout, submitting payment details, and verifying that the order is placed successfully.

## Tech Stack

- Node.js
- TypeScript
- Playwright Test
- dotenv
- GitHub Actions

## Project Structure

```text
.
├── .github/workflows/playwright.yml
├── tests/e2e.spec.ts
├── playwright.config.ts
├── package.json
├── package-lock.json
└── tsconfig.json
```

## Prerequisites

- Node.js installed
- npm installed
- Playwright browser dependencies installed

## Setup

Install project dependencies:

```bash
npm ci
```

Install Playwright browsers:

```bash
npx playwright install
```

Create a `.env` file in the project root:

```env
BASE_URL=https://example.com
EMAIL=your-email@example.com
PASSWORD=your-password
```

## Running Tests

Run all tests:

```bash
npx playwright test
```

Run tests in a specific browser:

```bash
npx playwright test --project=chromium
```

Open the latest HTML report:

```bash
npx playwright show-report
```

## Test Coverage

The current Playwright test performs the following flow:

- Opens the configured base URL
- Logs in with credentials from `.env`
- Adds products to the cart
- Opens the cart and proceeds to checkout
- Adds an order message
- Places the order with card details
- Verifies the order confirmation message

## Configuration

Playwright configuration is defined in `playwright.config.ts`.

Key settings:

- Tests are loaded from the `tests` directory
- Tests run against Chromium, Firefox, and WebKit
- HTML reports are generated after test runs
- Traces are collected on the first retry
- CI retries failed tests twice

## CI

GitHub Actions runs Playwright tests on pushes to the `main` branch. The workflow installs dependencies, installs Playwright browsers with system dependencies, runs the tests, and uploads the Playwright HTML report as an artifact.

