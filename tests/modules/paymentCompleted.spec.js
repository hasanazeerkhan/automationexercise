import { test } from '../../src/fixtures/Page.fixtures.js';
import purchaseFlow from '../../testData/purchaseFlow.json';

test('Payment completion page confirms a successful order', async ({ NavigationTab, registeredUser, productsPage, cartPage, checkoutPage, paymentPage, paymentCompletedPage }) => {
	await NavigationTab.openProducts();
	await productsPage.validateProductsPageVisible();
	await productsPage.addProductToCart(purchaseFlow.product.name);
	await productsPage.openCartAfterAddingProduct();
	await cartPage.validateCartVisible();
	await cartPage.proceedToCheckout();
	await checkoutPage.validateCheckoutPageVisible();
	await checkoutPage.addOrderComment(purchaseFlow.checkout.comment);
	await checkoutPage.placeOrder();
	await paymentPage.fillPaymentDetails(purchaseFlow.payment);
	await paymentPage.submitPayment();
	await paymentCompletedPage.validatePaymentCompleted();
});