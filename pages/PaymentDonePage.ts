import { Locator, Page, expect } from '@playwright/test';

export class PaymentDonePage {
  readonly page: Page;
  readonly orderPlacedLocator: Locator;
  readonly congratsLocator: Locator;

  constructor(page: Page) {
    this.page = page;
    this.orderPlacedLocator = this.page.getByText('Order Placed!');
    this.congratsLocator = this.page.getByText('Congratulations! Your order');
  }

  async confirmOrderPlaced() {
      await expect(this.orderPlacedLocator).toBeVisible();
      await expect(this.congratsLocator).toBeVisible();
  }
}