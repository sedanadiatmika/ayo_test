import { test as setup, expect } from '@playwright/test';
import dotenv from 'dotenv';

dotenv.config();

const authFile = 'playwright/.auth/user.json'; // where the storage state will be saved

const url = `${process.env.URL}`; // get the URL value from .env
const username = `${process.env.USERNAME}`; // get the username value from .env
const password = `${process.env.PASSWORD}`; // get the password value from .env

setup('authenticate', async ({ page }) => {
  await page.goto(url + '/login'); // go to login page
  await expect(page.locator('h1')).toContainText('Login') // make sure the title of the login page is displayed
  await page.locator('#username').fill(username); // fill the username field
  await page.locator('#password').fill(password); // fill the password field
  await page.locator('#login').click(); // click on login button
  await expect(page.locator('h1')).toContainText('Selamat Datang') // make sure the login is successful and the main page is displayed
  await page.context().storageState({ path: authFile }); // save the storage state
});