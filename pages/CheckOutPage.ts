import { Locator, Page, expect } from "@playwright/test";
import { CustomerData } from "../utils/datamaker";

export class CheckOutPage{
  readonly page:Page;
  readonly deliveryAddress: Locator;
  readonly invoiceAddress: Locator;
  readonly checkOutField: Locator;
  readonly placeOrderButton: Locator;
  readonly nameOnCardField: Locator;

  constructor(page:Page){
      this.page = page;
      this.deliveryAddress = this.page.locator('#address_delivery');
      this.invoiceAddress = this.page.locator('#address_invoice');
      this.checkOutField = this.page.locator('textarea[name="message"]');
      this.placeOrderButton = this.page.getByRole('link', { name: /Place Order/i, });
      this.nameOnCardField = this.page.locator('input[name="name_on_card"]');
  }

  async confirmCustomerDetail(customerData: CustomerData) {
    

    await expect(this.deliveryAddress).toContainText(`${customerData.title} ${customerData.firstName} ${customerData.lastName}`);

    await expect(this.deliveryAddress).toContainText(`${customerData.address1}`);

    await expect(this.deliveryAddress).toContainText(`${customerData.city} ${customerData.state} ${customerData.zipcode}`);

    await expect(this.deliveryAddress).toContainText(customerData.country);

    await expect(this.deliveryAddress).toContainText(`${customerData.mobileNumber}`);

    await expect(this.invoiceAddress).toContainText(`${customerData.title} ${customerData.firstName} ${customerData.lastName}`);

    await expect(this.invoiceAddress).toContainText(`${customerData.address1}`);

    await expect(this.invoiceAddress).toContainText(`${customerData.city} ${customerData.state} ${customerData.zipcode}`);

    await expect(this.invoiceAddress).toContainText(`${customerData.country}`);

    await expect(this.invoiceAddress).toContainText(`${customerData.mobileNumber}`);

    await this.checkOutField.fill(`${customerData.checkoutMessage}`);

  }

  async clickOnPlaceOrder() {

    await expect(this.placeOrderButton).toBeVisible();

    await this.placeOrderButton.click();

    // Verify navigation happened
    await expect(this.page).toHaveURL(/\/payment/, {
      timeout: 15_000,
    });

    await expect(this.nameOnCardField).toBeVisible({ timeout: 15_000, });
  }
}