# Automation Exercise Playwright E2E

End-to-end test automation project for Automation Exercise built with Playwright and TypeScript. The suite creates a fresh customer in global setup, saves authenticated browser state, runs focused product, cart, subscription, and checkout flows, and deletes the test account through the API during global teardown.

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
+-- helpers/
|   +-- productHelper.ts
+-- pages/
|   +-- CheckOutPage.ts
|   +-- HomePage.ts
|   +-- LoginPage.ts
|   +-- PaymentDonePage.ts
|   +-- PaymentPage.ts
|   +-- ProductDetailsPage.ts
|   +-- ProductsPage.ts
|   +-- SignUpPage.ts
|   +-- ViewCartPage.ts
+-- tests/
|   +-- test-case-8.spec.ts
|   +-- test-case-9.spec.ts
|   +-- test-case-10.spec.ts
|   +-- test-case-11.spec.ts
|   +-- test-case-12.spec.ts
|   +-- test-case-13.spec.ts
|   +-- test-case-14.spec.ts
|   +-- test-case-15.spec.ts
|   +-- test-case-16.spec.ts
|   +-- test-case-17.spec.ts
|   +-- test-case-18.spec.ts
+-- types/
|   +-- products.ts
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

Run tests in a specific browser project:

```bash
npx playwright test --project=chromium
npx playwright test --project=firefox
npx playwright test --project=webkit
```

Open the latest HTML report:

```bash
npx playwright show-report
```

## Test Coverage

The Playwright specs are stored in the `tests` directory and are split by Automation Exercise test case.

- `tests/test-case-8.spec.ts` verifies the all products page and product details page.
- `tests/test-case-9.spec.ts` verifies product search.
- `tests/test-case-10.spec.ts` verifies subscription from the home page.
- `tests/test-case-11.spec.ts` verifies subscription from the cart page.
- `tests/test-case-12.spec.ts` verifies adding multiple products to the cart, matching cart details, and removing products.
- `tests/test-case-13.spec.ts` verifies product quantity in the cart.
- `tests/test-case-14.spec.ts` verifies checkout after registering during the checkout flow.
- `tests/test-case-15.spec.ts` verifies the registered-user checkout and order placement flow.
- `tests/test-case-16.spec.ts` verifies checkout after logging in before checkout.
- `tests/test-case-17.spec.ts` verifies removing products from the cart.
- `tests/test-case-18.spec.ts` verifies category and subcategory product navigation.
- The tests use page object fixtures from `fixtures/testFixtures.ts`.
- Shared cart product data is represented by `types/products.ts`.
- `helpers/productHelper.ts` consolidates duplicate cart product selections by increasing quantity.
- `globalSetup.ts` creates and logs in a new customer before tests run.
- `globalTeardown.ts` deletes the test account through the Automation Exercise API after the run.

## Configuration

Playwright configuration is defined in `playwright.config.ts`.

Key settings:

- Tests are loaded from the `tests` directory
- Browser projects are enabled for Chromium, Firefox, and WebKit
- Tests are configured for full parallel mode with one worker
- HTML reports are generated after test runs
- Traces are collected on the first retry
- CI retries failed tests twice
- `BASE_URL` is required in `.env` for setup and teardown
- Playwright actions use `https://automationexercise.com` as the configured base URL
- Auth state is reused from `playwright/.auth/user.json`
- Actions time out after 15 seconds
- Navigations time out after 60 seconds

## CI

GitHub Actions runs Playwright tests on pushes to the `main` branch. The workflow uses the `testing` environment, reads `BASE_URL` from GitHub Secrets, validates that it is present, installs dependencies, installs Playwright browsers with system dependencies, runs the tests, and uploads the Playwright HTML report as an artifact.

## GitHub Secrets

Add these secrets in the GitHub repository or the `testing` environment before running the workflow:

- `BASE_URL`

