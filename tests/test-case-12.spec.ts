import { test } from "../fixtures/testFixtures";
import { Product } from "../types/products";
import { addOrIncreaseProduct } from "../helpers/productHelper";

test('Add Products in Cart', async ({
  loginPage,
  productsPage,
  viewCartPage,
}) => {

  await loginPage.goto();
  
  await loginPage.clickOnProduct();

  const selectedProducts: Product[] = [];
  const productIds = [41, 23, 41, 41];

  for (let i = 0; i < productIds.length; i++) {

    const product = await productsPage.clickAddToCart(productIds[i]);

    addOrIncreaseProduct(selectedProducts, product);

    if (i < productIds.length - 1) {
        await productsPage.clickContinueShopping();
    } else {
        await productsPage.clickViewCart();
    }
  }
  
  await viewCartPage.matchDetails(selectedProducts);

  await viewCartPage.removeAllProducts();

});
