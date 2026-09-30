import { test } from '../../src/fixtures/Page.fixtures.js';
import purchaseFlow from '../../testData/purchaseFlow.json';

test('Searching for a product displays matching search results', async ({ NavigationTab, productsPage }) => {
	await NavigationTab.openProducts();
	await productsPage.validateProductsPageVisible();
	await productsPage.searchProducts(purchaseFlow.product.name);

	await productsPage.validateSearchResultsVisible();
	await productsPage.validateProductVisible(purchaseFlow.product.name);
});