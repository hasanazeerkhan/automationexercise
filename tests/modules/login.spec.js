import { test } from '../../src/fixtures/Page.fixtures.js';
import testData from '../../testData/credentials.json';

/**
 * Verifies a registered customer can log in, confirm their username in the header, and log out cleanly.
 */
test('Login page accepts valid registered user credentials', async ({ NavigationTab, loginPage }) => {
	await NavigationTab.clickSignupLogin();
	await loginPage.login(testData.defaultUser.email, testData.defaultUser.password);

	await loginPage.validateLoggedInAs(testData.defaultUser.username);
});