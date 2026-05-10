import { Link, NavLink, Outlet } from 'react-router-dom';
import { useCart } from '../cart';

function Header() {
  const { totalItems } = useCart();
  return (
    <header className="site-header">
      <div className="site-header__inner">
        <Link to="/" className="brand" aria-label="Sun Blossom Farms home">
          <span className="brand__mark" aria-hidden="true">
            <svg viewBox="0 0 32 32" width="22" height="22">
              <circle cx="11" cy="20" r="6" fill="#7d5dd6" />
              <circle cx="20" cy="18" r="5.5" fill="#9678e0" />
              <circle cx="16" cy="13" r="4.5" fill="#f4c95d" />
            </svg>
          </span>
          <span className="brand__words">
            <span className="brand__name">Sun Blossom Farms</span>
            <span className="brand__tag">Sequim, Washington</span>
          </span>
        </Link>
        <nav className="site-nav" aria-label="Primary">
          <NavLink to="/shop">Shop</NavLink>
          <NavLink to="/membership">Berry Club</NavLink>
          <NavLink to="/about">Our Farm</NavLink>
          <NavLink to="/visit">Visit</NavLink>
          <NavLink to="/pack" className="site-nav__pack">Pack ✦</NavLink>
          <NavLink to="/cart" className="site-nav__cart">
            Cart{totalItems > 0 && <span className="cart-count">{totalItems}</span>}
          </NavLink>
        </nav>
      </div>
    </header>
  );
}

function Footer() {
  return (
    <footer className="site-footer">
      <div className="container container--wide site-footer__inner">
        <div>
          <p className="site-footer__brand">Sun Blossom Farms</p>
          <p>Family-grown organic blueberries on the Olympic Peninsula since 2008.</p>
        </div>
        <div>
          <h4>Visit</h4>
          <p>1242 Happy Valley Rd<br />Sequim, WA 98382</p>
          <p>Daily 9–6 in season</p>
        </div>
        <div>
          <h4>Get in touch</h4>
          <p><a href="mailto:hello@sunblossomfarms.com">hello@sunblossomfarms.com</a></p>
          <p>(360) 555-BERRY</p>
        </div>
        <div>
          <h4>Site</h4>
          <ul>
            <li><Link to="/shop">Shop</Link></li>
            <li><Link to="/membership">Berry Club</Link></li>
            <li><Link to="/about">Our story</Link></li>
            <li><Link to="/visit">Visit & contact</Link></li>
          </ul>
        </div>
      </div>
      <div className="container container--wide site-footer__bottom">
        <span>© {new Date().getFullYear()} Sun Blossom Farms · Made on the Olympic Peninsula</span>
        <span className="site-footer__tagline">Thank you berry much.</span>
      </div>
    </footer>
  );
}

export default function Layout() {
  return (
    <div className="site">
      <Header />
      <main className="site-main">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
