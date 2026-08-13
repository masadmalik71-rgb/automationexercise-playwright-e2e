import { Locator, Page } from '@playwright/test';
import { CustomerData } from '../utils/datamaker';

export class PaymentPage {
  readonly page: Page;
  readonly nameOnCardField: Locator;
  readonly creditCardNumberField: Locator;
  readonly creditCardCVVField: Locator;
  readonly creditCardExpiryMonthField: Locator;
  readonly creditCardExpiryYearField: Locator;
  readonly payAndConfirmButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.nameOnCardField = this.page.locator('input[name="name_on_card"]');
    this.creditCardNumberField = this.page.locator('input[name="card_number"]');
    this.creditCardCVVField = this.page.getByRole('textbox', { name: 'ex.' });
    this.creditCardExpiryMonthField = this.page.getByRole('textbox', { name: 'MM' });
    this.creditCardExpiryYearField = this.page.getByRole('textbox', { name: 'YYYY' });
    this.payAndConfirmButton = this.page.getByRole('button', { name: 'Pay and Confirm Order' });
  }

  async paymentDetailsPage(customerData: CustomerData) {
    await this.nameOnCardField.fill(`${customerData.firstName} ${customerData.lastName}`);
    await this.creditCardNumberField.fill(customerData.creditCardNumber);
    await this.creditCardCVVField.fill(customerData.creditCardCVV);
    await this.creditCardExpiryMonthField.fill(customerData.creditCardExpiryMonth);
    await this.creditCardExpiryYearField.fill(customerData.creditCardExpiryYear);
    await this.payAndConfirmButton.click();
  }
}