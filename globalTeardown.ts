import {
  request,
  expect,
  type FullConfig,
} from '@playwright/test';

import fs from 'fs';

import type { CustomerData } from './utils/datamaker';

async function globalTeardown(config: FullConfig) {
  const baseURL = config.projects[0].use.baseURL as string;

  if (!fs.existsSync('playwright/.auth/customer.json')) {
      console.log('No customer data found, skipping cleanup');
      return;
  }

  const customerData: CustomerData = JSON.parse(
    fs.readFileSync(
      'playwright/.auth/customer.json',
      'utf-8'
    )
  );

  const apiContext = await request.newContext({
    baseURL,
  });

  try {
    const response = await apiContext.delete(
      '/api/deleteAccount',
      {
        form: {
          email: customerData.email,
          password: customerData.password,
        },
      }
    );

    expect(response.ok()).toBeTruthy();

    const responseBody = await response.json();

    console.log(
      'Delete account response:',
      responseBody
    );

    expect(responseBody.responseCode).toBe(200);
  } finally {
    await apiContext.dispose();
  }
}

export default globalTeardown;