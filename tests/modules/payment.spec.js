import { test } from '../../src/fixtures/Page.fixtures.js';
import purchaseFlow from '../../testData/purchaseFlow.json';

test('Payment page displays card fields and accepts payment details', async ({ NavigationTab, registeredUser, productsPage, cartPage, checkoutPage, paymentPage }) => {
	await NavigationTab.openProducts();
	await productsPage.validateProductsPageVisible();
	await productsPage.addProductToCart(purchaseFlow.product.name);
	await productsPage.openCartAfterAddingProduct();
	await cartPage.validateCartVisible();
	await cartPage.proceedToCheckout();
	await checkoutPage.validateCheckoutPageVisible();
	await checkoutPage.placeOrder();

	await paymentPage.validatePaymentFormVisible();
	await paymentPage.fillPaymentDetails(purchaseFlow.payment);
	await paymentPage.validatePaymentDetails(purchaseFlow.payment);
});
