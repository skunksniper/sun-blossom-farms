const express = require('express');
const db = require('../db/database');
const { PRODUCTS, MEMBERSHIPS } = require('../catalog');

const router = express.Router();

const stripeKey = process.env.STRIPE_SECRET_KEY;
const stripe = stripeKey ? require('stripe')(stripeKey) : null;

function getOrigin(req) {
  return process.env.PUBLIC_URL || `${req.protocol}://${req.get('host')}`;
}

// Create a Stripe Checkout session for a cart of products (one-time payment).
router.post('/cart', async (req, res, next) => {
  try {
    if (!stripe) {
      return res.status(503).json({
        error: 'Online payments are not configured yet. Please contact us at orders@sunblossomfarms.com to place an order.',
      });
    }

    const { items } = req.body || {};
    if (!Array.isArray(items) || items.length === 0) {
      return res.status(400).json({ error: 'Cart is empty.' });
    }

    const lineItems = [];
    for (const item of items) {
      const product = PRODUCTS[item.id];
      if (!product) return res.status(400).json({ error: `Unknown product: ${item.id}` });
      const qty = Math.max(1, Math.min(50, parseInt(item.qty, 10) || 1));
      lineItems.push({
        price_data: {
          currency: 'usd',
          unit_amount: product.priceCents,
          product_data: {
            name: product.name,
            description: product.description,
          },
        },
        quantity: qty,
      });
    }

    const origin = getOrigin(req);
    const session = await stripe.checkout.sessions.create({
      mode: 'payment',
      line_items: lineItems,
      shipping_address_collection: { allowed_countries: ['US'] },
      success_url: `${origin}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/shop?canceled=1`,
      metadata: { kind: 'cart' },
    });

    db.prepare(`
      INSERT INTO orders (stripe_session_id, status, items_json)
      VALUES (?, 'pending', ?)
    `).run(session.id, JSON.stringify(items));

    res.json({ url: session.url });
  } catch (err) {
    next(err);
  }
});

// Create a Stripe Checkout session for a Berry Club membership (subscription).
router.post('/membership', async (req, res, next) => {
  try {
    if (!stripe) {
      return res.status(503).json({
        error: 'Online memberships are not configured yet. Please contact us at members@sunblossomfarms.com to join.',
      });
    }

    const { tier } = req.body || {};
    const membership = MEMBERSHIPS[tier];
    if (!membership) return res.status(400).json({ error: 'Unknown membership tier.' });

    const origin = getOrigin(req);
    const session = await stripe.checkout.sessions.create({
      mode: 'subscription',
      line_items: [{
        price_data: {
          currency: 'usd',
          unit_amount: membership.priceCents,
          recurring: { interval: membership.interval },
          product_data: {
            name: `Berry Club — ${membership.name}`,
            description: `Sun Blossom Farms ${membership.name} membership (${membership.interval}ly).`,
          },
        },
        quantity: 1,
      }],
      success_url: `${origin}/welcome?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/membership?canceled=1`,
      metadata: { kind: 'membership', tier: membership.id },
    });

    db.prepare(`
      INSERT INTO memberships (stripe_session_id, customer_email, tier, status)
      VALUES (?, '', ?, 'pending')
    `).run(session.id, membership.id);

    res.json({ url: session.url });
  } catch (err) {
    next(err);
  }
});

// After redirect-back, look up the session and reconcile our local record.
router.get('/session/:id', async (req, res, next) => {
  try {
    if (!stripe) return res.status(503).json({ error: 'Stripe not configured.' });
    const session = await stripe.checkout.sessions.retrieve(req.params.id);

    if (session.mode === 'payment' && session.payment_status === 'paid') {
      db.prepare(`
        UPDATE orders
           SET status = 'paid',
               stripe_payment_id = ?,
               customer_email = ?,
               customer_name = ?,
               amount_total_cents = ?,
               currency = ?
         WHERE stripe_session_id = ?
      `).run(
        session.payment_intent || null,
        session.customer_details?.email || null,
        session.customer_details?.name || null,
        session.amount_total || null,
        session.currency || 'usd',
        session.id,
      );
    } else if (session.mode === 'subscription' && session.status === 'complete') {
      db.prepare(`
        UPDATE memberships
           SET status = 'active',
               stripe_subscription_id = ?,
               stripe_customer_id = ?,
               customer_email = ?,
               customer_name = ?
         WHERE stripe_session_id = ?
      `).run(
        session.subscription || null,
        session.customer || null,
        session.customer_details?.email || '',
        session.customer_details?.name || null,
        session.id,
      );
    }

    res.json({
      mode: session.mode,
      status: session.status,
      paymentStatus: session.payment_status,
      email: session.customer_details?.email || null,
      name: session.customer_details?.name || null,
      amountTotal: session.amount_total,
      currency: session.currency,
      metadata: session.metadata || {},
    });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
