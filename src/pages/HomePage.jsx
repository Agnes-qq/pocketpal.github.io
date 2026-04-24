import { useEffect, useMemo, useRef, useState } from 'react';
import { Preloader } from '../components/Preloader';
import { SiteFooter } from '../components/SiteFooter';
import { SiteHeader } from '../components/SiteHeader';

const homeSectionNavItems = [
  { id: 'top', label: 'Home', href: '#top' },
  { id: 'problem', label: 'The gap', href: '#problem' },
  { id: 'services', label: 'Our story', href: '#services' },
  { id: 'news', label: 'News', href: '#news' },
  { id: 'traction', label: 'Capabilities', href: '#traction' },
  { id: 'team', label: 'Team', href: '#team' },
  { id: 'faq', label: 'FAQ', href: '#faq' },
  { id: 'contact', label: 'Contact', href: '#contact' }
];

const problemStats = [
  { value: '82%', label: 'of people in the U.S. do not use a structured time management system' },
  { value: '75.5%', label: 'of students struggle with procrastination' },
  { value: '45%', label: 'of students say they do not feel connected to school' },
  { value: '20M+', label: 'college students struggle to find compatible study partners' }
];

/** General tabs (areas) + title row under each area for individual screens. */
const heroDemoTabs = [
  {
    id: 'started',
    label: 'Getting started',
    slides: [
      { id: 'onboard-1', kind: 'image', src: 'assets/images/onboard1.png', title: 'Getting started — profile' },
      { id: 'onboard-2', kind: 'image', src: 'assets/images/onboard2.png', title: 'Getting started — onboarding' },
      { id: 'onboard-3', kind: 'image', src: 'assets/images/onboard3.png', title: 'Getting started — flow' }
    ]
  },
  {
    id: 'groups',
    label: 'Groups',
    slides: [
      { id: 'group-1', kind: 'image', src: 'assets/images/groupchat1.png', title: 'Groups — conversation' },
      { id: 'group-2', kind: 'image', src: 'assets/images/groupchat2.png', title: 'Groups — sharing' }
    ]
  },
  {
    id: 'video',
    label: 'Video demo',
    slides: [{ id: 'video', kind: 'video', title: 'Walkthrough video' }]
  }
];

/** Program and press coverage; each item is one tab in the News section. */
const newsCoverageItems = [
  {
    id: 'duke-pratt',
    tabLabel: 'Duke Engineering',
    headline: 'From Idea to MVP: PocketPal',
    outlet: 'Pratt School of Engineering · Duke master’s programs news',
    dateline: 'Durham, N.C. · November 20, 2025',
    abstract:
      'Duke’s Pratt School of Engineering profiles PocketPal’s path from student founders to a testable MVP: co-founders Angela Liang and Agnes Yan (Duke FinTech, class of 2025) built an AI-assisted platform for academic planning, study-group matching, and progress insight—developed through Duke FinTech’s Incubate course with mentorship from faculty and the program’s entrepreneurship community. The story describes how PocketPal turns isolated scheduling into coordinated peer learning and how the team plans to extend pilots beyond Duke.',
    url: 'https://masters.pratt.duke.edu/news/from-idea-to-mvp-pocketpal/',
    urlLabel: 'Read the full article on Duke’s site'
  }
];

const heroPillars = [
  {
    title: 'Coordinated learning',
    desc: 'Peers, schedules, and coursework stay connected — not scattered across inboxes and one-off tools.'
  },
  {
    title: 'Adaptive planning',
    desc: 'AI-assisted plans and timelines that adjust as the real term unfolds, not just week-one intentions.'
  },
  {
    title: 'Campus-wide clarity',
    desc: 'Insight from how students actually coordinate — so teams can support without defaulting to surveillance.'
  }
];

