import { test } from '../../src/fixtures/Page.fixtures.js';
import testData from '../../testData/credentials.json';
import { createTestAccountDetails } from '../../src/utils/testAccount.utils.js';

test('Test Case 1: Register User', async ({ NavigationTab, signupPage, accountCreatedPage, accountDeletedPage }, testInfo) => {
	const user = createTestAccountDetails(testInfo);

	await NavigationTab.clickSignupLogin();
	await signupPage.validateSignupFormVisible();
	await signupPage.startSignup(user.username, user.email);
	await signupPage.validateAccountInformationVisible();
	await signupPage.fillAccountInformation(user.account);
	await signupPage.createAccount();
	await accountCreatedPage.validateAccountCreated();
	await accountCreatedPage.continueToHomePage();
	await NavigationTab.validateLoggedInUser(user.username);
	await NavigationTab.deleteAccount();
	await accountDeletedPage.validateAccountDeleted();
});

test('Test Case 2: Login User with correct email and password', async ({ NavigationTab, loginPage }) => {
	await NavigationTab.clickSignupLogin();
	await loginPage.login(testData.defaultUser.email, testData.defaultUser.password);

	await NavigationTab.validateLoggedInUser(testData.defaultUser.username);
});

test('Test Case 4: Logout User', async ({ NavigationTab, loginPage }) => {
	await NavigationTab.clickSignupLogin();
	await loginPage.login(testData.defaultUser.email, testData.defaultUser.password);
	await NavigationTab.validateLoggedInUser(testData.defaultUser.username);

	await NavigationTab.logout();
	await NavigationTab.validateLoggedOut();
});

test('Test Case 3: Login User with incorrect email and password', async ({ NavigationTab, loginPage }) => {
	await NavigationTab.clickSignupLogin();
	await loginPage.login(testData.invalidUser.email, testData.invalidUser.password);

	await loginPage.validateLoginErrorVisible();
});

test('Test Case 5: Register User with existing email', async ({ NavigationTab, signupPage }) => {
	await NavigationTab.clickSignupLogin();
	await signupPage.validateSignupFormVisible();
	await signupPage.startSignup(testData.defaultUser.username, testData.defaultUser.email);

	await signupPage.validateExistingEmailErrorVisible();
});
