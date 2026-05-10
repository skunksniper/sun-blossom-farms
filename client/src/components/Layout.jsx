import { useEffect, useState } from 'react';
import { Link, NavLink, Outlet, useLocation } from 'react-router-dom';
import { useCart } from '../cart';

function CartIcon() {
  return (
    <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M3 5h2l2.4 11.4a2 2 0 0 0 2 1.6h7.8a2 2 0 0 0 2-1.5L21 8H6" />
      <circle cx="9" cy="21" r="1.4" />
      <circle cx="18" cy="21" r="1.4" />
    </svg>
  );
}

function Header({ open, setOpen, totalItems }) {
  return (
    <header className={`site-header ${open ? 'site-header--open' : ''}`}>
      <div className="site-header__inner">
        <Link to="/" className="brand" aria-label="Sun Blossom Farms home" onClick={() => setOpen(false)}>
          <span className="brand__mark" aria-hidden="true">
            <svg viewBox="0 0 32 32" width="22" height="22">
              <circle cx="11" cy="20" r="6" fill="#7d5dd6" />
              <circle cx="20" cy="18" r="5.5" fill="#9678e0" />
              <circle cx="16" cy="13" r="4.5" fill="#f4c95d" />
            </svg>
          </span>
          <span className="brand__words">
            <span className="brand__name">Sun Blossom</span>
            <span className="brand__tag">Sequim, WA</span>
          </span>
        </Link>

        <nav className="site-nav site-nav--desktop" aria-label="Primary">
          <NavLink to="/shop">Shop</NavLink>
          <NavLink to="/membership">Berry Club</NavLink>
          <NavLink to="/about">Our Farm</NavLink>
          <NavLink to="/visit">Visit</NavLink>
          <NavLink to="/pack" className="site-nav__pack">Pack&nbsp;<span aria-hidden>✦</span></NavLink>
          <NavLink to="/cart" className="site-nav__cart" aria-label={`Cart, ${totalItems} items`}>
            <CartIcon />
            {totalItems > 0 && <span className="cart-count">{totalItems}</span>}
          </NavLink>
        </nav>

        <button
          className="burger"
          aria-label={open ? 'Close menu' : 'Open menu'}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          <span /><span /><span />
        </button>
      </div>
    </header>
  );
}

function Drawer({ open, setOpen, totalItems }) {
  return (
    <>
      {open && <button className="drawer__scrim" aria-label="Close menu" onClick={() => setOpen(false)} />}
      <div
        className={`drawer ${open ? 'drawer--open' : ''}`}
        aria-hidden={!open}
      >
        <nav className="drawer__nav" aria-label="Primary mobile">
          <NavLink to="/" end>Home</NavLink>
          <NavLink to="/shop">Shop</NavLink>
          <NavLink to="/membership">Berry Club</NavLink>
          <NavLink to="/about">Our Farm</NavLink>
          <NavLink to="/visit">Visit</NavLink>
          <NavLink to="/cart">Cart {totalItems > 0 && <span className="cart-count cart-count--inline">{totalItems}</span>}</NavLink>
          <NavLink to="/pack" className="drawer__pack">
            <span>Open a pack</span>
            <span aria-hidden>✦</span>
          </NavLink>
          <NavLink to="/collection" className="drawer__sub">BerryDex</NavLink>
        </nav>
        <p className="drawer__tag">Thank you berry much.</p>
      </div>
    </>
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
            <li><Link to="/pack">Open a pack</Link></li>
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
  const { totalItems } = useCart();
  const [open, setOpen] = useState(false);
  const location = useLocation();

  useEffect(() => { setOpen(false); }, [location.pathname]);
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [open]);

  return (
    <div className="site">
      <Header open={open} setOpen={setOpen} totalItems={totalItems} />
      <Drawer open={open} setOpen={setOpen} totalItems={totalItems} />
      <main className="site-main">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