const campusCapabilities = [
  {
    id: 'peers',
    title: 'Study groups & peer support',
    summary:
      'Helps students find study partners and form groups that fit what they are taking without manual reach-out, group assignment by admin, and constant manual follow-ups. Gentle check-ins keep people on track, and your team gets simple tools to organize demand at scale.',
    technical:
      'Course- and major-aware study partner matching, accountability pairs, automated check-ins, and staff tools to create and manage groups — so high volumes of peer requests do not all land in one inbox.'
  },
  {
    id: 'planning',
    title: 'Plans for the real semester',
    summary:
      'Turns syllabi and deadlines into a clear week-by-week plan that updates when life gets busy. Students see what to do next; plans stay aligned with how the term actually unfolds.',
    technical:
      'Syllabus upload and deadline extraction, AI-assisted task breakdown and time estimates, habit-aware scheduling, and hooks for class and campus calendars so student plans stay tied to real term rhythm.'
  },
  {
    id: 'analytics',
    title: 'Insight for student success teams',
    summary:
      'Shows how students are connecting and engaging over time—at a useful level for improving programs, not watching individuals. Fits alongside the systems your campus already runs on.',
    technical:
      'Admin views for group activity, engagement trends, and semester rollups with exportable stats — aggregate signals from how students use coordination features, designed to complement (not replace) your SIS and LMS.'
  }
];

const faqItems = [
  {
    q: 'What is Campus Companion vs. the broader PocketPal vision?',
    a: 'PocketPal is the AI-native campus layer — workload, peers, schedules, and institutional insight in one direction. Campus Companion is how we package that for universities today: governance, rollout, and reporting fit for pilots. The student-facing app is part of the same arc; packaging differs by school, and we walk through it on a call.'
  },
  {
    q: 'Who is PocketPal for today?',
    a: 'We are focused on universities and colleges — especially teams responsible for peer tutoring, resource centers, advising, or holistic student success. If that is your mandate, we are happy to explore fit.'
  },
  {
    q: 'How is this different from a personal calendar or productivity app?',
    a: 'Those tools are built for one person’s week. We care about how whole cohorts coordinate — peers, staff, and academic rhythm together — which changes what you measure and how you intervene.'
  },
  {
    q: 'How is this different from incumbent student success platforms?',
    a: 'Many platforms center alerts, cases, and staff-entered data. PocketPal centers live coordination: automated grouping, student-initiated planning and check-ins, and aggregate analytics derived from those workflows — so the product changes what students do next, not only what staff see after the fact.'
  },
  {
    q: 'How do you think about privacy and student data?',
    a: 'We treat privacy and trust as product requirements, not footnotes. High-level practices are on our privacy and security pages; anything operational goes through your procurement and legal process.'
  },
  {
    q: 'How can our school learn more or run a pilot?',
    a: 'Use the contact form or email pocketpalrevolution@gmail.com. We start with a discovery call (scope, stakeholders, timeline), then provide pilot outlines, technical overview, and security references aligned to your procurement process.'
  }
];

const storyParagraphs = [
  'PocketPal’s north star is an AI-native campus: one intelligent layer for workload, peer connection, schedules, and institutional insight — not another siloed productivity app. That vision came from time on the ground with student success teams, watching where coordination breaks when volume is high.',
  'Today we are a small team across product, engineering, and infrastructure, with advisors who know higher ed culture and procurement. University pilots are how we ship: written scope, student trust as a requirement, and release cycles tied to measurable coordination outcomes on each campus.'
];

