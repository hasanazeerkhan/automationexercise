import { expect, test } from '../../src/fixtures/Page.fixtures.js';
import purchaseFlow from '../../testData/purchaseFlow.json';

test('Adding a product from the product list displays it in the cart and enables checkout', async ({ homePage, NavigationTab, productsPage, cartPage }) => {
	await homePage.validateHomePage();
	await NavigationTab.openProducts();
	await productsPage.validateProductsPageVisible();
	await productsPage.addProductToCart(purchaseFlow.product.name);
	await productsPage.openCartAfterAddingProduct();
	await cartPage.validateCartVisible();

	await expect(cartPage.cartRows.first()).toContainText(purchaseFlow.product.name);
	await expect(cartPage.proceedToCheckoutButton).toBeVisible();
});