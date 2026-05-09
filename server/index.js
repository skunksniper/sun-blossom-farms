const express = require('express');
const cors = require('cors');
const path = require('path');

const catalogRouter = require('./routes/catalog');
const checkoutRouter = require('./routes/checkout');
const contactRouter = require('./routes/contact');

const app = express();
const PORT = process.env.PORT || 3333;

app.set('trust proxy', 1);

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../client/dist')));
}

app.use(cors());
app.use(express.json());

app.get('/api/health', (req, res) => {
  res.json({
    ok: true,
    stripe: Boolean(process.env.STRIPE_SECRET_KEY),
  });
});

app.use('/api/catalog', catalogRouter);
app.use('/api/checkout', checkoutRouter);
app.use('/api/contact', contactRouter);

if (process.env.NODE_ENV === 'production') {
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../client/dist/index.html'));
  });
} else {
  app.use((req, res) => {
    res.status(404).json({ error: `Route ${req.method} ${req.path} not found` });
  });
}

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Internal server error', details: err.message });
});

app.listen(PORT, () => {
  console.log(`Sun Blossom Farms server running on http://localhost:${PORT}`);
});
