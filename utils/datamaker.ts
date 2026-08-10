import { faker } from '@faker-js/faker';

export type CustomerData = {
  title: string,
  firstName: string,
  lastName: string,
  email: string,
  password: string,
  day: string,
  month: string,
  year: string,
  company: string,
  address1: string,
  address2: string,
  country: string,
  state: string,
  city: string,
  zipcode: string,
  mobileNumber: string,
  checkoutMessage: string,
  creditCardNumber: string,
  creditCardCVV: string,
  creditCardExpiryMonth: string,
  creditCardExpiryYear: string,
}

export const createCustomerData = () => {
  const firstName = faker.person.firstName();
  const lastName = faker.person.lastName();
  const dob = faker.date.birthdate({
    min: 18,
    max: 65,
    mode: 'age'
  });

  const titleList = [
    'Mr.',
    'Mrs.'
  ];

  const countries = [
    'India',
    'United States',
    'Canada',
    'Australia',
    'Israel',
    'New Zealand',
    'Singapore'
  ];

const creditCardExpiryDate = faker.date.future({ years: 5 });

const creditCardExpiryMonth = (creditCardExpiryDate.getMonth() + 1)
  .toString()
  .padStart(2, '0');

const creditCardExpiryYear = creditCardExpiryDate
  .getFullYear()
  .toString();
    
  return {
    title: faker.helpers.arrayElement(titleList),
    firstName,
    lastName,
    email: `${firstName}${lastName}${faker.number.int({ min: 10, max : 99 })}@yopmail.com`.toLowerCase(),
    password: faker.internet.password(),
    day: dob.getDate().toString(),
    month: (dob.getMonth()+1).toString(),
    year: dob.getFullYear().toString(),
    company: faker.company.name(),
    address1: faker.location.streetAddress(),
    address2: faker.location.streetAddress(),
    country: faker.helpers.arrayElement(countries),
    state: faker.location.state(),
    city: faker.location.city(),
    zipcode: faker.location.zipCode(),
    mobileNumber: faker.phone.number(),
    checkoutMessage: faker.lorem.paragraph(),
    creditCardNumber: faker.finance.creditCardNumber(),
    creditCardCVV: faker.finance.creditCardCVV(),
    creditCardExpiryMonth,
    creditCardExpiryYear,
    };
};