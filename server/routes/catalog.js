const express = require('express');
const { PRODUCTS, MEMBERSHIPS } = require('../catalog');

const router = express.Router();

router.get('/products', (req, res) => {
  res.json({ products: Object.values(PRODUCTS) });
});

router.get('/memberships', (req, res) => {
  res.json({ memberships: Object.values(MEMBERSHIPS) });
});

module.exports = router;
