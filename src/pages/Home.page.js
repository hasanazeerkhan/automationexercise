import { expect } from '@playwright/test';
import { BasePage } from './Base.page.js';

export class HomePage extends BasePage {
	constructor(page) {
		super(page);
		this.homePageNavigationBar = this.page.locator('ul.navbar-nav').getByRole('link', { name: 'Home' });
	}

		// Opens the website home page to start the user journey.
		async navigateToWebsite() {
			await this.page.goto('/');
		}

		// Validates that the home page is loaded and the navigation bar is visible.
		async validateHomePage() {
			await expect(this.page).toHaveURL(/automationexercise\.com\/?$/);
			await expect(this.homePageNavigationBar).toBeVisible();
		}
}
