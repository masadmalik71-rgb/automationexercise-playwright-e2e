import { Page, expect } from "@playwright/test";
import { Product } from "../types/products";

export class ProductsPage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async gotoProducts() {
    await this.page.goto('/products');
    await this.page.waitForLoadState('domcontentloaded');
  }

  async clickAddToCart(productId:number): Promise<Product> {

      const product = this.page.locator(
          `.productinfo:has([data-product-id="${productId}"])`
      ).first();


      await product.waitFor({
          state:'visible'
      });


      const productName = (
          await product.locator('p').innerText()
      ).slice(0,33);


      const price = Number(
          (await product.locator('h2').innerText())
          .replace(/\D/g,'')
      );


      await product
          .locator(`[data-product-id="${productId}"]`)
          .click();


      return {
          productName,
          price,
          quantity:1
      };
  }

  async clickContinueShopping() {
    await this.page.getByRole('button', { name: 'Continue Shopping' }).click();
  }

  async clickViewCart() {
    await this.page.getByRole('link', { name: 'View Cart' }).click();
    await expect(this.page).toHaveURL('/view_cart')
  }

  async clickViewProductDetails(productId:number) {
    const productLink = this.page.locator(
      `a[href*="/product_details/${productId}"]`
    ).first();

    await productLink.click();
    await expect(this.page).toHaveURL(new RegExp(`/product_details/${productId}`));
  }

  async searchProduct(productName:string) {
    await this.page.getByRole('textbox', { name: 'Search Product' }).fill(productName);
    await this.page.locator('#submit_search').click();
    await expect(this.page.getByText('Blue Top').first()).toContainText(productName);
  }

  async clickOnProducts() {
    await this.page.getByRole('link', { name: 'Products' }).click();
    await expect(this.page).toHaveURL('/products');
  }

}