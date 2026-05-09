# Sun Blossom Farms

Marketing site and storefront for Sun Blossom Farms — a small organic blueberry farm in Sequim,
Washington. Ships fresh and frozen berries, pantry goods, U-Pick passes, and runs the Berry Club
membership program.

> *Thank you berry much.*

## Stack

- **Client:** React 18 + React Router + Vite, custom CSS
- **Server:** Node.js + Express, SQLite (`better-sqlite3`)
- **Payments:** Stripe Checkout (one-time orders + recurring memberships)

## Local development

```sh
# Install everything and build the client once
npm run build

# Run the API (serves the built client in production mode)
NODE_ENV=production npm start

# Or, in two terminals during development:
cd server && npm run dev   # API on :3333
cd client && npm run dev   # Vite dev server with /api proxy
```

## Environment variables

| Name | Required | Notes |
| ---- | -------- | ----- |
| `STRIPE_SECRET_KEY` | yes (for payments) | Stripe API secret. When unset, checkout endpoints return a friendly "not configured" message so the rest of the site still works. |
| `PUBLIC_URL` | optional | Used to build success/cancel URLs. Defaults to the request's host. |
| `PORT` | optional | Defaults to `3333`. |
| `DATA_DIR` | optional | Where the SQLite file lives. Defaults to `./data`. |

## Deploy

Configured for Railway via `railway.toml` + `Dockerfile`. Set `STRIPE_SECRET_KEY` and `PUBLIC_URL`
in the Railway environment, attach a volume at `/app/data`, and ship.

## API routes

- `GET  /api/health` — liveness + Stripe-configured flag
- `GET  /api/catalog/products` — product list
- `GET  /api/catalog/memberships` — membership tiers
- `POST /api/checkout/cart` — create a Stripe Checkout session for a cart
- `POST /api/checkout/membership` — create a Stripe Checkout subscription session
- `GET  /api/checkout/session/:id` — reconcile a session after the redirect back
- `POST /api/contact` — receive a contact form submission
