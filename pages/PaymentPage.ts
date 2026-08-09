import { Page } from '@playwright/test';
import { CustomerData } from '../utils/datamaker';

export class PaymentPage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async paymentDetailsPage(customerData: CustomerData) {
    await this.page.locator('input[name="name_on_card"]').fill(`${customerData.firstName} ${customerData.lastName}`);
    await this.page.locator('input[name="card_number"]').fill(customerData.creditCardNumber);
    await this.page.getByRole('textbox', { name: 'ex.' }).fill(customerData.creditCardCVV);
    await this.page.getByRole('textbox', { name: 'MM' }).fill(customerData.creditCardExpiryMonth);
    await this.page.getByRole('textbox', { name: 'YYYY' }).fill(customerData.creditCardExpiryYear);
    await this.page.getByRole('button', { name: 'Pay and Confirm Order' }).click();
  }
}