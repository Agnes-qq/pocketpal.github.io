export function SiteFooter({ year = '2026' }) {
  return (
    <footer className="site-footer">
      <div className="container">
        <div className="row site-footer__grid">
          <div className="col-lg-3 col-md-6 site-footer__brand">
            <h3 className="site-footer__logo">PocketPal</h3>
            <p className="site-footer__tagline">Building the AI-native campus — an intelligent layer for workload, peers, and institutional insight.</p>
          </div>
          <div className="col-lg-2 col-md-6">
            <h4 className="site-footer__heading">Product</h4>
            <ul className="site-footer__links">
              <li>
                <a href="index.html#product-tour">Product tour</a>
              </li>
              <li>
                <a href="index.html#contact">Request a pilot</a>
              </li>
            </ul>
          </div>
          <div className="col-lg-2 col-md-6">
            <h4 className="site-footer__heading">Resources</h4>
            <ul className="site-footer__links">
              <li>
                <a href="https://masters.pratt.duke.edu/news/from-idea-to-mvp-pocketpal/" target="_blank" rel="noopener noreferrer">
                  Duke Pratt story
                </a>
              </li>
              <li>
                <a href="index.html#faq">FAQ</a>
              </li>
              <li>
                <a href="index.html#traction">Capabilities</a>
              </li>
            </ul>
          </div>
          <div className="col-lg-2 col-md-6">
            <h4 className="site-footer__heading">Company</h4>
            <ul className="site-footer__links">
              <li>
                <a href="index.html#services">Story</a>
              </li>
              <li>
                <a href="index.html#team">Team</a>
              </li>
              <li>
                <a href="index.html#contact">Contact</a>
              </li>
              <li>
                <a href="mailto:pocketpalrevolution@gmail.com">Email</a>
              </li>
            </ul>
          </div>
          <div className="col-lg-3 col-md-6">
            <h4 className="site-footer__heading">Legal</h4>
            <ul className="site-footer__links">
              <li>
                <a href="privacy.html">Privacy</a>
              </li>
              <li>
                <a href="security.html">Security</a>
              </li>
              <li>
                <a href="terms-of-use.html">Terms of use</a>
              </li>
            </ul>
          </div>
        </div>
        <div className="site-footer__bottom">
          <p>Copyright © {year} PocketPal Revolution Inc. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
