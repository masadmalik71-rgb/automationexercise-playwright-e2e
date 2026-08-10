import { test, expect } from "../fixtures/testFixtures";
import { Product } from "../types/products";

test('Verify Product quantity in Cart', async ({
  loginPage,
  productsPage,
  productDetailsPage,
  viewCartPage,
}) => {
  await loginPage.goto();
  await loginPage.clickOnProduct();
  await productsPage.clickViewProductDetails(43);
  
  const selectedProducts: Product[] = [];

  const product = await productDetailsPage.getProductDetail(4);

  selectedProducts.push(product);

  console.log(selectedProducts);
  
  await productDetailsPage.clickAddToCart();

  await productsPage.clickViewCart();  

  await viewCartPage.matchDetails(selectedProducts);

  await viewCartPage.removeAllProducts();

});