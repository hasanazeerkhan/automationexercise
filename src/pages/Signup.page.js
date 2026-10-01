import { expect } from '@playwright/test';
import { BasePage } from './Base.page.js';

export class SignupPage extends BasePage {
	constructor(page) {
		super(page);

		this.newUserSignupHeading = this.page.getByRole('heading', { name: 'New User Signup!' });
		this.signupForm = this.page.locator('form').filter({ has: this.page.getByPlaceholder('Name') });
		this.signupNameInput = this.signupForm.getByPlaceholder('Name');
		this.signupEmailInput = this.signupForm.getByPlaceholder('Email Address');
		this.signupButton = this.signupForm.getByRole('button', { name: 'Signup' });
		this.existingEmailErrorMessage = this.signupForm.getByText('Email Address already exist!');
		this.accountInformationHeading = this.page.getByRole('heading', { name: 'Enter Account Information' });
		this.mrRadio = this.page.locator('#id_gender1');
		this.mrsRadio = this.page.locator('#id_gender2');
		this.passwordInput = this.page.locator('#password');
		this.daySelect = this.page.locator('#days');
		this.monthSelect = this.page.locator('#months');
		this.yearSelect = this.page.locator('#years');
		this.newsletterCheckbox = this.page.locator('#newsletter');
		this.receiveOffersCheckbox = this.page.locator('#optin');
		this.firstNameInput = this.page.locator('#first_name');
		this.lastNameInput = this.page.locator('#last_name');
		this.companyInput = this.page.locator('#company');
		this.address1Input = this.page.locator('#address1');
		this.address2Input = this.page.locator('#address2');
		this.countrySelect = this.page.locator('#country');
		this.stateInput = this.page.locator('#state');
		this.cityInput = this.page.locator('#city');
		this.zipcodeInput = this.page.locator('#zipcode');
		this.mobileNumberInput = this.page.locator('#mobile_number');
		this.createAccountButton = this.page.getByRole('button', { name: 'Create Account' });
	}

		// Validates that the signup form is visible before account creation starts.
		async validateSignupFormVisible() {
			await expect(this.newUserSignupHeading).toBeVisible();
			await expect(this.signupNameInput).toBeVisible();
			await expect(this.signupEmailInput).toBeVisible();
			console.log('Signup heading and name and email fields are visible');
		}

		async validateExistingEmailErrorVisible() {
			await expect(this.existingEmailErrorMessage).toBeVisible();
		}

		// Starts the new user signup flow by entering their name and email.
		async startSignup(name, email) {
			await this.signupNameInput.fill(name);
			await this.signupEmailInput.fill(email);
			await this.signupButton.click();
			await expect(this.accountInformationHeading).toBeVisible();
		}

		// Confirms the account details form appears after signup is initiated.
		async validateAccountInformationVisible() {
			await expect(this.accountInformationHeading).toBeVisible();
			console.log('Account information form is visible');
		}

		// Fills in the new user's account information and address details.
		async fillAccountInformation(details) {
			if (details.title === 'Mr') await this.mrRadio.check();
			if (details.title === 'Mrs') await this.mrsRadio.check();

			await this.passwordInput.fill(details.password);
			if (details.dateOfBirth) {
				await this.daySelect.selectOption(String(details.dateOfBirth.day));
				await this.monthSelect.selectOption(String(details.dateOfBirth.month));
				await this.yearSelect.selectOption(String(details.dateOfBirth.year));
			}
			if (details.newsletter) await this.newsletterCheckbox.check();
			if (details.receiveOffers) await this.receiveOffersCheckbox.check();
			await this.firstNameInput.fill(details.firstName);
			await this.lastNameInput.fill(details.lastName);
			if (details.company !== undefined) await this.companyInput.fill(details.company);
			await this.address1Input.fill(details.address1);
			if (details.address2 !== undefined) await this.address2Input.fill(details.address2);
			await this.countrySelect.selectOption({ label: details.country });
			await this.stateInput.fill(details.state);
			await this.cityInput.fill(details.city);
			await this.zipcodeInput.fill(details.zipcode);
			await this.mobileNumberInput.fill(details.mobileNumber);
		}

		// Submits the completed signup form to create the new account.
		async createAccount() {
			await this.createAccountButton.click();
			await this.page.waitForLoadState('domcontentloaded');
		}
}
