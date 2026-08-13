import { test } from "../fixtures/testFixtures";

test('Verify All Products and product detail page', async ({
  productsPage,
  productDetailsPage,
}) => {
  
  await productsPage.clickOnProduct();
  await productsPage.clickViewProductDetails(2);
  await productDetailsPage.lookInProductDetails();
});