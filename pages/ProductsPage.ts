import { Page } from "@playwright/test";

export class ProductsPage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async clickAddToCart(productId:number) {
    await this.page.goto('/products');
    await this.page.locator(`[data-product-id="${productId}"]`).nth(0).click();
  }

  async clickContinueShopping() {
    await this.page.getByRole('button', { name: 'Continue Shopping' }).click();
  }

  async clickViewCart() {
    await this.page.getByRole('link', { name: 'View Cart' }).click();
    await this.page.waitForURL('/view_cart')
  }
}