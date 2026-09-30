import { expect } from '@playwright/test';
import { BasePage } from './Base.page.js';

export class ProductsPage extends BasePage {
	constructor(page) {
		super(page);

		this.allProductsHeading = this.page.getByRole('heading', { name: 'All Products' });
		this.searchedProductsHeading = this.page.getByRole('heading', { name: 'Searched Products' });
		this.productsList = this.page.locator('.features_items');
		this.productCards = this.productsList.locator('.product-image-wrapper');
		this.searchInput = this.page.locator('#search_product');
		this.searchButton = this.page.locator('#submit_search');
		this.cartConfirmation = this.page.locator('#cartModal');
		this.viewCartButton = this.cartConfirmation.getByRole('link', { name: 'View Cart' });
		this.continueShoppingButton = this.cartConfirmation.getByRole('button', { name: 'Continue Shopping' });
	}

		// Returns the product card that matches the provided product name.
		getProductCard(productName) {
			return this.productCards.filter({ hasText: productName });
		}

		// Validates that the products page is open and the product list is visible.
		async validateProductsPageVisible() {
			await expect(this.allProductsHeading).toBeVisible();
			await expect(this.productsList).toBeVisible();
			console.log('All Products heading and product list are visible');
		}

		// Confirms a product is visible in the catalog.
		async validateProductVisible(productName) {
			await expect(this.getProductCard(productName)).toBeVisible();
			console.log(`Product "${productName}" is visible in the product list`);
		}

		// Searches for a product by name in the catalog.
		async searchProducts(productName) {
			await this.searchInput.fill(productName);
			await this.searchButton.click();
			await this.page.waitForLoadState('networkidle');
		}

		// Validates that the search results page is displayed with matching products.
		async validateSearchResultsVisible() {
			await expect(this.searchedProductsHeading).toBeVisible();
			await expect(this.productsList).toBeVisible();
			console.log('Searched Products heading and results list are visible');
		}

		// Opens the product details page for the selected product.
		async openProductDetails(productId) {
			await this.page.locator(`a[href="/product_details/${productId}"]`).click();
			await this.page.waitForLoadState('networkidle');
		}

		// Adds a product to the cart from the product listing.
		async addProductToCart(productName) {
			const productCard = this.getProductCard(productName);
			await productCard.hover();
			await productCard.locator('.add-to-cart').first().click();
			await this.page.waitForLoadState('networkidle');
		}

		// Opens the cart after adding a product to the basket.
		async openCartAfterAddingProduct() {
			await this.viewCartButton.click();
			await this.page.waitForLoadState('networkidle');
		}

		// Continues shopping after adding a product without opening the cart.
		async continueShoppingAfterAddingProduct() {
			await this.continueShoppingButton.click();
			await this.page.waitForLoadState('networkidle');
		}
}
