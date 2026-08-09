import { Page, expect } from '@playwright/test';

export class PaymentDonePage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async confirmOrderPlaced() {
      await expect(this.page.getByText('Order Placed!')).toBeVisible();
      await expect(this.page.getByText('Congratulations! Your order')).toBeVisible();
  }
}