import { expect } from '@playwright/test';
import { BasePage } from './Base.page.js';

export class PaymentCompletedPage extends BasePage {
	constructor(page) {
		super(page);

		this.orderPlacedHeading = this.page.getByRole('heading', { name: 'Order Placed!' });
		this.confirmationMessage = this.page.getByText('Congratulations! Your order has been confirmed!');
		this.continueButton = this.page.getByRole('link', { name: 'Continue' });
	}

		// Verifies the purchase is successfully confirmed after payment.
		async validatePaymentCompleted() {
			await expect(this.orderPlacedHeading).toBeVisible();
			await expect(this.confirmationMessage).toBeVisible();
			console.log('Order placed heading and confirmation message are visible');
		}

		// Continues shopping after the successful order confirmation.
		async continueShopping() {
			await this.continueButton.click();
			await this.page.waitForLoadState('networkidle');
		}
}