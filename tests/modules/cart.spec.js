import { test } from '../../src/fixtures/Page.fixtures.js';
import purchaseFlow from '../../testData/purchaseFlow.json';

test('Cart page displays an added product and checkout action', async ({ NavigationTab, productsPage, cartPage }) => {
	await NavigationTab.openProducts();
	await productsPage.validateProductsPageVisible();
	await productsPage.addProductToCart(purchaseFlow.product.name);
	await productsPage.openCartAfterAddingProduct();
	await cartPage.validateCartVisible();

	await cartPage.validateProductInCart(purchaseFlow.product.id, purchaseFlow.product.name);
});