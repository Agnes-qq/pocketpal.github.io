import { useEffect, useState } from 'react';
import { Preloader } from '../components/Preloader';
import { SiteFooter } from '../components/SiteFooter';
import { SiteHeader } from '../components/SiteHeader';

export function LegalPage({ title, subtitle, contentHtml, footerYear, documentTitle }) {
  const [loaded, setLoaded] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [headerBackground, setHeaderBackground] = useState(false);

  useEffect(() => {
    document.title = documentTitle;
    const readyTimer = window.setTimeout(() => setLoaded(true), 50);

    const onScroll = () => {
      setHeaderBackground(window.scrollY > 40);
    };

    onScroll();
    window.addEventListener('scroll', onScroll);

    return () => {
      window.clearTimeout(readyTimer);
      window.removeEventListener('scroll', onScroll);
    };
  }, [documentTitle]);

  return (
    <>
      <Preloader loaded={loaded} />
      <SiteHeader
        headerBackground={headerBackground}
        mobileMenuOpen={mobileMenuOpen}
        onToggleMenu={() => setMobileMenuOpen((value) => !value)}
      />

      <div className="main-banner" id="top" style={{ minHeight: '300px' }}>
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="header-text legal-header-text">
                <h1>{title}</h1>
                <p>{subtitle}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="services section legal-page-section" style={{ paddingTop: '80px' }}>
        <div className="container">
          <div className="row">
            <div className="col-lg-10 offset-lg-1">
              <div className="legal-content" dangerouslySetInnerHTML={{ __html: contentHtml }} />
            </div>
          </div>
        </div>
      </div>

      <SiteFooter year={footerYear} />
    </>
  );
}
