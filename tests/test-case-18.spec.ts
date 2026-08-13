import { test } from "../fixtures/testFixtures";
import { Product } from "../types/products";

test('View Category Products', async ({
  loginPage,
  homePage,
  customerData,
}) => {
  await loginPage.goto();

  const loggedIn4 = await loginPage.isUserLoggedIn();

  if(loggedIn4) {
    await loginPage.clickOnLogout();
  } 

  await loginPage.goto();

  await homePage.clickOnCategoryAndSubCategory('Women', 'Dress');

  await homePage.confirmProduct('Sleeveless Dress');

  await homePage.clickOnCategoryAndSubCategory('Men', 'Jeans');

  await homePage.confirmProduct('Soft Stretch Jeans');

  const loggedIn = await loginPage.isUserLoggedIn();

  if(!loggedIn) {
    await loginPage.openSignupLoginPage();
    await loginPage.loginWithCustomerData(customerData);
  }

});