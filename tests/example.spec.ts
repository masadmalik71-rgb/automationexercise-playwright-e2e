import { test, expect } from '@playwright/test';


test('test', async ({ page }) => {

  const customerLoginData = {
    title: 'Mr.', // title have two options Mr. and Mrs.
    firstName: 'Testing',
    lastName: 'Prac',
    password: '123456789',
    day: '15',
    month: 'May',
    year: '1991',
    company: 'Testing Company',
    address1: 'Testing Address 1',
    address2: 'Testing Address 2',
    country: 'Canada',
    state: 'British Columbia',
    city: 'Vancouver',
    zipcode: '52000',
    mobileNumber: '090078601',
  };

  await page.goto('/');

  await page.getByRole('link', { name: ' Signup / Login' }).click();
  await page.getByRole('textbox', { name: 'Name' }).fill(`${customerLoginData.firstName} ${customerLoginData.lastName}`);
  await page.locator('form').filter({ hasText: 'Signup' }).getByPlaceholder('Email Address').fill(`${customerLoginData.firstName.toLowerCase()}${customerLoginData.lastName.toLowerCase()}71@yopmail.com`);
  await page.getByRole('button', { name: 'Signup' }).click();

  await page.getByRole('radio', { name: `${customerLoginData.title}` }).check();

  await expect(page.getByRole('textbox', { name: 'Name *', exact: true })).toHaveValue(`${customerLoginData.firstName} ${customerLoginData.lastName}`);

  console.log(`${customerLoginData.firstName.toLowerCase()}${customerLoginData.lastName.toLowerCase()}71@yopmail.com`);

  await expect(page.getByRole('textbox', { name: 'Email *' })).toHaveValue((`${customerLoginData.firstName.toLowerCase()}${customerLoginData.lastName.toLowerCase()}71@yopmail.com`));

  await page.getByRole('textbox', { name: 'Password *' }).fill(customerLoginData.password);

  await page.locator('#days').selectOption(customerLoginData.day);
  await page.locator('#months').selectOption(customerLoginData.month);
  await page.locator('#years').selectOption(customerLoginData.year);

  await page.getByRole('checkbox', { name: 'Sign up for our newsletter!' }).check();
  await page.getByRole('checkbox', { name: 'Receive special offers from' }).check();

  await page.getByRole('textbox', { name: 'First name *' }).fill(customerLoginData.firstName);
  await page.getByRole('textbox', { name: 'Last name *' }).fill(customerLoginData.lastName);
  await page.getByRole('textbox', { name: 'Company', exact: true }).fill(customerLoginData.company);

  await page.getByRole('textbox', { name: 'Address * (Street address, P.' }).fill(customerLoginData.address1);
  await page.getByRole('textbox', { name: 'Address 2' }).fill(customerLoginData.address2);

  await page.getByLabel('Country *').selectOption(customerLoginData.country);

  await page.getByRole('textbox', { name: 'State *' }).fill(customerLoginData.state);

  await page.getByRole('textbox', { name: 'City * Zipcode *' }).fill(customerLoginData.city);

  await page.locator('#zipcode').fill(customerLoginData.zipcode);

  await page.getByRole('textbox', { name: 'Mobile Number *' }).fill(customerLoginData.mobileNumber);

  await expect(page.getByRole('button', { name: 'Create Account' })).toBeVisible();

  await page.getByRole('button', { name: 'Create Account' }).click();

  // await page.waitForTimeout(10000);
});