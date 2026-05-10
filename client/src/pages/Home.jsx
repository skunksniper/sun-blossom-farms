import { Link } from 'react-router-dom';
import Photo from '../components/Photo';
import Reveal from '../components/Reveal';
import { photos, fallbackGradients } from '../photos';

export default function Home() {
  return (
    <>
      <section className="hero">
        <Photo src={photos.hero} fallback={fallbackGradients.hero} alt="Bowl of fresh blueberries" loading="eager" />
        <div className="hero__shade" />
        <div className="hero__berries" aria-hidden="true">
          {[0,1,2,3,4,5,6,7].map((i) => <span key={i} className="hero__berry" style={{ '--i': i }} />)}
        </div>
        <div className="hero__inner">
          <p className="eyebrow">Sequim, Washington · Est. 2008</p>
          <h1 className="hero__title">
            <span>Sun-grown</span>
            <span><em>blueberries,</em></span>
            <span>picked at the peak.</span>
          </h1>
          <p className="hero__lede">
            Twelve acres of organic bushes on the Olympic Peninsula. Seven varieties, hand-picked,
            shipped at peak ripeness.
          </p>
          <div className="hero__cta">
            <Link to="/shop" className="btn btn--light">Shop the harvest →</Link>
            <Link to="/pack" className="btn btn--ghost btn--ghost-on-dark">Open a pack ✦</Link>
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
          <Reveal className="split">
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
                the first 400 bushes in 2008.
              </p>
              <Link to="/about" className="btn btn--ghost">Read our story</Link>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="section section--tight" style={{ background: 'var(--bone-2)' }}>
        <div className="container">
          <Reveal className="split split--reverse">
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
                Certified organic since 2011. We compost everything, plant clover for the bees,
                and pick by hand. Slower way to grow — sweeter fruit.
              </p>
              <Link to="/shop" className="btn btn--ghost">Shop fresh & frozen</Link>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="section">
        <div className="container container--wide">
          <Reveal>
            <div className="pitch">
              <Photo src={photos.membership} fallback={fallbackGradients.membership} alt="Berry box at sunset" />
              <div className="pitch__shade" />
              <div className="pitch__body">
                <p className="eyebrow">The Berry Club</p>
                <h2>Be a regular at the farm.</h2>
                <p>
                  Save up to 20%, get a Berry Box every quarter, first dibs as each variety ripens.
                </p>
                <Link to="/membership" className="btn btn--light">See membership tiers →</Link>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <Reveal className="home-pack">
            <div>
              <p className="eyebrow">Berry Battle TCG</p>
              <h2>Open a free pack.</h2>
              <p>Twenty creatures. Five cards a pack. A 4% chance of pulling the legendary Sun Blossom.</p>
              <Link to="/pack" className="btn btn--primary">Pull a pack ✦</Link>
            </div>
            <div className="home-pack__deck" aria-hidden="true">
              <span className="home-pack__card home-pack__card--1" />
              <span className="home-pack__card home-pack__card--2" />
              <span className="home-pack__card home-pack__card--3" />
            </div>
          </Reveal>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <Reveal className="home-foot-head">
            <div>
              <p className="eyebrow">From the field</p>
              <h2>What's growing.</h2>
            </div>
            <Link to="/shop" className="link-btn">See everything →</Link>
          </Reveal>
          <Reveal className="gallery">
            <Photo src={photos.galleryA} fallback={fallbackGradients.galleryA} alt="Cluster of ripe berries" />
            <Photo src={photos.galleryB} fallback={fallbackGradients.galleryB} alt="Bushels at the farm stand" />
            <Photo src={photos.galleryC} fallback={fallbackGradients.galleryC} alt="Jam jars cooling" />
            <Photo src={photos.galleryD} fallback={fallbackGradients.galleryD} alt="Workers at sunrise" />
          </Reveal>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <Reveal>
            <p className="eyebrow">Kind words</p>
            <h2 style={{ marginBottom: 48, maxWidth: '14ch' }}>People send us nice notes.</h2>
          </Reveal>
          <Reveal className="quotes">
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
          </Reveal>
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
