import { chromium, expect, type FullConfig } from '@playwright/test';
import fs from 'fs';

import { LoginPage } from './pages/LoginPage';
import { SignUpPage } from './pages/SignUpPage';
import { createCustomerData } from './utils/datamaker';

async function globalSetup(config: FullConfig) {
  const baseURL = config.projects[0].use.baseURL as string;

  const browser = await chromium.launch({
    headless: true,
  });

  const context = await browser.newContext({
    baseURL,
  });

  const page = await context.newPage();

  const loginPage = new LoginPage(page);
  const signUpPage = new SignUpPage(page);

  // Generate customer ONLY ONCE
  const customerData = createCustomerData();

  await loginPage.goto();

  console.log('Current URL:', page.url());

  await page.screenshot({
      path: 'global-setup.png'
  });

  await loginPage.openSignupLoginPage();
  await loginPage.signupWithCustomerData(customerData);

  await signUpPage.fillWithSignUp(customerData);

  await expect(
    page.getByText(/Logged in as/i)
  ).toBeVisible();

  // Create auth directory
  fs.mkdirSync('playwright/.auth', {
    recursive: true,
  });

  // Save logged-in browser state
  await context.storageState({
    path: 'playwright/.auth/user.json',
  });

  // Save SAME Faker customer
  fs.writeFileSync(
    'playwright/.auth/customer.json',
    JSON.stringify(customerData, null, 2)
  );

  await browser.close();
}

export default globalSetup;