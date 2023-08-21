import { expect, test } from '@playwright/test';
import dotenv from 'dotenv';

dotenv.config();

const url = `${process.env.URL}`; // get the URL value from .env

test('Memesan pada jam 07:00 - 09:00', async ({ page }) => {
    await page.goto(url); // go to the main page
    await expect(page.locator('h1')).toContainText('Selamat datang'); // make sure the title of the main page is displayed
    await page.locator('#order').click(); // click on the order button

    await expect(page.locator('h1')).toContainText('Pilih Venue'); // make sure it redirected to choose value page
    await page.locator('#venue_15').click(); // click on the venue number 15

    await expect(page.locator('h1')).toContainText('Pilih Tanggal dan Waktu'); // make sure it redirected to choose date and time page
    await page.locator('#year').selectOption('2022'); // choose year
    await page.locator('#month').selectOption('12'); // choose month
    await page.locator('#day').selectOption('10'); // choose day
    await page.locator('#start_time').selectOption('07:00'); // choose start time
    await page.locator('#end_time').selectOption('09:00'); // choose end time
    await expect(page.locator('#price')).toHaveText('Rp. 800.000'); // make sure the price displayed is correct
    await page.locator('#submit').click(); // click on submit button
    await expect(page.locator('#submit')).toBeDisabled(); // make sure the submit button is disabled after being clicked

    await expect(page.locator('h1')).toContainText('Pesanan Selesai'); // make sure it redirected to order confirmation page
    await expect(page.locator('#venue_ordered')).toContainText('15'); // make sure the venue number is correct
    await expect(page.locator('#date_ordered')).toContainText('2022-12-10'); // make sure the date is correct
    await expect(page.locator('#time_ordered')).toContainText('07:00 - 09:00'); // make sure the time is correct
    await expect(page.locator('#price_ordered')).toContainText('Rp. 800.000'); // make sure the price is correct
});
