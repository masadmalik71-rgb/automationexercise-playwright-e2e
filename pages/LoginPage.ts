import { Page, expect } from '@playwright/test';
import type { CustomerData } from '../utils/datamaker';

export class LoginPage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async goto() {
    await this.page.goto('/');
    await expect(this.page).toHaveURL(/automationexercise\.com/);
  }

  async openSignupLoginPage() {
    const signupLoginLink = this.page.getByRole('link', {
      name: /Signup\s*\/\s*Login/i,
    });

    await expect(signupLoginLink).toBeVisible({
      timeout: 15_000,
    });

    await signupLoginLink.click();

    await expect(this.page).toHaveURL('/login');
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
    await expect(this.page).toHaveURL('/signup');
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

  async subscribeForEmail(customerData: CustomerData) {
    await this.page.getByRole('textbox', { name: 'Your email address' }).scrollIntoViewIfNeeded();
    await expect(this.page.getByRole('textbox', { name: 'Your email address' })).toBeVisible();
    await this.page.getByRole('textbox', { name: 'Your email address' }).fill(customerData.email);
    await this.page.locator('#subscribe').click();
    await expect(this.page.getByText('You have been successfully subscribed!')).toBeVisible();
  }

  async clickOnCart() {
    await this.page.getByRole('link', { name: 'Cart' }).click();
    await expect(this.page).toHaveURL('/view_cart');
  }

  async clickOnProduct() {
    await this.page.getByRole('link', { name: 'Products' }).click();
    await expect(this.page).toHaveURL('/products');
  }
}
