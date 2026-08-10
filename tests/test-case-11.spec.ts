import { test } from "../fixtures/testFixtures";

test('Verify Subscription in Cart page', async ({
  loginPage,
  customerData,
}) => {
    await loginPage.goto();
    await loginPage.clickOnCart();
    await loginPage.subscribeForEmail(customerData);
});