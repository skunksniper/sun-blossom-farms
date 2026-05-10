import { useState } from 'react';
import Photo from '../components/Photo';
import { api } from '../api';
import { photos, fallbackGradients } from '../photos';

export default function Visit() {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState(null);
  const [error, setError] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  function update(field) {
    return (event) => setForm((prev) => ({ ...prev, [field]: event.target.value }));
  }

  async function submit(event) {
    event.preventDefault();
    setSubmitting(true);
    setError(null);
    try {
      await api.sendContact(form);
      setStatus('sent');
      setForm({ name: '', email: '', message: '' });
    } catch (err) {
      setError(err.message);
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="container section">
      <header className="page-header">
        <p className="eyebrow">Visit & contact</p>
        <h1>Come pick some berries.</h1>
      </header>

      <Photo
        src={photos.visit}
        fallback={fallbackGradients.visit}
        alt="The farm at sunset"
        style={{ aspectRatio: '5 / 2', marginBottom: 64 }}
      />

      <div className="visit-grid">
        <section className="visit-info">
          <h2>The farm</h2>
          <p>
            1242 Happy Valley Rd<br />
            Sequim, WA 98382
          </p>
          <p>
            About fifteen minutes off Highway 101, just past the lavender farms. Look for the
            hand-painted blueberry sign at the gate.
          </p>

          <h3>Open hours</h3>
          <p>
            <strong>In season (June 25 – Sept 30):</strong><br />
            Daily, 9am – 6pm
          </p>
          <p>
            <strong>Off-season:</strong><br />
            Farm store open Saturdays only, 10am – 2pm
          </p>

          <h3>U-Pick days</h3>
          <p>
            Wednesdays through Sundays in season. Reserve a slot in the <a href="/shop">shop</a> or
            walk in if there's room. We provide buckets and lemonade; you provide the appetite.
          </p>

          <h3>Get in touch</h3>
          <p>
            <a href="mailto:hello@sunblossomfarms.com">hello@sunblossomfarms.com</a><br />
            (360) 555-BERRY
          </p>
        </section>

        <section>
          <h2>Send us a note</h2>
          {status === 'sent' && (
            <div className="banner banner--ok">Thanks! We read every note and will reply soon.</div>
          )}
          {error && <div className="banner banner--error">{error}</div>}
          <form className="visit-form" onSubmit={submit}>
            <label>
              <span>Your name</span>
              <input type="text" required value={form.name} onChange={update('name')} />
            </label>
            <label>
              <span>Email</span>
              <input type="email" required value={form.email} onChange={update('email')} />
            </label>
            <label>
              <span>Message</span>
              <textarea rows="5" required value={form.message} onChange={update('message')} />
            </label>
            <button className="btn btn--primary" type="submit" disabled={submitting}>
              {submitting ? 'Sending…' : 'Send'}
            </button>
          </form>
        </section>
      </div>
    </div>
  );
}