const teamMembers = [
  {
    image: 'assets/images/member-01.jpg',
    role: 'Co-founder',
    name: 'Angela Liang',
    linkedin: 'https://www.linkedin.com/in/angelaliang2019/',
    profileBio:
      'Sets product vision and strategy, leads partnerships, and runs go-to-market for students and partner schools.'
  },
  {
    image: 'assets/images/member-02.jpg',
    role: 'Co-founder',
    name: 'Agnes Yan',
    linkedin: 'https://www.linkedin.com/in/agnesyan/',
    profileBio:
      'Leads engineering and delivery, ships quickly with partners, and keeps operations and quality on track.'
  },
  {
    image: 'assets/images/member-ken.jpg',
    role: 'Infrastructure & Security Lead',
    name: 'Ken Ho',
    linkedin: 'https://www.linkedin.com/in/kenhofc/',
    profileBio:
      'Leads infrastructure and security, strengthening the reliability, scalability, and technical foundation of the platform.'
  },
  {
    image: 'assets/images/member-john.jpg',
    role: 'Higher Education & Institutional Strategy Advisor',
    name: 'John Fimbel',
    linkedin: 'https://www.linkedin.com/in/john-fimbel-a47b914/',
    profileBio:
      "Advises on higher education strategy, institutional context, and university-facing positioning to support PocketPal's long-term relevance and partnerships."
  }
];

const navSectionIds = ['top', 'problem', 'services', 'news', 'traction', 'team', 'faq', 'cta', 'contact'];

