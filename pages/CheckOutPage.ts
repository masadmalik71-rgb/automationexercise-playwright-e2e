import { Page, expect } from "@playwright/test";
import { CustomerData } from "../utils/datamaker";

export class CheckOutPage{
  readonly page:Page;

  constructor(page:Page){
      this.page = page;
  }

  async confirmCustomerDetail(customerData: CustomerData) {
    const deliveryAddress = this.page.locator('#address_delivery');
    const invoiceAddress = this.page.locator('#address_invoice');

    await expect(deliveryAddress).toContainText(`${customerData.title} ${customerData.firstName} ${customerData.lastName}`);

    await expect(deliveryAddress).toContainText(`${customerData.address1}`);

    await expect(deliveryAddress).toContainText(`${customerData.city} ${customerData.state} ${customerData.zipcode}`);

    await expect(deliveryAddress).toContainText(customerData.country);

    await expect(deliveryAddress).toContainText(`${customerData.mobileNumber}`);

    await expect(invoiceAddress).toContainText(`${customerData.title} ${customerData.firstName} ${customerData.lastName}`);

    await expect(invoiceAddress).toContainText(`${customerData.address1}`);

    await expect(invoiceAddress).toContainText(`${customerData.city} ${customerData.state} ${customerData.zipcode}`);

    await expect(invoiceAddress).toContainText(`${customerData.country}`);

    await expect(invoiceAddress).toContainText(`${customerData.mobileNumber}`);

    await this.page.locator('textarea[name="message"]').fill(`${customerData.checkoutMessage}`);

  }

  async clickOnPlaceOrder() {
    const placeOrderButton = this.page.getByRole('link', {
      name: /Place Order/i,
    });

    await expect(placeOrderButton).toBeVisible();

    await placeOrderButton.click();

    // Verify navigation happened
    await expect(this.page).toHaveURL(/\/payment/, {
      timeout: 15_000,
    });

    await expect(
      this.page.locator('input[name="name_on_card"]')
    ).toBeVisible({
      timeout: 15_000,
    });
  }
}