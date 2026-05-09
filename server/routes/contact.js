const express = require('express');

const router = express.Router();

// Simple contact form receiver. In production, hook up to email/CRM via env-configured webhook.
router.post('/', async (req, res) => {
  const { name, email, message } = req.body || {};
  if (!name || !email || !message) {
    return res.status(400).json({ error: 'Name, email, and message are required.' });
  }
  console.log('[contact] new message', { name, email, length: message.length });
  res.json({ ok: true });
});

module.exports = router;
