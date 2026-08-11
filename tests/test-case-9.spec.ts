import { test } from "../fixtures/testFixtures";

test('Search Product', async ({
  loginPage,
  productsPage,
}) => {
    await loginPage.goto();
    await productsPage.clickOnProducts();
    await productsPage.searchProduct('Blue Top');

});