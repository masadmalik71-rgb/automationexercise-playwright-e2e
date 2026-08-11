import { test } from "../fixtures/testFixtures";

test('Verify All Products and product detail page', async ({
  productsPage,
  productDetailsPage,
}) => {
  
  await productsPage.gotoProducts();
  await productsPage.clickViewProductDetails(2);
  await productDetailsPage.lookInProductDetails();
});