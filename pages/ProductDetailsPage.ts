import { Locator, Page, expect } from "@playwright/test";
import { Product } from "../types/products";

export class ProductDetailsPage {
  readonly page: Page;
  readonly productName: Locator;
  readonly productCategory: Locator;
  readonly productPrice: Locator;
  readonly productInStock: Locator;
  readonly productCondition: Locator;
  readonly productBrand: Locator;
  readonly addToCartButton: Locator;
  readonly productQuantity: Locator;
  readonly productDetails: Locator;

  constructor(page: Page) {
    this.page = page;
    this.productName = this.page.getByRole('heading', { name: 'Men  Tshirt' });
    this.productCategory = this.page.getByText('Category: Men > TshirtsMen\'s');
    this.productPrice = this.page.getByText('Rs. 400');
    this.productInStock = this.page.getByText('Availability: In Stock');
    this.productCondition = this.page.getByText('Condition: New');
    this.productBrand = this.page.getByText('Brand: H&M');
    this.addToCartButton = this.page.getByRole('button', { name: 'Add to cart' });
    this.productQuantity = this.page.locator('#quantity');
    this.productDetails = this.page.locator('.product-information')
  }

  async lookInProductDetails() {
    await expect(this.productName).toBeVisible();
    await expect(this.productCategory).toBeVisible();
    await expect(this.productPrice).toBeVisible();
    await expect(this.productInStock).toBeVisible();
    await expect(this.productCondition).toBeVisible();
    await expect(this.productBrand).toBeVisible();
  }

  async clickAddToCart() {
    await this.addToCartButton.click();

  }

  async getProductDetail(product_quantity:number): Promise<Product> {

    await this.productQuantity.clear();
    await this.productQuantity.fill(product_quantity.toString());

    const productName = (await this.productDetails.locator('h2').innerText())

    const price = Number(
        (await this.productDetails.locator('span span').innerText())
        .replace(/\D/g, '')
    );

    const quantity = Number((await this.productDetails.locator('#quantity').inputValue()));

    return {
        productName,
        price,
        quantity,
    };
  }

}