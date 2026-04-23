const homeNavItems = [
  { id: 'top', label: 'Home', href: '#top' },
  { id: 'services', label: 'Our story', href: '#services' },
  { id: 'team', label: 'Team', href: '#team' },
  { id: 'faq', label: 'FAQ', href: '#faq' },
  { id: 'contact', label: 'Contact', href: '#contact' }
];

const legalNavItems = homeNavItems.map((item) => ({
  ...item,
  href: `index.html${item.href}`
}));

export function SiteHeader({
  home = false,
  headerBackground = false,
  mobileMenuOpen = false,
  activeSection = 'top',
  onToggleMenu,
  onNavigate
}) {
  const navItems = home ? homeNavItems : legalNavItems;

  return (
    <header className={`header-area header-sticky${headerBackground ? ' background-header' : ''}`}>
      <div className="container">
        <div className="row">
          <div className="col-12">
            <nav className={`main-nav${home ? ' main-nav--home' : ''}`}>
              <a href="index.html" className="logo">
                <img src="assets/images/PocketPallogov2.png" alt="PocketPal" />
              </a>

              <>
                <ul className={`nav${mobileMenuOpen ? ' menu-open' : ''}`}>
                  {navItems.map((item) => (
                    <li className="scroll-to-section" key={item.id}>
                      <a
                        href={item.href}
                        className={home && activeSection === item.id ? 'active' : undefined}
                        onClick={home ? (event) => onNavigate(event, item.href) : undefined}
                      >
                        {item.label}
                      </a>
                    </li>
                  ))}
                </ul>

                <button
                  type="button"
                  className={`menu-trigger${mobileMenuOpen ? ' active' : ''}`}
                  onClick={onToggleMenu}
                  aria-label="Toggle menu"
                >
                  <span>Menu</span>
                </button>
              </>
            </nav>
          </div>
        </div>
      </div>
    </header>
  );
}
