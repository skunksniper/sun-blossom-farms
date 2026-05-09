import { Link } from 'react-router-dom';

export default function Home() {
  return (
    <>
      <section className="hero">
        <div className="hero__field" aria-hidden="true">
          <Berry top="14%" left="8%" size={70} delay={0} />
          <Berry top="62%" left="12%" size={48} delay={0.4} />
          <Berry top="22%" left="78%" size={62} delay={0.7} />
          <Berry top="68%" left="82%" size={54} delay={1.1} />
          <Berry top="40%" left="90%" size={38} delay={1.5} />
          <Berry top="78%" left="48%" size={44} delay={0.2} />
        </div>
        <div className="container hero__inner">
          <p className="eyebrow">Sequim, Washington · Family-run since 2008</p>
          <h1 className="hero__title">Plump, sun-grown blueberries —<br />picked at the perfect moment.</h1>
          <p className="hero__lede">
            We grow seven heirloom and modern varieties on the Olympic Peninsula and ship them to your door.
            Fresh in summer, frozen all year, jammed and syruped on the farm.
          </p>
          <div className="hero__cta">
            <Link to="/shop" className="btn btn--primary">Shop the harvest</Link>
            <Link to="/membership" className="btn btn--ghost">Join the Berry Club</Link>
          </div>
          <p className="hero__tag">— Thank you berry much.</p>
        </div>
      </section>

      <section className="container section">
        <div className="feature-grid">
          <article className="feature">
            <div className="feature__icon" aria-hidden="true">{IconSun}</div>
            <h3>Sequim sunshine</h3>
            <p>The "Blue Hole" microclimate gives us 300+ sunny days a year — and it shows up in every bite.</p>
          </article>
          <article className="feature">
            <div className="feature__icon" aria-hidden="true">{IconLeaf}</div>
            <h3>Grown without spray</h3>
            <p>We've been certified organic since 2011. No synthetic pesticides, ever. Just compost and patience.</p>
          </article>
          <article className="feature">
            <div className="feature__icon" aria-hidden="true">{IconHand}</div>
            <h3>Hand-picked</h3>
            <p>Every berry goes through a human hand before it goes in the box. The shriveled ones don't make the cut.</p>
          </article>
          <article className="feature">
            <div className="feature__icon" aria-hidden="true">{IconTruck}</div>
            <h3>Shipped fast</h3>
            <p>Fresh orders ship Monday through Wednesday so they reach you at peak ripeness — never on a weekend.</p>
          </article>
        </div>
      </section>

      <section className="strip">
        <div className="container strip__inner">
          <div>
            <h2>The Berry Club</h2>
            <p>
              A members-only ring around our little farm. Discounts on everything we sell, first dibs on each
              variety as it ripens, and a quarterly Berry Box that makes summer last all year.
            </p>
            <Link to="/membership" className="btn btn--primary">See membership tiers</Link>
          </div>
          <ul className="strip__perks">
            <li>10–20% off all online orders</li>
            <li>Quarterly Berry Box deliveries</li>
            <li>Free U-Pick passes</li>
            <li>Members-only farm dinners</li>
          </ul>
        </div>
      </section>

      <section className="container section">
        <div className="quotes">
          <Quote
            text="The best blueberries we've ever had — sweeter than anything from the store, and the jam is unreal."
            who="Marisol K., Port Angeles"
          />
          <Quote
            text="The U-Pick day was a highlight of our summer. The kids ate more than they brought home."
            who="The Tanaka family, Seattle"
          />
          <Quote
            text="Berry Box arrived perfectly frozen and lasted us through January. Worth every cent."
            who="Dev R., Bellingham"
          />
        </div>
      </section>
    </>
  );
}

function Berry({ top, left, size, delay }) {
  return (
    <span
      className="berry-bubble"
      style={{ top, left, width: size, height: size, animationDelay: `${delay}s` }}
    />
  );
}

function Quote({ text, who }) {
  return (
    <figure className="quote">
      <blockquote>“{text}”</blockquote>
      <figcaption>— {who}</figcaption>
    </figure>
  );
}

const IconSun = (
  <svg viewBox="0 0 24 24" width="32" height="32" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round">
    <circle cx="12" cy="12" r="4" />
    <path d="M12 2v3M12 19v3M2 12h3M19 12h3M4.5 4.5l2 2M17.5 17.5l2 2M4.5 19.5l2-2M17.5 6.5l2-2" />
  </svg>
);

const IconLeaf = (
  <svg viewBox="0 0 24 24" width="32" height="32" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
    <path d="M5 19c0-8 6-14 15-14 0 9-6 15-15 15Z" />
    <path d="M5 19 14 10" />
  </svg>
);

const IconHand = (
  <svg viewBox="0 0 24 24" width="32" height="32" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
    <path d="M7 11V5a2 2 0 1 1 4 0v5" />
    <path d="M11 10V4a2 2 0 1 1 4 0v6" />
    <path d="M15 10V6a2 2 0 1 1 4 0v9a6 6 0 0 1-6 6h-1c-3 0-5-2-6-5l-2-5a2 2 0 0 1 3-2l2 3" />
  </svg>
);

const IconTruck = (
  <svg viewBox="0 0 24 24" width="32" height="32" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
    <path d="M3 7h11v9H3zM14 10h4l3 3v3h-7z" />
    <circle cx="7" cy="18" r="2" />
    <circle cx="17" cy="18" r="2" />
  </svg>
);
