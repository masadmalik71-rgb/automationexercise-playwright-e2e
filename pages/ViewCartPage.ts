import { Page, expect } from "@playwright/test";
import { Product } from "../types/products";

export class ViewCartPage{
  readonly page:Page;

  constructor(page:Page){
      this.page = page;
  }

  async clickProceedToCheckout() {
    await this.page.getByText('Proceed To Checkout').click();
  }

  async removeAllProducts() {

    const removeButtons = this.page.locator(
        '#cart_info .cart_quantity_delete'
    );

    while (await removeButtons.count() > 0) {

        const countBefore = await removeButtons.count();

        await removeButtons.first().click();

        await expect(removeButtons)
            .toHaveCount(countBefore - 1);
    }

    await expect(this.page.locator('#cart_info')).toContainText('Cart is empty');
  }

  async matchDetails(products: Product[]) {

    for (const product of products) {

      const productRow = this.page.locator('tr').filter({
          hasText: product.productName
      });


      await expect(productRow).toBeVisible();


      await expect(productRow).toContainText(
          `Rs. ${product.price}`
      );


      await expect(productRow).toContainText(
          `Rs. ${product.price * product.quantity}`
      );

    }
  }

  async clickOnRegisterLogin() {
    await this.page.getByRole('link', { name: 'Register / Login' }).click();
    await this.page.waitForLoadState('domcontentloaded');
  }

  async clickOnContinueOnCart() {
    await this.page.getByRole('button', { name: 'Continue On Cart' }).click();
  }
}