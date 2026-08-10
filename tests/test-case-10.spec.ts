import { test } from "../fixtures/testFixtures";

test('Search Product', async ({
  loginPage,
  customerData
}) => {
    await loginPage.goto();
    await loginPage.subscribeForEmail(customerData);
});