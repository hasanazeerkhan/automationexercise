import { expect } from '@playwright/test';
import { BasePage } from './Base.page.js';

export class NavigationTab extends BasePage {
	constructor(page) {
		super(page);

		this.navbar = this.page.locator('ul.navbar-nav');
		this.signupLoginLink = this.page.getByRole('link', { name: /Signup \/ Login/i });
		this.loggedInUserText = this.page.getByText(/Logged in as/i);
		this.homeLink = this.navbar.getByRole('link', { name: 'Home' });
		this.productsLink = this.navbar.getByRole('link', { name: 'Products' });
		this.cartLink = this.navbar.getByRole('link', { name: 'Cart' });
		this.logoutLink = this.navbar.getByRole('link', { name: 'Logout' });
		this.deleteAccountLink = this.navbar.getByRole('link', { name: 'Delete Account' });
		this.testCasesLink = this.navbar.getByRole('link', { name: 'Test Cases' });
		this.apiTestingLink = this.navbar.getByRole('link', { name: 'API Testing' });
		this.videoTutorialsLink = this.navbar.getByRole('link', { name: 'Video Tutorials' });
		this.contactUsLink = this.navbar.getByRole('link', { name: 'Contact us' });
	}

		// Opens the Signup/Login page from the header navigation.
		async clickSignupLogin() {
			await this.signupLoginLink.click();
			await expect(this.page).toHaveURL(/\/login(?:[/?#]|$)/);
		}

		async openLoginPage() {
			await this.page.goto('/login', { waitUntil: 'networkidle' });
			await expect(this.page).toHaveURL(/\/login(?:[/?#]|$)/);
		}

		// Opens the Contact Us page from the main navigation.
		async openContactUs() {
			await this.contactUsLink.click();
			await this.page.waitForLoadState('networkidle');
		}

		// Opens the Products page to continue shopping.
		async openProducts() {
			await this.page.goto('/products', { waitUntil: 'networkidle' });
		}

		// Logs the user out from the active account.
		async logout() {
			await this.logoutLink.click();
			await this.page.waitForLoadState('networkidle');
		}

		async validateLoggedOut() {
			await expect(this.page).toHaveURL(/\/login(?:[/?#]|$)/);
			await expect(this.signupLoginLink).toBeVisible();
		}

		// Deletes the active account from the navigation menu.
		async deleteAccount() {
			await this.deleteAccountLink.click();
			await this.page.waitForLoadState('networkidle');
		}

		// Confirms the logged-in username is displayed in the header.
		async validateLoggedInUser(username) {
			await expect(this.loggedInUserText).toContainText(username);
			console.log(`Logged-in user "${username}" is shown in the navigation bar`);
		}

		async isLoggedInAs(username) {
			return this.loggedInUserText.filter({ hasText: username }).isVisible();
		}

		// Validates that the expected main navigation links are visible.
		async validateNavigationLinksVisible() {
			await expect(this.homeLink).toBeVisible();
			await expect(this.productsLink).toBeVisible();
			await expect(this.cartLink).toBeVisible();
			await expect(this.logoutLink).toBeVisible();
			await expect(this.deleteAccountLink).toBeVisible();
			await expect(this.testCasesLink).toBeVisible();
			await expect(this.apiTestingLink).toBeVisible();
			await expect(this.videoTutorialsLink).toBeVisible();
			await expect(this.contactUsLink).toBeVisible();
			console.log('All expected navigation links are visible');
		}
}
