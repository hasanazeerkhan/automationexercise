import { authenticatedTest as test } from '../../src/fixtures/Page.fixtures.js';
import testData from '../../testData/credentials.json';

test('Authenticated user sees the expected main navigation links', async ({ NavigationTab }) => {
	await NavigationTab.validateLoggedInUser(testData.defaultUser.username);
	await NavigationTab.validateNavigationLinksVisible();

	await NavigationTab.logout();
	await NavigationTab.validateLoggedOut();
});