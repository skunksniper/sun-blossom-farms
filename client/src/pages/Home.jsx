import { Link } from 'react-router-dom';
import Photo from '../components/Photo';
import { photos, fallbackGradients } from '../photos';

export default function Home() {
  return (
    <>
      <section className="hero">
        <Photo src={photos.hero} fallback={fallbackGradients.hero} alt="Bowl of fresh blueberries" loading="eager" />
        <div className="hero__shade" />
        <div className="hero__inner">
          <p className="eyebrow">Sequim, Washington · Est. 2008</p>
          <h1 className="hero__title">
            Sun-grown blueberries,<br />
            <em>picked at the peak.</em>
          </h1>
          <p className="hero__lede">
            Twelve acres of organic bushes on the Olympic Peninsula. Seven varieties, hand-picked,
            shipped at peak ripeness. Fresh in summer, frozen all year, and small-batch jams from
            our kitchen.
          </p>
          <div className="hero__cta">
            <Link to="/shop" className="btn btn--light">Shop the harvest →</Link>
            <Link to="/membership" className="btn btn--ghost" style={{ color: 'var(--bone)', borderColor: 'rgba(255,255,255,0.4)' }}>Join the Berry Club</Link>
          </div>
        </div>
        <p className="hero__tag">— Thank you berry much.</p>
      </section>

      <section className="belt" aria-hidden="true">
        <div className="belt__track">
          {[0, 1].map((i) => (
            <span key={i}>
              Certified organic since 2011
              <span className="belt__dot" />
              Hand-picked, hand-sorted
              <span className="belt__dot" />
              Shipped overnight in season
              <span className="belt__dot" />
              Seven heirloom varieties
              <span className="belt__dot" />
              Family-run, two generations
              <span className="belt__dot" />
            </span>
          ))}
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="split">
            <Photo
              className="split__photo"
              src={photos.story}
              fallback={fallbackGradients.story}
              alt="Hands sorting blueberries"
            />
            <div className="split__body">
              <p className="eyebrow">Our story</p>
              <h2>A small farm in the rain shadow.</h2>
              <p>
                Sequim sits in the &ldquo;Blue Hole&rdquo; of the Olympic Peninsula — the mountains catch the
                rain, and we get the sun. It turns out blueberries love it. Mara and Pete planted
                the first 400 bushes in 2008. Today there are seven varieties across twelve acres,
                and a small jam kitchen at the back of the barn.
              </p>
              <Link to="/about" className="btn btn--ghost">Read our story</Link>
            </div>
          </div>
        </div>
      </section>

      <section className="section section--tight" style={{ background: 'var(--bone-2)' }}>
        <div className="container">
          <div className="split split--reverse">
            <Photo
              className="split__photo"
              src={photos.field}
              fallback={fallbackGradients.field}
              alt="Blueberry field at golden hour"
            />
            <div className="split__body">
              <p className="eyebrow">Grown well</p>
              <h2>No spray, no shortcuts, no compromises.</h2>
              <p>
                We've been certified organic since 2011. We compost everything, plant clover between
                the rows for the bees, and pick by hand. It's a slower way to grow — and it makes for
                sweeter, firmer fruit. The kind that tastes like the blueberries you remember.
              </p>
              <Link to="/shop" className="btn btn--ghost">Shop fresh & frozen</Link>
            </div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container container--wide">
          <div className="pitch">
            <Photo src={photos.membership} fallback={fallbackGradients.membership} alt="Berry box at sunset" />
            <div className="pitch__shade" />
            <div className="pitch__body">
              <p className="eyebrow">The Berry Club</p>
              <h2>Be a regular at the farm.</h2>
              <p>
                Members save up to 20% on everything we grow, get a Berry Box delivered every quarter,
                and have first dibs on each variety as it ripens. An easy way to keep blueberries in
                the kitchen all year.
              </p>
              <Link to="/membership" className="btn btn--light">See membership tiers →</Link>
            </div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', marginBottom: 36, flexWrap: 'wrap', gap: 12 }}>
            <div>
              <p className="eyebrow">From the field</p>
              <h2 style={{ margin: 0 }}>What's growing right now.</h2>
            </div>
            <Link to="/shop" className="link-btn">See everything in the shop →</Link>
          </div>
          <div className="gallery">
            <Photo src={photos.galleryA} fallback={fallbackGradients.galleryA} alt="Cluster of ripe berries" />
            <Photo src={photos.galleryB} fallback={fallbackGradients.galleryB} alt="Bushels at the farm stand" />
            <Photo src={photos.galleryC} fallback={fallbackGradients.galleryC} alt="Jam jars cooling" />
            <Photo src={photos.galleryD} fallback={fallbackGradients.galleryD} alt="Workers at sunrise" />
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <p className="eyebrow">Kind words</p>
          <h2 style={{ marginBottom: 48, maxWidth: '14ch' }}>People send us nice notes.</h2>
          <div className="quotes">
            <Quote
              text="The best blueberries we've ever had. Sweeter than anything from the store, and the jam is unreal."
              who="Marisol K. · Port Angeles"
            />
            <Quote
              text="The U-Pick day was a highlight of our summer. The kids ate more than they brought home."
              who="The Tanaka family · Seattle"
            />
            <Quote
              text="Berry Box arrived perfectly frozen and lasted us through January. Worth every cent."
              who="Dev R. · Bellingham"
            />
          </div>
        </div>
      </section>
    </>
  );
}

function Quote({ text, who }) {
  return (
    <figure className="quote">
      <blockquote>&ldquo;{text}&rdquo;</blockquote>
      <figcaption>{who}</figcaption>
    </figure>
  );
}
