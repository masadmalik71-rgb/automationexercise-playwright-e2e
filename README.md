# Automation Exercise Playwright E2E

End-to-end test automation project for Automation Exercise built with Playwright and TypeScript. The suite creates a fresh customer in global setup, saves authenticated browser state, runs the checkout flow, and deletes the test account during global teardown.

## Tech Stack

- Node.js
- TypeScript
- Playwright Test
- dotenv
- GitHub Actions

## Project Structure

```text
.
+-- .github/workflows/playwright.yml
+-- fixtures/
|   +-- testFixtures.ts
+-- pages/
|   +-- CheckOutPage.ts
|   +-- LoginPage.ts
|   +-- PaymentDonePage.ts
|   +-- PaymentPage.ts
|   +-- ProductsPage.ts
|   +-- SignUpPage.ts
|   +-- ViewCartPage.ts
+-- tests/
|   +-- e2e.spec.ts
+-- utils/
|   +-- datamaker.ts
+-- globalSetup.ts
+-- globalTeardown.ts
+-- playwright.config.ts
+-- package.json
+-- package-lock.json
+-- tsconfig.json
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
BASE_URL=https://automationexercise.com
```

Customer data is generated with Faker during `globalSetup.ts`. Playwright stores the authenticated session and generated customer data under `playwright/.auth/`.

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

The Playwright specs are stored in the `tests` directory.

- `tests/e2e.spec.ts` contains the active test case: `should login, checkout product, and place order`.
- The test uses page object fixtures from `fixtures/testFixtures.ts`.
- The flow adds products to the cart, proceeds through checkout, submits payment details, and verifies the order confirmation.
- `globalSetup.ts` creates and logs in a new customer before tests run.
- `globalTeardown.ts` deletes the test account after the run.

## Configuration

Playwright configuration is defined in `playwright.config.ts`.

Key settings:

- Tests are loaded from the `tests` directory
- Tests run against Chromium
- Additional browser projects are present in the config as commented examples
- HTML reports are generated after test runs
- Traces are collected on the first retry
- CI retries failed tests twice
- `BASE_URL` is loaded from `.env` locally
- Auth state is reused from `playwright/.auth/user.json`

## CI

GitHub Actions runs Playwright tests on pushes to the `main` branch. The workflow uses the `testing` environment, reads `BASE_URL` from GitHub Secrets, validates that it is present, installs dependencies, installs Playwright browsers with system dependencies, runs the tests, and uploads the Playwright HTML report as an artifact.

## GitHub Secrets

Add these secrets in the GitHub repository or the `testing` environment before running the workflow:

- `BASE_URL`

