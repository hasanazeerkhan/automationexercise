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
	await loginPage.login(testData.defaultUser.email, testData.defaultUser.password);
	await loginPage.validateLoggedInAs(testData.defaultUser.username);

	await mkdir(path.dirname(authStatePath), { recursive: true });
	await page.context().storageState({ path: authStatePath });
});