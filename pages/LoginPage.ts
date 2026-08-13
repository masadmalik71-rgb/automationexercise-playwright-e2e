import { Locator, Page, expect } from '@playwright/test';
import type { CustomerData } from '../utils/datamaker';

export class LoginPage {
  readonly page: Page;
  readonly signupLoginLink: Locator;
  readonly signupEmailField: Locator;
  readonly signUpNameField: Locator;
  readonly signUpButton: Locator;
  readonly loginEmailField: Locator;
  readonly loginPasswordField: Locator;
  readonly loginButton: Locator;
  readonly loginAsText: Locator;
  readonly deleteAccountButton: Locator;
  readonly subscriptionEmailField: Locator
  readonly subscriptionButton: Locator;
  readonly subscribedSuccess: Locator;
  readonly cartButton: Locator;
  readonly logoutButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.signupLoginLink = this.page.getByRole('link', { name: /Signup\s*\/\s*Login/i,});
    this.signupEmailField = this.page.locator('form').filter({ hasText: 'Signup' }).getByPlaceholder('Email Address');
    this.signUpNameField = this.page.getByRole('textbox', { name: 'Name' });
    this.signUpButton = this.page.getByRole('button', { name: 'Signup' });
    this.loginEmailField = this.page.locator('form').filter({ hasText: 'Login' }).getByPlaceholder('Email Address');
    this.loginPasswordField = this.page.getByRole('textbox', { name: 'Password' });
    this.loginButton = this.page.getByRole('button', { name: 'Login' });
    this.loginAsText = this.page.getByText(/Logged in as/i);
    this.deleteAccountButton = this.page.getByRole('link', { name: 'Delete Account' });
    this.subscriptionEmailField = this.page.getByRole('textbox', { name: 'Your email address' });
    this.subscriptionButton = this.page.locator('#subscribe');
    this.subscribedSuccess = this.page.getByText('You have been successfully subscribed!');
    this.cartButton = this.page.getByRole('link', { name: 'Cart' });
    this.logoutButton = this.page.getByRole('link', { name: 'Logout' });
  }

  async goto() {
    await this.page.goto('/');
    await this.page.waitForLoadState('domcontentloaded');
    // await expect(this.page).toHaveURL(/automationexercise\.com/);
  }

  async openSignupLoginPage() {

    await expect(this.signupLoginLink).toBeVisible({
      timeout: 15_000,
    });

    await this.signupLoginLink.click();

    await expect(this.page).toHaveURL('/login');
  }

  async signupWithCustomerData(customerData: CustomerData) {
    await this.signUpNameField.fill(`${customerData.firstName} ${customerData.lastName}`);

    await this.signupEmailField.fill(customerData.email);

    await this.signUpButton.click();
    await expect(this.page).toHaveURL('/signup');
  }

  async loginWithCustomerData(customerData: CustomerData){
    await this.loginEmailField.fill(customerData.email);
    await this.loginEmailField.press('Tab');
    await this.loginPasswordField.fill(customerData.password);
    await this.loginButton.click();
    await this.page.waitForLoadState('domcontentloaded');
    await expect(this.loginAsText).toBeVisible();
  }

  async deleteAccount() {
    await this.deleteAccountButton.click();
  }

  async subscribeForEmail(customerData: CustomerData) {
    await this.subscriptionEmailField.scrollIntoViewIfNeeded();
    await expect(this.subscriptionEmailField).toBeVisible();
    await this.subscriptionEmailField.fill(customerData.email);
    await this.subscriptionButton.click();
    await expect(this.subscribedSuccess).toBeVisible();
  }

  async clickOnCart() {
    await this.cartButton.click();
    await expect(this.page).toHaveURL('/view_cart');
  }

  async clickOnLogout() {
    await this.logoutButton.click();
  }

  async isUserLoggedIn(): Promise<boolean> {

    return await this.loginAsText.isVisible();
  }
}
