import { test } from '../../src/fixtures/Page.fixtures.js';

/**
 * Verifies the signup flow starts from the login page and shows the registration form.
 */
test('Signup / Login page displays the signup form', async ({ NavigationTab, signupPage }) => {
	await NavigationTab.clickSignupLogin();
	await signupPage.validateSignupFormVisible();
});