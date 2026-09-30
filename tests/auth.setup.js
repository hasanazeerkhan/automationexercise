import { mkdir } from 'node:fs/promises';
import path from 'node:path';
import { test as setup } from '@playwright/test';
import { LoginPage } from '../src/pages/Login.page.js';
import testData from '../testData/credentials.json';

const authStatePath = path.resolve('playwright/.auth/user.json');

setup('Authenticate shared test account', async ({ page }) => {
	await page.goto('/');
	await page.getByRole('link', { name: /Signup \/ Login/i }).click();

	const loginPage = new LoginPage(page);
	const user = testData.defaultUser;
	await loginPage.login(
		process.env.TEST_USER_EMAIL || user.email,
		process.env.TEST_USER_PASSWORD || user.password,
	);
	await loginPage.validateLoggedInAs(process.env.TEST_USER_NAME || user.username);

	await mkdir(path.dirname(authStatePath), { recursive: true });
	await page.context().storageState({ path: authStatePath });
});