import { expect } from '@playwright/test';
import { BasePage } from './Base.page.js';

export class CartPage extends BasePage {
	constructor(page) {
		super(page);

		this.cartTable = this.page.locator('#cart_info_table');
		this.cartRows = this.cartTable.locator('tbody tr[id^="product-"]');
		this.proceedToCheckoutButton = this.page.locator('.check_out');
		this.registerLoginButton = this.page.getByRole('link', { name: 'Register / Login' });
	}

		// Returns the cart row for the given product id.
		getProductRow(productId) {
			return this.page.locator(`#product-${productId}`);
		}

		// Validates that the cart page is visible and ready for checkout.
		async validateCartVisible() {
			await expect(this.cartTable).toBeVisible();
			await expect(this.proceedToCheckoutButton).toBeVisible();
			console.log('Shopping cart table is visible');
		}

		// Confirms a product is present in the cart with the expected name.
		async validateProductInCart(productId, productName) {
			await expect(this.getProductRow(productId)).toContainText(productName);
			console.log(`Product "${productName}" is visible in the cart`);
		}

		// Removes a product from the shopping cart.
		async removeProduct(productId) {
			const productRow = this.getProductRow(productId);
			await productRow.locator('.cart_quantity_delete').click();
			await this.page.waitForLoadState('networkidle');
			await expect(productRow).toBeHidden();
		}

		// Moves the user from the cart to the checkout screen.
		async proceedToCheckout() {
			await this.proceedToCheckoutButton.click();
			await this.page.waitForLoadState('networkidle');
		}

		// Starts signup or login when a guest tries to checkout.
		async registerOrLoginToCheckout() {
			await this.registerLoginButton.click();
			await this.page.waitForLoadState('networkidle');
		}
}
