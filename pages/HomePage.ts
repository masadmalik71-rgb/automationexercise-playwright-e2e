import { Page, expect } from "@playwright/test";
import { CustomerData } from "../utils/datamaker";

export class HomePage{
  readonly page:Page;

  constructor(page:Page){
      this.page = page;
  }

  async clickOnCategoryAndSubCategory(categoryName:string, subCategoryName:string) {
    let categoryDropdown = this.page.getByRole('link', { name: `${categoryName}` });
    if(categoryName === 'Men') {
      categoryDropdown = this.page.getByRole('link', { name: `${categoryName}` }).nth(1);
    }
    await categoryDropdown.click();
    let subCategory = this.page.getByRole('link', { name: `${subCategoryName}` });
    if(subCategoryName === 'Dress') {
      subCategory = this.page.locator(`#${categoryName}`).getByRole('link', { name: `${subCategoryName}` });
    }
    await subCategory.click();
  }

  async confirmProduct(productName:string) {
    const productCard = this.page.locator('div').filter({ hasText: `${productName}` }).nth(5);
    await expect(productCard).toBeVisible();
  }

}