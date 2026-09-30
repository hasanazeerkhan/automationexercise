import { expect } from '@playwright/test';
import { BasePage } from './Base.page.js';

export class LoginPage extends BasePage {
	constructor(page) {
		super(page);

		this.loginForm = this.page.locator('form').filter({ hasText: 'Login' });
		this.emailInput = this.loginForm.getByPlaceholder('Email Address');
		this.passwordInput = this.loginForm.getByRole('textbox', { name: 'Password' });
		this.loginButton = this.loginForm.getByRole('button', { name: 'Login' });
		this.loggedInUserText = this.page.getByText(/Logged in as/i);
	}

		// Logs in a registered user with the provided email and password.
		async login(email, password) {
			await this.emailInput.fill(email);
			await this.passwordInput.fill(password);
			await this.loginButton.click();
			await this.page.waitForLoadState('networkidle');
		}

		// Confirms the logged-in username is shown after a successful login.
		async validateLoggedInAs(username) {
			await expect(this.loggedInUserText).toContainText(username);
		}
}
