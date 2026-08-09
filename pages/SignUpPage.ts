import { Page, expect } from "@playwright/test";
import { CustomerData } from "../utils/datamaker";

export class SignUpPage{
  readonly page:Page;

  constructor(page:Page){
      this.page = page;
  }

  async fillWithSignUp(customerData: CustomerData) {
    await this.page.getByRole('radio', { name: `${customerData.title}` }).check();

    await expect(this.page.getByRole('textbox', { name: 'Name *', exact: true })).toHaveValue(`${customerData.firstName} ${customerData.lastName}`);

    // console.log(`${customerLoginData.firstName.toLowerCase()}${customerLoginData.lastName.toLowerCase()}71@yopmail.com`);

    await expect(this.page.getByRole('textbox', { name: 'Email *' })).toHaveValue((customerData.email));

    await this.page.getByRole('textbox', { name: 'Password *' }).fill(customerData.password);

    // console.log(customerLoginData.day);
    // console.log(customerLoginData.month);
    // console.log(customerLoginData.year);

    await this.page.locator('#days').selectOption(customerData.day);
    await this.page.locator('#months').selectOption(customerData.month);
    await this.page.locator('#years').selectOption(customerData.year);

    await this.page.getByRole('checkbox', { name: 'Sign up for our newsletter!' }).check();
    await this.page.getByRole('checkbox', { name: 'Receive special offers from' }).check();

    await this.page.getByRole('textbox', { name: 'First name *' }).fill(customerData.firstName);
    await this.page.getByRole('textbox', { name: 'Last name *' }).fill(customerData.lastName);
    await this.page.getByRole('textbox', { name: 'Company', exact: true }).fill(customerData.company);

    await this.page.getByRole('textbox', { name: 'Address * (Street address, P.' }).fill(customerData.address1);
    await this.page.getByRole('textbox', { name: 'Address 2' }).fill(customerData.address2);

    await this.page.getByLabel('Country *').selectOption(customerData.country);

    await this.page.getByRole('textbox', { name: 'State *' }).fill(customerData.state);

    await this.page.getByRole('textbox', { name: 'City * Zipcode *' }).fill(customerData.city);

    await this.page.locator('#zipcode').fill(customerData.zipcode);

    await this.page.getByRole('textbox', { name: 'Mobile Number *' }).fill(customerData.mobileNumber);

    await this.page.getByRole('button', { name: 'Create Account' }).click();

    await this.page.getByRole('link', { name: 'Continue' }).click();

    await expect(
      this.page.getByText(/Logged in as/i)
    ).toBeVisible();
  }
}
