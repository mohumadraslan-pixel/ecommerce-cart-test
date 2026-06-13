const express = require('express');
const router = express.Router();

// In-memory cart storage
let carts = {};

// GET /cart/:userId
router.get('/cart/:userId', (req, res) => {
  const { userId } = req.params;

  const items = carts[userId] || [];
  const total = items.reduce((sum, item) => {
    return sum + item.price * item.quantity;
  }, 0);

  res.status(200).json({
    items,
    total
  });
});

// POST /cart/:userId/add
router.post('/cart/:userId/add', (req, res) => {
  const { userId } = req.params;
  const { productId, name, price, quantity } = req.body;

  if (price <= 0 || quantity < 1) {
    return res.status(400).json({ error: 'Invalid price or quantity' });
  }

  if (!carts[userId]) {
    carts[userId] = [];
  }

  const existing = carts[userId].find(
    item => item.productId === productId
  );

  if (existing) {
    existing.quantity += quantity;
  } else {
    carts[userId].push({
      productId,
      name,
      price,
      quantity
    });
  }

  const total = carts[userId].reduce((sum, item) => {
    return sum + item.price * item.quantity;
  }, 0);

  res.status(201).json({
    items: carts[userId],
    total
  });
});

// TODO: Implement DELETE /cart/:userId/remove/:productId
router.delete('/cart/:userId/remove/:productId', (req, res) => {
  res.status(501).json({ error: 'Not implemented' });
});

// TODO: Implement PUT /cart/:userId/update/:productId
router.put('/cart/:userId/update/:productId', (req, res) => {
  res.status(501).json({ error: 'Not implemented' });
});

// TODO: Implement POST /cart/:userId/checkout
router.post('/cart/:userId/checkout', (req, res) => {
  res.status(501).json({ error: 'Not implemented' });
});

module.exports = router;
