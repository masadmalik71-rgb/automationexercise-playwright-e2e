import { test } from "../fixtures/testFixtures";

test('Place Order: Register before Checkout', async ({
  productsPage,
  viewCartPage,
  checkOutPage,
  paymentPage,
  paymentDonePage,
  customerData
}) => {

  await productsPage.clickAddToCart(3);

  await productsPage.clickContinueShopping();

  await productsPage.clickAddToCart(43);

  await productsPage.clickViewCart();
  
  await viewCartPage.clickProceedToCheckout();
  
  await checkOutPage.confirmCustomerDetail(customerData);
  
  await checkOutPage.clickOnPlaceOrder();
  
  await paymentPage.paymentDetailsPage(customerData);
  
  await paymentDonePage.confirmOrderPlaced();

});
