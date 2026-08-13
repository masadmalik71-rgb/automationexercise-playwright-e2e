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

        const productRows = this.page.locator('#cart_info tbody tr').filter({
            has: this.page.locator('.cart_quantity_delete')
        });
        const row = productRows.first();
        const rowId = await row.getAttribute('id');
        const countBefore = await productRows.count();

        await row.locator('.cart_quantity_delete').click();

        if (rowId) {
            await expect(this.page.locator(`#${rowId}`)).toBeHidden();
        } else {
            await expect(productRows).toHaveCount(countBefore - 1);
        }
    }

    await expect(this.page.locator('#cart_info')).toContainText('Cart is empty');
  }

  async matchDetails(products: Product[]) {

    for (const product of products) {

      const productRow = this.page.locator('tr').filter({
          hasText: product.productName
      });


      await expect(productRow).toBeVisible();


      await expect(productRow.locator('.cart_price')).toContainText(
          `Rs. ${product.price}`
      );


      await expect(productRow.locator('.cart_quantity')).toContainText(
          product.quantity.toString()
      );


      await expect(productRow.locator('.cart_total_price')).toContainText(
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
