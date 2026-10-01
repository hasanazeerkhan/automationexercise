import { authenticatedTest as test } from '../../src/fixtures/Page.fixtures.js';
import testData from '../../testData/credentials.json';

test('Authenticated user can open Contact Us and see the form and Home link', async ({ NavigationTab, contactPage }) => {
	await NavigationTab.validateLoggedInUser(testData.defaultUser.username);
	await NavigationTab.openContactUs();

	await contactPage.validateContactUsPageVisible();
	await contactPage.validateFormVisibility();
	await contactPage.validateHomeLinkVisible();
});