export function HomePage() {
  const [loaded, setLoaded] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [sectionGuideOpen, setSectionGuideOpen] = useState(false);
  const [headerBackground, setHeaderBackground] = useState(false);
  const [activeSection, setActiveSection] = useState('top');
  const [heroTabId, setHeroTabId] = useState(heroDemoTabs[0].id);
  const [heroPaneIndex, setHeroPaneIndex] = useState(0);
  const [openFaqId, setOpenFaqId] = useState(null);
  const [teamFlippedKey, setTeamFlippedKey] = useState(null);
  const [tractionFlippedId, setTractionFlippedId] = useState(null);
  const [newsTabId, setNewsTabId] = useState(newsCoverageItems[0].id);
  const [formValues, setFormValues] = useState({ name: '', email: '', message: '' });
  const videoRef = useRef(null);

  const activeHeroTab = useMemo(() => heroDemoTabs.find((t) => t.id === heroTabId) ?? heroDemoTabs[0], [heroTabId]);

  const tabSlideCount = activeHeroTab.slides.length;

  const activeNewsItem = useMemo(
    () => newsCoverageItems.find((item) => item.id === newsTabId) ?? newsCoverageItems[0],
    [newsTabId]
  );

  const activeHeroSlide = useMemo(
    () => activeHeroTab.slides[Math.min(heroPaneIndex, Math.max(0, tabSlideCount - 1))] ?? activeHeroTab.slides[0],
    [activeHeroTab, heroPaneIndex, tabSlideCount]
  );

  useEffect(() => {
    document.title = 'PocketPal · AI-native campus layer';
    const timer = window.setTimeout(() => setLoaded(true), 50);

    const handleScroll = () => {
      const headerText = document.querySelector('.header-text');
      const header = document.querySelector('header');
      const scroll = window.scrollY;
      const threshold = headerText && header ? headerText.offsetHeight - header.offsetHeight : 50;
      setHeaderBackground(scroll >= threshold);

      /** Document Y of section top; offsetTop alone is wrong across mixed offsetParents. */
      const sectionDocumentTop = (element) => element.getBoundingClientRect().top + scroll;

      const activationLine = scroll + 160;

      const currentSection = [...navSectionIds].reverse().find((sectionId) => {
        const element = document.getElementById(sectionId);
        return element && activationLine >= sectionDocumentTop(element);
      });

      if (currentSection) {
        setActiveSection(currentSection);
      }
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll);

    if (window.location.hash) {
      window.setTimeout(() => {
        const sectionId = window.location.hash.replace('#', '');
        const element = document.getElementById(sectionId);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 150);
    }

    return () => {
      window.clearTimeout(timer);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  useEffect(() => {
    if (mobileMenuOpen) {
      setSectionGuideOpen(false);
    }
  }, [mobileMenuOpen]);

  useEffect(() => {
    if (activeHeroSlide.kind !== 'video' || !videoRef.current) {
      return undefined;
    }

    const playTimer = window.setTimeout(() => {
      videoRef.current?.play().catch(() => undefined);
    }, 350);

    return () => {
      window.clearTimeout(playTimer);
      videoRef.current?.pause();
    };
  }, [activeHeroSlide]);

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (!element) {
      return;
    }

    element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    window.history.replaceState(null, '', `#${sectionId}`);
    setMobileMenuOpen(false);
    setSectionGuideOpen(false);
  };

  const handleNavClick = (event, href) => {
    if (!href.startsWith('#')) {
      return;
    }

    event.preventDefault();
    scrollToSection(href.slice(1));
  };

  const handleSendEmail = () => {
    const subject = encodeURIComponent(`New Message from ${formValues.name}`);
    const body = encodeURIComponent(`Email: ${formValues.email}\n\n${formValues.message}`);
    window.location.href = `mailto:pocketpalrevolution@gmail.com?subject=${subject}&body=${body}`;
  };

  const selectHeroSection = (id) => {
    setHeroTabId(id);
    setHeroPaneIndex(0);
  };

  const goHeroPrevSlide = () => {
    if (tabSlideCount <= 1) {
      return;
    }
    setHeroPaneIndex((i) => (i - 1 + tabSlideCount) % tabSlideCount);
  };

  const goHeroNextSlide = () => {
    if (tabSlideCount <= 1) {
      return;
    }
    setHeroPaneIndex((i) => (i + 1) % tabSlideCount);
  };

  return (
    <>
      <Preloader loaded={loaded} />
      <SiteHeader
        home
        headerBackground={headerBackground}
        mobileMenuOpen={mobileMenuOpen}
        activeSection={activeSection}
        onToggleMenu={() => setMobileMenuOpen((value) => !value)}
        onNavigate={handleNavClick}
      />

      <nav
        id="section-guide-nav"
        className={`section-guide-nav${headerBackground ? ' section-guide-nav--under-fixed-header' : ''}${sectionGuideOpen ? ' is-open' : ''}`}
        aria-label="On this page"
      >
        <div className="container section-guide-nav__container">
          <div className="section-guide-nav__bar">
            <span className="section-guide-nav__kicker">On this page</span>
            <button
              type="button"
              className="section-guide-nav__mobile-toggle"
              onClick={() => setSectionGuideOpen((value) => !value)}
              aria-expanded={sectionGuideOpen}
              aria-controls="section-guide-nav-links"
              id="section-guide-nav-toggle"
            >
              <span>{sectionGuideOpen ? 'Close' : 'Sections'}</span>
              <i className={`fa ${sectionGuideOpen ? 'fa-angle-up' : 'fa-angle-down'}`} aria-hidden="true"></i>
            </button>
            <ul className="section-guide-nav__list" id="section-guide-nav-links">
              {homeSectionNavItems.map((item) => (
                <li key={item.id}>
                  <a
                    href={item.href}
                    className={activeSection === item.id ? 'is-active' : undefined}
                    onClick={(event) => handleNavClick(event, item.href)}
                    aria-current={activeSection === item.id ? 'true' : undefined}
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </nav>

      <div className="main-banner main-banner--home" id="top">
        <div className="container">
          <div className="row align-items-center hero-product-row">
            <div className="col-lg-5">
              <div className="header-text hero-header-text hero-header-text--pitch hero-header-text--split">
                <p className="hero-eyebrow">PocketPal · AI-native campus</p>
                <h2>Building the AI-native campus</h2>
                <p className="hero-lead">
                  One intelligent layer for workload, peer learning, schedules, and institutional insight. Schools partner with us through
                  Campus Companion and focused pilots — shipping toward the full AI-native campus step by step.
                </p>
              </div>
              <div className="hero-video-button-wrap hero-cta-row hero-cta-row--split">
                <button type="button" className="hero-primary-cta" onClick={() => scrollToSection('contact')}>
                  Request a pilot
                </button>
                <button type="button" className="hero-secondary-cta" onClick={() => scrollToSection('traction')}>
                  Explore capabilities
                </button>
              </div>
            </div>
            <div className="col-lg-7">
              <div className="hero-demo-shell" id="product-tour" aria-label="Product preview carousel">
                <p className="hero-demo-shell__label">See the layer in the product</p>
                <div className="hero-demo-stage">
                  <div className="hero-demo-tabs" role="tablist" aria-label="Product areas">
                    {heroDemoTabs.map((tab) => (
                      <button
                        key={tab.id}
                        type="button"
                        role="tab"
                        aria-selected={heroTabId === tab.id}
                        aria-controls="hero-demo-panel"
                        id={`hero-demo-section-${tab.id}`}
                        className={`hero-demo-tab${heroTabId === tab.id ? ' is-active' : ''}`}
                        onClick={() => selectHeroSection(tab.id)}
                      >
                        {tab.label}
                      </button>
                    ))}
                  </div>
                  <div
                    className="hero-product-carousel"
                    role="tabpanel"
                    id="hero-demo-panel"
                    aria-labelledby={`hero-demo-section-${heroTabId}`}
                    aria-label={`${activeHeroTab.label} — ${activeHeroSlide.title}`}
                  >
                    <div className="hero-demo-card hero-demo-card--carousel" role="region" aria-roledescription="carousel" aria-label="Product tour">
                      <p className="hero-demo-slide-title" aria-live="polite">
                        {activeHeroSlide.title}
                      </p>
                      <div className="hero-product-carousel__viewport">
                        {tabSlideCount > 1 ? (
                          <button
                            type="button"
                            className="hero-product-carousel__flip hero-product-carousel__flip--prev"
                            onClick={goHeroPrevSlide}
                            aria-label="Previous screen in this section"
                          >
                            <i className="fa fa-angle-left" aria-hidden="true"></i>
                          </button>
                        ) : (
                          <span className="hero-product-carousel__flip-spacer" aria-hidden="true" />
                        )}
                        {activeHeroSlide.kind === 'video' ? (
                          <div className="hero-demo-video hero-demo-video--carousel">
                            <video
                              ref={videoRef}
                              className="hero-demo-video__el"
                              controls
                              playsInline
                              preload="metadata"
                            >
                              <source src="assets/videos/PocketPal Demo v2.mp4" type="video/mp4" />
                              Your browser does not support the video tag.
                            </video>
                          </div>
                        ) : (
                          <div className="hero-demo-image hero-demo-image--carousel">
                            <img src={activeHeroSlide.src} alt={`${activeHeroSlide.title} — product preview`} />
                          </div>
                        )}
                        {tabSlideCount > 1 ? (
                          <button
                            type="button"
                            className="hero-product-carousel__flip hero-product-carousel__flip--next"
                            onClick={goHeroNextSlide}
                            aria-label="Next screen in this section"
                          >
                            <i className="fa fa-angle-right" aria-hidden="true"></i>
                          </button>
                        ) : (
                          <span className="hero-product-carousel__flip-spacer" aria-hidden="true" />
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="row hero-pillars" role="list">
            {heroPillars.map((pillar) => (
              <div className="col-12 col-md-4" key={pillar.title} role="listitem">
                <div className="hero-pillar">
                  <h3 className="hero-pillar__title">{pillar.title}</h3>
                  <p className="hero-pillar__desc">{pillar.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <section className="section pp-problem" id="problem">
        <div className="container">
          <div className="row">
            <div className="col-lg-10 offset-lg-1 text-center">
              <div className="section-heading">
                <h2>Why the campus needs a new layer</h2>
                <p className="support-cloud-subtitle">
                  Students are overloaded; peer support is central to success — yet coordination still runs on ad hoc tools and staff bandwidth. An
                  AI-native campus is not more dashboards; it is software that helps the whole system move together.
                </p>
              </div>
            </div>
          </div>
          <div className="row pp-problem-stats">
            {problemStats.map((stat) => (
              <div className="col-lg-3 col-md-6" key={stat.label}>
                <div className="pp-stat-card">
                  <div className="pp-stat-card__value">{stat.value}</div>
                  <p className="pp-stat-card__label">{stat.label}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section pp-story" id="services">
        <div className="container">
          <div className="row">
            <div className="col-lg-8 offset-lg-2 text-center">
              <div className="section-heading">
                <h2>How we got here</h2>
                <p className="support-cloud-subtitle">From campus reality to a long-term bet on the AI-native campus.</p>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-lg-8 offset-lg-2 pp-story__body">
              {storyParagraphs.map((paragraph, index) => (
                <p key={index}>{paragraph}</p>
              ))}
              <p className="pp-story__link-wrap">
                <a href="#news" className="story-link" onClick={(event) => handleNavClick(event, '#news')}>
                  <span className="story-link__label">Program and press coverage — News</span>
                  <span className="story-link__icon" aria-hidden="true">
                    <i className="fa fa-arrow-right"></i>
                  </span>
                </a>
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="section pp-news" id="news">
        <div className="container">
          <div className="row">
            <div className="col-lg-8 offset-lg-2 text-center">
              <div className="section-heading">
                <h2>News</h2>
                <p className="support-cloud-subtitle">
                  Coverage and program features, with a short abstract for each item. Follow the link for the full story.
                </p>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-lg-10 offset-lg-1 col-xl-8 offset-xl-2">
              <div className="pp-news-shell">
                <div className="pp-news-tabs" role="tablist" aria-label="News coverage">
                  {newsCoverageItems.map((item) => (
                    <button
                      key={item.id}
                      type="button"
                      role="tab"
                      aria-selected={newsTabId === item.id}
                      aria-controls="pp-news-panel"
                      id={`pp-news-tab-${item.id}`}
                      className={`pp-news-tab${newsTabId === item.id ? ' is-active' : ''}`}
                      onClick={() => setNewsTabId(item.id)}
                    >
                      {item.tabLabel}
                    </button>
                  ))}
                </div>
                <div
                  className="pp-news-panel"
                  role="tabpanel"
                  id="pp-news-panel"
                  aria-labelledby={`pp-news-tab-${newsTabId}`}
                >
                  <p className="pp-news-panel__outlet">{activeNewsItem.outlet}</p>
                  <h3 className="pp-news-panel__headline">{activeNewsItem.headline}</h3>
                  <p className="pp-news-panel__dateline">{activeNewsItem.dateline}</p>
                  <p className="pp-news-panel__abstract">{activeNewsItem.abstract}</p>
                  <a
                    href={activeNewsItem.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="pp-news-panel__cta"
                  >
                    {activeNewsItem.urlLabel}
                    <i className="fa fa-arrow-right pp-news-panel__cta-icon" aria-hidden="true"></i>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section pp-traction" id="traction">
        <div className="container">
          <div className="row">
            <div className="col-lg-12 text-center">
              <div className="section-heading">
                <h2>What PocketPal is built to do</h2>
                <p className="support-cloud-subtitle">
                  Three parts of the campus layer — peer programs, student planning, and team-facing visibility — the same themes you browse in the
                  hero product tour above. Each card starts in plain language; flip it for product and integration detail.
                </p>
              </div>
            </div>
          </div>
          <div className="row">
            {campusCapabilities.map((item) => {
              const isFlipped = tractionFlippedId === item.id;

              const toggleTractionFlip = () => {
                setTractionFlippedId((current) => (current === item.id ? null : item.id));
              };

              const onTractionCardKeyDown = (event) => {
                if (event.key === 'Enter' || event.key === ' ') {
                  event.preventDefault();
                  toggleTractionFlip();
                }
              };

              return (
                <div className="col-lg-4 col-md-12" key={item.id}>
                  <div
                    className={`pp-traction-card pp-traction-card--flip${isFlipped ? ' is-flipped' : ''}`}
                    role="button"
                    tabIndex={0}
                    aria-expanded={isFlipped}
                    aria-label={
                      isFlipped
                        ? `${item.title}: technical details shown. Activate to return to summary.`
                        : `${item.title}: summary. Activate to show technical details.`
                    }
                    onClick={toggleTractionFlip}
                    onKeyDown={onTractionCardKeyDown}
                  >
                    <div className="pp-traction-flip-inner">
                      <div className="pp-traction-flip-front">
                        <h3 className="pp-traction-card__title">{item.title}</h3>
                        <p className="pp-traction-card__summary">{item.summary}</p>
                        <p className="pp-traction-flip-hint">Technical details</p>
                      </div>
                      <div className="pp-traction-flip-back">
                        <p className="pp-traction-flip-back-label">Technical overview</p>
                        <p className="pp-traction-flip-back-topic">{item.title}</p>
                        <p className="pp-traction-card__technical">{item.technical}</p>
                        <p className="pp-traction-flip-hint pp-traction-flip-hint--back">Back to summary</p>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <div className="team section" id="team">
        <div className="container">
          <div className="row">
            <div className="col-lg-12 text-center">
              <div className="section-heading">
                <h2>Team</h2>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-lg-10 offset-lg-1 col-xl-8 offset-xl-2 text-center">
              <div className="team-section-intro">
                <h3 className="team-section-intro__title">
                  A team focused on the campus layer
                </h3>
                <p className="team-section-intro__sub">
                  PocketPal was founded by Angela Liang and Agnes Yan. We build with students and partner schools to deliver practical AI that
                  improves student outcomes and campus operations.
                </p>
              </div>
            </div>
          </div>
          <div className="row team-cards-row">
            {teamMembers.map((member) => {
              const flipKey = member.name;
              const isFlipped = teamFlippedKey === flipKey;

              const toggleFlip = () => {
                setTeamFlippedKey((current) => (current === flipKey ? null : flipKey));
              };

              const onTeamCardKeyDown = (event) => {
                if (event.key === 'Enter' || event.key === ' ') {
                  event.preventDefault();
                  toggleFlip();
                }
              };

              return (
                <div className="col-lg-3 col-md-6" key={member.name}>
                  <div
                    className={`team-member team-flip${isFlipped ? ' is-flipped' : ''}`}
                    role="button"
                    tabIndex={0}
                    aria-expanded={isFlipped}
                    aria-label={
                      isFlipped
                        ? `${member.name}, responsibilities shown. Activate to return to front.`
                        : `${member.name}. Activate to read responsibilities.`
                    }
                    onClick={toggleFlip}
                    onKeyDown={onTeamCardKeyDown}
                  >
                    <div className="team-flip-inner">
                      <div className="team-flip-front">
                        <div className="main-content">
                          <img src={member.image} alt={member.name} />
                          <span className="category">{member.role}</span>
                          <h4>{member.name}</h4>
                          {member.linkedin ? (
                            <ul className="social-icons">
                              <li>
                                <a
                                  href={member.linkedin}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  aria-label={`${member.name} on LinkedIn`}
                                  onClick={(event) => event.stopPropagation()}
                                >
                                  <i className="fab fa-linkedin"></i>
                                </a>
                              </li>
                            </ul>
                          ) : null}
                          <p className="team-flip-hint">View role</p>
                        </div>
                      </div>
                      <div className="team-flip-back">
                        <div className="main-content main-content--back">
                          <img src={member.image} alt="" aria-hidden="true" />
                          <span className="category">{member.role}</span>
                          <h4>{member.name}</h4>
                          <p className="team-flip-bio">{member.profileBio}</p>
                          <p className="team-flip-hint team-flip-hint--back">Back</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <section className="section pp-faq" id="faq">
        <div className="container">
          <div className="row">
            <div className="col-lg-12 text-center">
              <div className="section-heading">
                <h2>Frequently asked questions</h2>
                <p className="support-cloud-subtitle">Starting points for a conversation — not a substitute for a live walkthrough.</p>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-lg-8 offset-lg-2">
              <div className="pp-faq-list">
                {faqItems.map((faq, index) => {
                  const fid = `faq-${index}`;
                  const isOpen = openFaqId === fid;
                  return (
                    <div className={`pp-faq-item${isOpen ? ' is-open' : ''}`} key={fid}>
                      <button
                        type="button"
                        className="pp-faq-item__trigger"
                        aria-expanded={isOpen}
                        aria-controls={`${fid}-panel`}
                        id={`${fid}-trigger`}
                        onClick={() => setOpenFaqId(isOpen ? null : fid)}
                      >
                        <span>{faq.q}</span>
                        <i className={`fa fa-angle-down pp-faq-item__icon${isOpen ? ' is-open' : ''}`} aria-hidden="true"></i>
                      </button>
                      <div
                        id={`${fid}-panel`}
                        role="region"
                        aria-labelledby={`${fid}-trigger`}
                        className="pp-faq-item__panel"
                        hidden={!isOpen}
                      >
                        <p>{faq.a}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section pp-mid-cta" id="cta">
        <div className="container">
          <div className="row">
            <div className="col-lg-10 offset-lg-1">
              <div className="pp-mid-cta__inner">
                <div className="pp-mid-cta__copy">
                  <h2>Explore a campus pilot</h2>
                  <p>
                    If you are responsible for student success, peer programs, or how the campus coordinates learning, we would like to hear what
                    an AI-native layer could mean for you — scope, safeguards, and a sensible first deployment.
                  </p>
                </div>
                <button type="button" className="pp-mid-cta__button" onClick={() => scrollToSection('contact')}>
                  Start a conversation
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="contact-us section" id="contact">
        <div className="container">
          <div className="row">
            <div className="col-lg-6 align-self-center">
              <div className="section-heading">
                <h6>Contact</h6>
                <h2>Talk to the PocketPal team</h2>
                <p>
                  Pilots, partnerships, and press — reach us by form or at{' '}
                  <a href="mailto:pocketpalrevolution@gmail.com">pocketpalrevolution@gmail.com</a>.
                </p>
              </div>
            </div>
            <div className="col-lg-6">
              <div className="contact-us-content">
                <form id="contact-form" onSubmit={(event) => event.preventDefault()}>
                  <div className="row">
                    <div className="col-lg-12">
                      <fieldset>
                        <input
                          type="text"
                          name="name"
                          id="name"
                          placeholder="Your Name..."
                          autoComplete="on"
                          required
                          value={formValues.name}
                          onChange={(event) => setFormValues((value) => ({ ...value, name: event.target.value }))}
                        />
                      </fieldset>
                    </div>
                    <div className="col-lg-12">
                      <fieldset>
                        <input
                          type="email"
                          name="email"
                          id="email"
                          placeholder="Your E-mail..."
                          required
                          value={formValues.email}
                          onChange={(event) => setFormValues((value) => ({ ...value, email: event.target.value }))}
                        />
                      </fieldset>
                    </div>
                    <div className="col-lg-12">
                      <fieldset>
                        <textarea
                          name="message"
                          id="message"
                          placeholder="Your Message"
                          value={formValues.message}
                          onChange={(event) => setFormValues((value) => ({ ...value, message: event.target.value }))}
                        ></textarea>
                      </fieldset>
                    </div>
                    <div className="col-lg-12">
                      <fieldset>
                        <button type="button" onClick={handleSendEmail}>
                          Send Message Now
                        </button>
                      </fieldset>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>

      <SiteFooter year="2026" />
    </>
  );
}
