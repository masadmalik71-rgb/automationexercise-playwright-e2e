import { test as base } from '@playwright/test';
import fs from 'fs';

import { CheckOutPage } from "../pages/CheckOutPage";
import { LoginPage } from "../pages/LoginPage";
import { PaymentDonePage } from "../pages/PaymentDonePage";
import { PaymentPage } from "../pages/PaymentPage";
import { ProductsPage } from "../pages/ProductsPage";
import { SignUpPage } from '../pages/SignUpPage';
import { ViewCartPage } from "../pages/ViewCartPage";


import type { CustomerData } from '../utils/datamaker';

type MyFixture = {
  customerData: CustomerData;

  checkOutPage: CheckOutPage;
  loginPage: LoginPage;
  paymentDonePage: PaymentDonePage;
  paymentPage: PaymentPage;
  productsPage: ProductsPage;
  signUpPage: SignUpPage;
  viewCartPage: ViewCartPage;

};

export const test = base.extend<MyFixture>({

  customerData: async ({}, use) => {
    const customerData: CustomerData = JSON.parse(
      fs.readFileSync(
        'playwright/.auth/customer.json',
        'utf-8'
      )
    );

    await use(customerData);
  },

  loginPage: async ({ page }, use) => {
    await use(new LoginPage(page));
  },

  checkOutPage: async ({ page }, use) => {
    await use(new CheckOutPage(page));
  },

  paymentDonePage: async ({ page }, use) => {
    await use(new PaymentDonePage(page));
  },

  paymentPage: async ({ page }, use) => {
    await use(new PaymentPage(page));
  },

  productsPage: async ({ page }, use) => {
    await use(new ProductsPage(page));
  },

  signUpPage: async ({ page }, use) => {
    await use(new SignUpPage(page));
  },

  viewCartPage: async ({page}, use) => {
    await use(new ViewCartPage(page));
  },

});

export { expect } from '@playwright/test';