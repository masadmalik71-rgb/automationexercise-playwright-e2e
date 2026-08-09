import { Page, expect } from '@playwright/test';
import type { CustomerData } from '../utils/datamaker';

export class LoginPage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async goto() {
    await this.page.goto('/');
  }

  async openSignupLoginPage() {
    const signupLoginLink = this.page.getByRole('link', {
      name: 'Signup / Login',
    });

    await expect(signupLoginLink).toBeVisible({
      timeout: 15_000,
    });

    await signupLoginLink.click();

    await this.page.waitForURL('**/login');
  }

  async signupWithCustomerData(customerData: CustomerData) {
    await this.page
      .getByRole('textbox', { name: 'Name' })
      .fill(`${customerData.firstName} ${customerData.lastName}`);

    await this.page
      .locator('form')
      .filter({ hasText: 'Signup' })
      .getByPlaceholder('Email Address')
      .fill(customerData.email);

    await this.page.getByRole('button', { name: 'Signup' }).click();
    await this.page.waitForURL('/signup');
  }

  async loginWithCustomerData(){
    await this.page.goto('/');
    await this.page.getByRole('link', { name: 'Signup / Login' }).click();
    await this.page.locator('form').filter({ hasText: 'Login' }).getByPlaceholder('Email Address').fill(`${process.env.EMAIL}`);
    await this.page.locator('form').filter({ hasText: 'Login' }).getByPlaceholder('Email Address').press('Tab');
    await this.page.getByRole('textbox', { name: 'Password' }).fill(`${process.env.PASSWORD}`);
    await this.page.getByRole('button', { name: 'Login' }).click();
  }

  async deleteAccount() {
    await this.page.getByRole('link', { name: 'Delete Account' }).click();
  }
}
