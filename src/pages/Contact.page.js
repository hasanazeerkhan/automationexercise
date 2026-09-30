import { expect } from '@playwright/test';
import { BasePage } from './Base.page.js';

export class ContactPage extends BasePage {
	constructor(page) {
		super(page);

		this.pageHeading = this.page.getByRole('heading', { name: 'Contact Us' });
		this.noteText = this.page.getByText('Note: Below contact form is');
		this.getInTouchHeading = this.page.getByRole('heading', { name: 'Get In Touch' });
		this.nameInput = this.page.getByRole('textbox', { name: 'Name' });
		this.emailInput = this.page.getByRole('textbox', { name: 'Email', exact: true });
		this.subjectInput = this.page.getByRole('textbox', { name: 'Subject' });
		this.messageInput = this.page.getByRole('textbox', { name: 'Your Message Here' });
		this.chooseFileButton = this.page.getByRole('button', { name: 'Choose File' });
		this.submitButton = this.page.getByRole('button', { name: 'Submit' });
		this.feedbackHeading = this.page.getByRole('heading', { name: 'Feedback For Us' });
		this.appreciationText = this.page.getByText('We really appreciate your');
		this.feedbackText = this.page.getByText('Kindly share your feedback');
		this.suggestionText = this.page.getByText('If you have any suggestion');
		this.thankYouText = this.page.getByText('Thank you');
		this.addressText = this.page.locator('address');
		this.successMessage = this.page.locator('#contact-page').getByText('Success! Your details have');
		this.homeLink = this.page.locator('ul.navbar-nav').getByRole('link', { name: 'Home' });
	}

		// Validates that the Contact Us page is loaded and ready for use.
		async validateContactUsPageVisible() {
			await expect(this.pageHeading).toBeVisible();
			await expect(this.noteText).toBeVisible();
			await expect(this.getInTouchHeading).toBeVisible();
			console.log('Contact Us page headings and introductory note are visible');
		}

		// Confirms the contact form and support details are visible.
		async validateFormVisibility() {
			await expect(this.nameInput).toBeVisible();
			await expect(this.emailInput).toBeVisible();
			await expect(this.subjectInput).toBeVisible();
			await expect(this.messageInput).toBeVisible();
			await expect(this.chooseFileButton).toBeVisible();
			await expect(this.submitButton).toBeVisible();
			await expect(this.feedbackHeading).toBeVisible();
			await expect(this.appreciationText).toBeVisible();
			await expect(this.feedbackText).toBeVisible();
			await expect(this.suggestionText).toBeVisible();
			await expect(this.thankYouText).toBeVisible();
			await expect(this.addressText).toContainText('We really appreciate your response to our website.');
			console.log('Contact form and feedback information are visible');
		}

		// Fills in the form with the customer support request details.
		async fillContactForm({ name, email, subject, message }) {
			await this.nameInput.fill(name);
			await this.emailInput.fill(email);
			await this.subjectInput.fill(subject);
			await this.messageInput.fill(message);
		}

		// Submits the contact form for processing.
		async submitForm() {
			await this.submitButton.click();
			await this.page.waitForLoadState('networkidle');
		}
}
