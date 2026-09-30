import { expect } from '@playwright/test';
import { BasePage } from './Base.page.js';

export class AccountDeletedPage extends BasePage {
	constructor(page) {
		super(page);

		this.accountDeletedHeading = this.page.getByRole('heading', { name: 'Account Deleted!' });
		this.continueButton = this.page.getByRole('link', { name: 'Continue' });
	}

		// Confirms the account deletion flow completed successfully.
		async validateAccountDeleted() {
			await expect(this.accountDeletedHeading).toBeVisible();
			console.log('Account deletion confirmation is visible');
		}

		// Returns the user to the homepage after deleting the account.
		async continueToHomePage() {
			await this.continueButton.click();
			await this.page.waitForLoadState('networkidle');
		}
}
