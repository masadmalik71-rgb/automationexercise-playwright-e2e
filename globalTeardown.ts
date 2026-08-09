import { chromium, expect, type FullConfig } from '@playwright/test';
import { LoginPage } from './pages/LoginPage';

async function globalTeardown(config: FullConfig) {
  const baseURL = config.projects[0].use.baseURL as string;

  const browser = await chromium.launch({
    headless: true,
  });

  const context = await browser.newContext({
    baseURL,
    storageState: 'playwright/.auth/user.json',
  });

  const page = await context.newPage();

  const loginPage = new LoginPage(page);

  await loginPage.goto();

  await expect(
    page.getByText(/Logged in as/i)
  ).toBeVisible();

  await loginPage.deleteAccount();

  await expect(
    page.getByText(/Account Deleted/i)
  ).toBeVisible();

  await browser.close();
}

export default globalTeardown;