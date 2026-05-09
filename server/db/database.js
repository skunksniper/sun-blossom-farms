const Database = require('better-sqlite3');
const path = require('path');
const fs = require('fs');

const dbDir = process.env.DATA_DIR || path.join(__dirname, '../../data');
if (!fs.existsSync(dbDir)) fs.mkdirSync(dbDir, { recursive: true });

const dbPath = path.join(dbDir, 'sunblossom.db');
const db = new Database(dbPath);

db.pragma('journal_mode = WAL');
db.pragma('foreign_keys = ON');

db.exec(`
  CREATE TABLE IF NOT EXISTS orders (
    id                  INTEGER PRIMARY KEY AUTOINCREMENT,
    stripe_session_id   TEXT UNIQUE NOT NULL,
    stripe_payment_id   TEXT,
    customer_email      TEXT,
    customer_name       TEXT,
    amount_total_cents  INTEGER,
    currency            TEXT DEFAULT 'usd',
    status              TEXT NOT NULL DEFAULT 'pending',
    items_json          TEXT,
    created_at          TEXT NOT NULL DEFAULT (datetime('now'))
  );

  CREATE TABLE IF NOT EXISTS memberships (
    id                       INTEGER PRIMARY KEY AUTOINCREMENT,
    stripe_session_id        TEXT UNIQUE NOT NULL,
    stripe_subscription_id   TEXT,
    stripe_customer_id       TEXT,
    customer_email           TEXT NOT NULL,
    customer_name            TEXT,
    tier                     TEXT NOT NULL,
    status                   TEXT NOT NULL DEFAULT 'pending',
    created_at               TEXT NOT NULL DEFAULT (datetime('now'))
  );

  CREATE INDEX IF NOT EXISTS idx_orders_session ON orders(stripe_session_id);
  CREATE INDEX IF NOT EXISTS idx_memberships_email ON memberships(customer_email);
`);

module.exports = db;
