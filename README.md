# Automation Exercise Playwright E2E

End-to-end test automation project for Automation Exercise built with Playwright and TypeScript. The suite covers account signup and checkout flows, using environment variables for site URL and login credentials so sensitive values stay outside the repository.

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
+-- tests/
|   +-- example.spec.ts
|   +-- e2e.spec.ts
|   +-- e2e-1.spec.ts
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

The active Playwright tests are stored in the `tests` directory.

- `tests/example.spec.ts` creates a new customer account and fills the signup form.
- `tests/e2e.spec.ts` logs in with credentials from `.env`, adds products to the cart, completes checkout, submits payment details, and verifies the order confirmation.
- `tests/e2e-1.spec.ts` contains a commented checkout flow draft and does not currently run.

## Configuration

Playwright configuration is defined in `playwright.config.ts`.

Key settings:

- Tests are loaded from the `tests` directory
- Tests run against Chromium, Firefox, and WebKit
- HTML reports are generated after test runs
- Traces are collected on the first retry
- CI retries failed tests twice
- `BASE_URL`, `EMAIL`, and `PASSWORD` are loaded from `.env` locally

## CI

GitHub Actions runs Playwright tests on pushes to the `main` branch. The workflow uses the `testing` environment, reads `BASE_URL`, `EMAIL`, and `PASSWORD` from GitHub Secrets, validates that they are present, installs dependencies, installs Playwright browsers with system dependencies, runs the tests, and uploads the Playwright HTML report as an artifact.

## GitHub Secrets

Add these secrets in the GitHub repository or the `testing` environment before running the workflow:

- `BASE_URL`
- `EMAIL`
- `PASSWORD`

