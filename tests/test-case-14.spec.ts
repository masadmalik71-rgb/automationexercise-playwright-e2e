import { test } from "../fixtures/testFixtures";
import { Product } from "../types/products";

test('Verify Product quantity in Cart', async ({
  loginPage,
  productsPage,
  viewCartPage,
  checkOutPage,
  paymentPage,
  paymentDonePage,
  customerData,
}) => {
  await loginPage.goto();

  await loginPage.clickOnLogout();

  await loginPage.goto();
  
  const selectedProducts: Product[] = [];

  await productsPage.clickAddToCart(4)

  await productsPage.clickViewCart();

  await viewCartPage.matchDetails(selectedProducts);

  await viewCartPage.clickProceedToCheckout();

  await viewCartPage.clickOnRegisterLogin();

  await loginPage.loginWithCustomerData(customerData);

  await loginPage.clickOnCart();

  await viewCartPage.clickProceedToCheckout();

  await checkOutPage.confirmCustomerDetail(customerData);

  await checkOutPage.clickOnPlaceOrder();

  await paymentPage.paymentDetailsPage(customerData);

  await paymentDonePage.confirmOrderPlaced();

  // await paymentPage.paymentDetailsPage(customerData);



});