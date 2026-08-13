import { Locator, Page, expect } from "@playwright/test";

export class HomePage{
  readonly page:Page;

  constructor(page:Page){
      this.page = page;
  }

  productCard(productName: string): Locator {
    return this.page
      .locator('div')
      .filter({ hasText: productName })
      .nth(5);
  }
  
  categoryDropdown(categoryName: string): Locator {
    const category = this.page.getByRole('link', { name: categoryName });

    return categoryName === 'Men'
      ? category.nth(1)
      : category.first();
  }


  subCategoryDropdown(categoryName: string, subCategoryName: string): Locator {

    if (subCategoryName === 'Dress') {
      return this.page
        .locator(`#${categoryName}`)
        .getByRole('link', { name: subCategoryName });
    }

    return this.page.getByRole('link', { name: subCategoryName });
  }

  async clickOnCategoryAndSubCategory(categoryName:string, subCategoryName:string) {
    await this.categoryDropdown(categoryName).click();
    await this.subCategoryDropdown(categoryName, subCategoryName).click();
  }

  async confirmProduct(productName: string) {
    await expect(
      this.productCard(productName)
    ).toBeVisible();
  }

}