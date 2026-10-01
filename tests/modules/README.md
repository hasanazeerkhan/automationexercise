# Module Tests

Put focused tests here when the main goal is to verify one feature or a small, directly related step. Keep setup minimal, assert the feature's visible behavior, and avoid covering an entire cross-feature journey. Reuse authenticated state for features that require a signed-in user.

- `cart.spec.js`: adding a product and checking it appears in the cart.
- `checkout.spec.js`: checkout details and order comments.
- `contactUs.spec.js`: Contact Us page and form visibility for a signed-in user.
- `login.spec.js`: valid login and signed-in username.
- `navigation.spec.js`: signed-in navigation links and logout.
- `payment.spec.js`: payment form and card details.
- `paymentCompleted.spec.js`: successful payment confirmation.
- `products.spec.js`: product search and matching results.
- `signup.spec.js`: signup form visibility.
