import { Page, expect } from "@playwright/test";
import { Product } from "../types/products";

export class ProductDetailsPage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async lookInProductDetails() {
    await expect(this.page.getByRole('heading', { name: 'Men  Tshirt' })).toBeVisible();
    await expect(this.page.getByText('Category: Men > TshirtsMen\'s')).toBeVisible();
    await expect(this.page.getByText('Rs. 400')).toBeVisible();
    await expect(this.page.getByText('Availability: In Stock')).toBeVisible();
    await expect(this.page.getByText('Condition: New')).toBeVisible();
    await expect(this.page.getByText('Brand: H&M')).toBeVisible();
  }

  async clickAddToCart() {
    await this.page.getByRole('button', { name: 'Add to cart' }).click();

  }

  async getProductDetail(product_quantity:number): Promise<Product> {

    await this.page.locator('#quantity').clear();
    await this.page.locator('#quantity').fill(product_quantity.toString());

    const productDetails = this.page.locator('.product-information');

    const productName = (await productDetails.locator('h2').innerText())

    const price = Number(
        (await productDetails.locator('span span').innerText())
        .replace(/\D/g, '')
    );

    const quantity = Number((await productDetails.locator('#quantity').inputValue()));

    console.log(quantity);

    return {
        productName,
        price,
        quantity,
    };
  }

}