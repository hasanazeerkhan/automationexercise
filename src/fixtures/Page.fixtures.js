import { test as base, expect } from '@playwright/test';
import { AccountCreatedPage } from '../pages/AccountCreated.page.js';
import { AccountDeletedPage } from '../pages/AccountDeleted.page.js';
import { CartPage } from '../pages/Cart.page.js';
import { CheckoutPage } from '../pages/Checkout.page.js';
import { ContactPage } from '../pages/Contact.page.js';
import { HomePage } from '../pages/Home.page.js';
import { LoginPage } from '../pages/Login.page.js';
import { NavigationTab } from '../pages/Navigation.Tab.js';
import { PaymentPage } from '../pages/Payment.page.js';
import { PaymentCompletedPage } from '../pages/PaymentCompleted.page.js';
import { ProductsPage } from '../pages/Products.page.js';
import { SignupPage } from '../pages/Signup.page.js';

/**
 * @typedef {Object} CustomPageFixtures
 * @property {import('../pages/Home.page.js').HomePage} homePage
 * @property {import('../pages/Navigation.Tab.js').NavigationTab} NavigationTab
 * @property {import('../pages/Login.page.js').LoginPage} loginPage
 * @property {import('../pages/Signup.page.js').SignupPage} signupPage
 * @property {import('../pages/Products.page.js').ProductsPage} productsPage
 * @property {import('../pages/Cart.page.js').CartPage} cartPage
 * @property {import('../pages/Checkout.page.js').CheckoutPage} checkoutPage
 * @property {import('../pages/Payment.page.js').PaymentPage} paymentPage
 * @property {import('../pages/PaymentCompleted.page.js').PaymentCompletedPage} paymentCompletedPage
 * @property {import('../pages/Contact.page.js').ContactPage} contactPage
 * @property {import('../pages/AccountCreated.page.js').AccountCreatedPage} accountCreatedPage
 * @property {import('../pages/AccountDeleted.page.js').AccountDeletedPage} accountDeletedPage
 */

/** @type {import('@playwright/test').TestType<CustomPageFixtures>} */
export const test = base.extend({
	homePage: [async ({ page }, use) => {
		const homePage = new HomePage(page);
		await homePage.navigateToWebsite();
		await use(homePage);
	}, { auto: true }],
	NavigationTab: async ({ page }, use) => {
		await use(new NavigationTab(page));
	},
	loginPage: async ({ page }, use) => {
		await use(new LoginPage(page));
	},
	signupPage: async ({ page }, use) => {
		await use(new SignupPage(page));
	},
	productsPage: async ({ page }, use) => {
		await use(new ProductsPage(page));
	},
	cartPage: async ({ page }, use) => {
		await use(new CartPage(page));
	},
	checkoutPage: async ({ page }, use) => {
		await use(new CheckoutPage(page));
	},
	paymentPage: async ({ page }, use) => {
		await use(new PaymentPage(page));
	},
	paymentCompletedPage: async ({ page }, use) => {
		await use(new PaymentCompletedPage(page));
	},
	contactPage: async ({ page }, use) => {
		await use(new ContactPage(page));
	},
	accountCreatedPage: async ({ page }, use) => {
		await use(new AccountCreatedPage(page));
	},
	accountDeletedPage: async ({ page }, use) => {
		await use(new AccountDeletedPage(page));
	},
});

/** @type {import('@playwright/test').TestType<CustomPageFixtures>} */
export const authenticatedTest = test.extend({
	storageState: ['playwright/.auth/user.json', { option: true }],
});

export { expect };
