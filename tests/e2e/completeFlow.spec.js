import { test } from '../../src/fixtures/Page.fixtures.js';
import purchaseFlow from '../../testData/purchaseFlow.json';
import { createTestAccountDetails } from '../../src/utils/testAccount.utils.js';

test('New user can create an account, purchase a product, complete payment, and delete the account', async ({ NavigationTab, signupPage, accountCreatedPage, accountDeletedPage, productsPage, cartPage, checkoutPage, paymentPage, paymentCompletedPage }, testInfo) => {
	const user = createTestAccountDetails(testInfo);

	await NavigationTab.clickSignupLogin();
	await signupPage.validateSignupFormVisible();
	await signupPage.startSignup(user.username, user.email);
	await signupPage.validateAccountInformationVisible();
	await signupPage.fillAccountInformation(user.account);
	await signupPage.createAccount();
	await accountCreatedPage.validateAccountCreated();
	await accountCreatedPage.continueToHomePage();

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

	await NavigationTab.deleteAccount();
	await accountDeletedPage.validateAccountDeleted();
});