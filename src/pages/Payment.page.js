import { expect } from '@playwright/test';
import { BasePage } from './Base.page.js';

export class PaymentPage extends BasePage {
	constructor(page) {
		super(page);

		this.nameOnCardInput = this.page.locator('input[name="name_on_card"]');
		this.cardNumberInput = this.page.locator('input[name="card_number"]');
		this.cvcInput = this.page.locator('input[name="cvc"]');
		this.expiryMonthInput = this.page.locator('input[name="expiry_month"]');
		this.expiryYearInput = this.page.locator('input[name="expiry_year"]');
		this.payAndConfirmButton = this.page.getByRole('button', { name: 'Pay and Confirm Order' });
	}

		async validatePaymentFormVisible() {
			await expect(this.nameOnCardInput).toBeVisible();
			await expect(this.cardNumberInput).toBeVisible();
			await expect(this.cvcInput).toBeVisible();
			await expect(this.expiryMonthInput).toBeVisible();
			await expect(this.expiryYearInput).toBeVisible();
			await expect(this.payAndConfirmButton).toBeVisible();
		}

		async validatePaymentDetails(details) {
			await expect(this.nameOnCardInput).toHaveValue(details.name);
			await expect(this.cardNumberInput).toHaveValue(details.cardNumber);
			await expect(this.cvcInput).toHaveValue(details.cvc);
			await expect(this.expiryMonthInput).toHaveValue(details.expiryMonth);
			await expect(this.expiryYearInput).toHaveValue(details.expiryYear);
		}

		// Fills in the card details needed to complete the payment.
		async fillPaymentDetails({ name, cardNumber, cvc, expiryMonth, expiryYear }) {
			await this.nameOnCardInput.fill(name);
			await this.cardNumberInput.fill(cardNumber);
			await this.cvcInput.fill(cvc);
			await this.expiryMonthInput.fill(expiryMonth);
			await this.expiryYearInput.fill(expiryYear);
		}

		// Submits the payment and confirms the order.
		async submitPayment() {
			await this.payAndConfirmButton.click();
			await this.page.waitForLoadState('networkidle');
		}
}