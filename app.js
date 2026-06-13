const express = require('express');
const router = express.Router();

// In-memory cart storage
let carts = {};

// TODO: Implement GET /cart/:userId — return the user's cart items
// Expected: 200 with { items: [...], total: number }
// Should return empty cart { items: [], total: 0 } if user has no cart
router.get('/cart/:userId', (req, res) => {
  // Your implementation here
});

// TODO: Implement POST /cart/:userId/add — add item to cart
// Body: { productId: string, name: string, price: number, quantity: number }
// Expected: 201 with the updated cart
// Validate that price > 0 and quantity >= 1
// If product already in cart, increment quantity instead of duplicating
router.post('/cart/:userId/add', (req, res) => {
  // Your implementation here
});

// TODO: Implement DELETE /cart/:userId/remove/:productId — remove item from cart
// Expected: 200 with updated cart
// Return 404 if product not in cart
router.delete('/cart/:userId/remove/:productId', (req, res) => {
  // Your implementation here
});

// TODO: Implement PUT /cart/:userId/update/:productId — update item quantity
// Body: { quantity: number }
// Expected: 200 with updated cart
// Validate quantity >= 0 (0 removes the item)
// Return 404 if product not in cart
router.put('/cart/:userId/update/:productId', (req, res) => {
  // Your implementation here
});

// TODO: Implement POST /cart/:userId/checkout — process checkout
// Expected: 200 with { orderId: string, total: number, items: [...] }
// Clear the cart after successful checkout
// Return 400 if cart is empty
router.post('/cart/:userId/checkout', (req, res) => {
  // Your implementation here
});

module.exports = router;
