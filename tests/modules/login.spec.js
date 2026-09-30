import { test } from '../../src/fixtures/Page.fixtures.js';
import testData from '../../testData/credentials.json';

/**
 * Verifies a registered customer can log in, confirm their username in the header, and log out cleanly.
 */
test('Registered user can log in, see their account name, and log out', async ({ NavigationTab, loginPage }) => {
	await NavigationTab.clickSignupLogin();
	await loginPage.login(testData.defaultUser.email, testData.defaultUser.password);
	await NavigationTab.validateLoggedInUser(testData.defaultUser.username);

	await NavigationTab.logout();
	await NavigationTab.clickSignupLogin();
});