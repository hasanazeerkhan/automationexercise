import { test } from '../../src/fixtures/Page.fixtures.js';
import { createTestAccountDetails } from '../../src/utils/testAccount.utils.js';

test('New user can create an account and then delete it', async ({ NavigationTab, signupPage, accountCreatedPage, accountDeletedPage }, testInfo) => {
	const user = createTestAccountDetails(testInfo);
	await NavigationTab.clickSignupLogin();
	await signupPage.validateSignupFormVisible();
	await signupPage.startSignup(user.username, user.email);
	await signupPage.validateAccountInformationVisible();
	await signupPage.fillAccountInformation(user.account);
	await signupPage.createAccount();
	await accountCreatedPage.validateAccountCreated();
	await accountCreatedPage.continueToHomePage();
	await NavigationTab.deleteAccount();
	await accountDeletedPage.validateAccountDeleted();
});