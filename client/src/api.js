async function request(path, options = {}) {
  const res = await fetch(path, {
    headers: { 'Content-Type': 'application/json' },
    ...options,
  });
  const text = await res.text();
  const data = text ? JSON.parse(text) : null;
  if (!res.ok) {
    const message = (data && data.error) || `Request failed: ${res.status}`;
    throw new Error(message);
  }
  return data;
}

export const api = {
  getProducts: () => request('/api/catalog/products'),
  getMemberships: () => request('/api/catalog/memberships'),
  startCartCheckout: (items) =>
    request('/api/checkout/cart', { method: 'POST', body: JSON.stringify({ items }) }),
  startMembershipCheckout: (tier) =>
    request('/api/checkout/membership', { method: 'POST', body: JSON.stringify({ tier }) }),
  getCheckoutSession: (id) => request(`/api/checkout/session/${id}`),
  sendContact: (payload) =>
    request('/api/contact', { method: 'POST', body: JSON.stringify(payload) }),
};

export function formatMoney(cents, currency = 'USD') {
  return new Intl.NumberFormat('en-US', { style: 'currency', currency }).format((cents || 0) / 100);
}
