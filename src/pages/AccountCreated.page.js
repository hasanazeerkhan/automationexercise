import { expect } from '@playwright/test';
import { BasePage } from './Base.page.js';

export class AccountCreatedPage extends BasePage {
	constructor(page) {
		super(page);

		this.accountCreatedHeading = this.page.getByRole('heading', { name: 'Account Created!' });
		this.continueButton = this.page.getByRole('link', { name: 'Continue' });
	}

		// Confirms the account was created successfully.
		async validateAccountCreated() {
			await expect(this.accountCreatedHeading).toBeVisible();
			console.log('Account creation confirmation is visible');
		}

		// Continues from the account success page back to the main website.
		async continueToHomePage() {
			await this.continueButton.click();
			await this.page.waitForLoadState('networkidle');
		}
}
