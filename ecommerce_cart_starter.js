const express = require('express');
const router = express.Router();

// In-memory cart storage
let carts = {};

// Helper: ensure cart exists
function getCart(userId) {
  if (!carts[userId]) {
    carts[userId] = { items: [] };
  }
  return carts[userId];
}

// Helper: calculate total
function calculateTotal(cart) {
  return cart.items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
}

// GET /cart/:userId
router.get('/cart/:userId', (req, res) => {
  const { userId } = req.params;
  const cart = getCart(userId);

  return res.status(200).json({
    items: cart.items,
    total: calculateTotal(cart),
  });
});

// POST /cart/:userId/add
router.post('/cart/:userId/add', (req, res) => {
  const { userId } = req.params;
  const { productId, name, price, quantity } = req.body;

  if (!productId || !name || price <= 0 || quantity < 1) {
    return res.status(400).json({ message: 'Invalid product data' });
  }

  const cart = getCart(userId);

  const existingItem = cart.items.find(
    (item) => item.productId === productId
  );

  if (existingItem) {
    existingItem.quantity += quantity;
  } else {
    cart.items.push({ productId, name, price, quantity });
  }

  return res.status(201).json({
    items: cart.items,
    total: calculateTotal(cart),
  });
});

// DELETE /cart/:userId/remove/:productId
router.delete('/cart/:userId/remove/:productId', (req, res) => {
  const { userId, productId } = req.params;
  const cart = getCart(userId);

  const index = cart.items.findIndex(
    (item) => item.productId === productId
  );

  if (index === -1) {
    return res.status(404).json({ message: 'Product not in cart' });
  }

  cart.items.splice(index, 1);

  return res.status(200).json({
    items: cart.items,
    total: calculateTotal(cart),
  });
});

// PUT /cart/:userId/update/:productId
router.put('/cart/:userId/update/:productId', (req, res) => {
  const { userId, productId } = req.params;
  const { quantity } = req.body;

  if (quantity === undefined || quantity < 0) {
    return res.status(400).json({ message: 'Invalid quantity' });
  }

  const cart = getCart(userId);

  const item = cart.items.find(
    (i) => i.productId === productId
  );

  if (!item) {
    return res.status(404).json({ message: 'Product not in cart' });
  }

  if (quantity === 0) {
    cart.items = cart.items.filter(
      (i) => i.productId !== productId
    );
  } else {
    item.quantity = quantity;
  }

  return res.status(200).json({
    items: cart.items,
    total: calculateTotal(cart),
  });
});

// POST /cart/:userId/checkout
router.post('/cart/:userId/checkout', (req, res) => {
  const { userId } = req.params;
  const cart = getCart(userId);

  if (cart.items.length === 0) {
    return res.status(400).json({ message: 'Cart is empty' });
  }

  const total = calculateTotal(cart);

  const orderId =
    'ORD-' + Date.now() + '-' + Math.floor(Math.random() * 10000);

  const order = {
    orderId,
    total,
    items: cart.items,
  };

  // clear cart after checkout
  carts[userId] = { items: [] };

  return res.status(200).json(order);
});

module.exports = router;