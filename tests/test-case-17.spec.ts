import { log } from "node:console";
import { test, expect } from "../fixtures/testFixtures";
import { Product } from "../types/products";

test('Remove Products From Cart', async ({
  loginPage,
  signUpPage,
  productsPage,
  viewCartPage,
  checkOutPage,
  paymentPage,
  paymentDonePage,
  customerData,
}) => {
  await loginPage.goto();

  const loggedIn4 = await loginPage.isUserLoggedIn();

  if(loggedIn4) {
    await loginPage.clickOnLogout();
  } 

  await loginPage.goto();

  const selectedProducts: Product[] = [];

  await productsPage.clickAddToCart(4)

  await productsPage.clickViewCart();

  await viewCartPage.matchDetails(selectedProducts);

  await viewCartPage.removeAllProducts();

  const loggedIn = await loginPage.isUserLoggedIn();

  if(!loggedIn) {
    await loginPage.openSignupLoginPage();
    await loginPage.loginWithCustomerData(customerData);
  }

});