import { test, expect } from "../fixtures/testFixtures";
import { Product } from "../types/products";

test('Place Order: Login before Checkout', async ({
  page,
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
  
  await loginPage.loginWithCustomerData(customerData);

  const selectedProducts: Product[] = [];

  await productsPage.clickAddToCart(4)

  await productsPage.clickViewCart();

  await viewCartPage.matchDetails(selectedProducts);

  await viewCartPage.clickProceedToCheckout();
  await expect(page).toHaveURL('/checkout');

  await checkOutPage.confirmCustomerDetail(customerData);

  await checkOutPage.clickOnPlaceOrder();

  await paymentPage.paymentDetailsPage(customerData);

  await paymentDonePage.confirmOrderPlaced();

});
