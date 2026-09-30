import { expect } from '@playwright/test';
import { BasePage } from './Base.page.js';

export class CheckoutPage extends BasePage {
	constructor(page) {
		super(page);

		this.addressDetailsHeading = this.page.getByRole('heading', { name: 'Address Details' });
		this.reviewOrderHeading = this.page.getByRole('heading', { name: 'Review Your Order' });
		this.deliveryAddress = this.page.locator('#address_delivery');
		this.billingAddress = this.page.locator('#address_invoice');
		this.orderComment = this.page.locator('textarea[name="message"]');
		this.placeOrderButton = this.page.getByRole('link', { name: 'Place Order' });
	}

		// Validates that the checkout page and order summary are visible.
		async validateCheckoutPageVisible() {
			await expect(this.addressDetailsHeading).toBeVisible();
			await expect(this.reviewOrderHeading).toBeVisible();
			await expect(this.deliveryAddress).toBeVisible();
			await expect(this.billingAddress).toBeVisible();
			console.log('Checkout address details and order review are visible');
		}

		// Adds the order comment before continuing to payment.
		async addOrderComment(userName) {
			const comment = `Order placed by ${userName}`;
			await this.orderComment.fill(comment);
		}

		// Sends the order to the payment step for card entry.
		async placeOrder() {
			await this.placeOrderButton.click();
			await this.page.waitForLoadState('networkidle');
		}
}