import { test, expect } from "../fixtures/testFixtures";

test('should login, checkout product, and place order', async ({
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
