import { Page } from "@playwright/test";

export class ViewCartPage{
  readonly page:Page;

  constructor(page:Page){
      this.page = page;
  }

  async clickProceedToCheckout() {
    await this.page.getByText('Proceed To Checkout').click();
  }
}