import { expect, test } from '../../src/fixtures/Page.fixtures.js';
import purchaseFlow from '../../testData/purchaseFlow.json';
import { createTestAccountDetails } from '../../src/utils/testAccount.utils.js';

test('Placing an order opens the payment form with all required card fields', async ({ NavigationTab, signupPage, accountCreatedPage, accountDeletedPage, productsPage, cartPage, checkoutPage, paymentPage }, testInfo) => {
	const user = createTestAccountDetails(testInfo);
	await NavigationTab.clickSignupLogin();
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
	await checkoutPage.placeOrder();

	await expect(paymentPage.nameOnCardInput).toBeVisible();
	await expect(paymentPage.cardNumberInput).toBeVisible();
	await expect(paymentPage.cvcInput).toBeVisible();
	await expect(paymentPage.expiryMonthInput).toBeVisible();
	await expect(paymentPage.expiryYearInput).toBeVisible();
	await NavigationTab.deleteAccount();
	await accountDeletedPage.validateAccountDeleted();
});