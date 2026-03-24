import { useEffect, useMemo, useRef, useState } from 'react';
import { Preloader } from '../components/Preloader';
import { SiteFooter } from '../components/SiteFooter';
import { SiteHeader } from '../components/SiteHeader';

const supportCategoryLabels = {
  'academic-guidance': 'Academic Guidance',
  productivity: 'Productivity',
  'campus-life': 'Campus Life'
};

const homeSectionNavItems = [
  { id: 'top', label: 'Home', href: '#top' },
  { id: 'services', label: 'About Us', href: '#services' },
  { id: 'fun-facts', label: 'Team', href: '#fun-facts' },
  { id: 'events', label: 'Demo', href: '#events' },
  { id: 'contact', label: 'Contact', href: '#contact' }
];

const services = [
  {
    iconClass: 'icon1',
    image: 'assets/images/service-01.png',
    alt: 'Innovative AI solutions',
    title: 'Innovative AI Solutions',
    description:
      'We build AI systems that understand how students actually work across classes, deadlines, and collaboration. PocketPal continuously adapts to reduce overload, improve focus, and support sustainable academic success, while generating insights in a privacy-conscious way that respects individual student data.'
  },
  {
    iconClass: 'icon2',
    image: 'assets/images/service-02.png',
    alt: 'Data-driven student support',
    title: 'Data-Driven & Student-Centric',
    description:
      'Our platform learns from behavior, context, and feedback to deliver personalized scheduling, study support, and group coordination — helping students stay organized without micromanagement.'
  },
  {
    iconClass: 'icon3',
    image: 'assets/images/service-03.png',
    alt: 'Scalable campus vision',
    title: 'Scalable Campus Vision',
    description:
      'PocketPal is designed to scale across universities as a shared intelligent layer for academic coordination — with a long-term vision of becoming the operating system that empowers a smarter, and healthier campus life.'
  }
];

const accordionItems = [
  {
    id: 'collapseTwo',
    headingId: 'headingTwo',
    title: 'AI-Driven Academic Task & Scheduling Orchestration',
    body: 'PocketPal continuously translates academic requirements into actionable plans and adaptive schedules, helping students manage complex workloads without manual planning.'
  },
  {
    id: 'collapseThree',
    headingId: 'headingThree',
    title: 'Built-In Accountability & Peer Coordination',
    body: 'Beyond solo productivity, PocketPal coordinates students into compatible study groups and accountability partnerships, manages check-ins, and facilitates meeting logistics, turning follow-through and collaboration into system-level features, not user effort.'
  },
  {
    id: 'collapseFour',
    headingId: 'headingFour',
    title: 'Privacy-Conscious Institutional Intelligence',
    body: 'PocketPal surfaces aggregate engagement and workload signals that help academic teams understand patterns and coordination needs while keeping individual student data protected by design.'
  }
];

const supportItems = [
  { category: 'campus-life', title: 'Integration of Services', weight: 'xl', tone: 'campus' },
  { category: 'campus-life', title: 'Onboarding Assistance', weight: 'lg', tone: 'campus' },
  { category: 'campus-life', title: 'Events & Clubs', weight: 'md', tone: 'campus' },
  { category: 'campus-life', title: 'Community Engagement', weight: 'lg', tone: 'campus' },
  { category: 'academic-guidance', title: 'Graduation Tracking', weight: 'xl', tone: 'guidance' },
  { category: 'academic-guidance', title: 'Course Planning', weight: 'lg', tone: 'guidance' },
  { category: 'academic-guidance', title: 'Study Group Matching', weight: 'md', tone: 'guidance' },
  { category: 'academic-guidance', title: 'Performance Monitoring', weight: 'md', tone: 'guidance' },
  { category: 'productivity', title: 'Time Management', weight: 'xl', tone: 'productivity' },
  { category: 'productivity', title: 'Task Prediction', weight: 'lg', tone: 'productivity' },
  { category: 'productivity', title: 'Habit Building', weight: 'md', tone: 'productivity' },
  { category: 'productivity', title: 'Well-being Support', weight: 'lg', tone: 'productivity' }
];

const teamMembers = [
  {
    image: 'assets/images/member-01.jpg',
    role: 'Co-founder',
    name: 'Angela Liang',
    linkedin: 'https://www.linkedin.com/in/angelaliang2019/'
  },
  {
    image: 'assets/images/member-02.jpg',
    role: 'Co-founder',
    name: 'Agnes Yan',
    linkedin: 'https://www.linkedin.com/in/agnesyan/'
  }
];

const previews = [
  {
    images: ['assets/images/onboard1.png', 'assets/images/onboard2.png', 'assets/images/onboard3.png'],
    category: 'Personalization',
    title: 'Onboarding Survey',
    description: 'Onboarding surveys and continuous habit analysis tailored to each individual'
  },
  {
    images: ['assets/images/task-prediction-coming-soon.svg'],
    category: 'Smart Scheduling',
    title: 'Task Prediction',
    description: 'Habit-learning algorithm evolving with the interaction with users'
  },
  {
    images: ['assets/images/groupchat1.png', 'assets/images/groupchat2.png'],
    category: 'Community',
    title: 'Groups and Sharing',
    description: 'Engage, share, and grow'
  }
];

const navSectionIds = ['top', 'services', 'fun-facts', 'team', 'events', 'contact'];

function CounterValue({ target, duration = 1000 }) {
  const [value, setValue] = useState(0);

  useEffect(() => {
    let frameId;
    let startTime;

    const animate = (timestamp) => {
      if (!startTime) {
        startTime = timestamp;
      }

      const progress = Math.min((timestamp - startTime) / duration, 1);
      setValue(Math.round(target * progress));

      if (progress < 1) {
        frameId = window.requestAnimationFrame(animate);
      }
    };

    frameId = window.requestAnimationFrame(animate);

    return () => window.cancelAnimationFrame(frameId);
  }, [duration, target]);

  return value.toLocaleString();
}

export function HomePage() {
  const [loaded, setLoaded] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [sidebarExpanded, setSidebarExpanded] = useState(false);
  const [headerBackground, setHeaderBackground] = useState(false);
  const [activeSection, setActiveSection] = useState('top');
  const [showVideo, setShowVideo] = useState(false);
  const [expandedPreview, setExpandedPreview] = useState(null);
  const [popupImageIndex, setPopupImageIndex] = useState(0);
  const [openAccordionId, setOpenAccordionId] = useState(null);
  const [formValues, setFormValues] = useState({ name: '', email: '', message: '' });
  const videoSectionRef = useRef(null);
  const videoRef = useRef(null);

  const supportGroups = useMemo(
    () =>
      Object.entries(supportCategoryLabels).map(([category, label]) => ({
        category,
        label,
        items: supportItems.filter((item) => item.category === category)
      })),
    []
  );

  const selectedPreview = useMemo(
    () => previews.find((preview) => preview.title === expandedPreview) ?? null,
    [expandedPreview]
  );
  const hasMultiplePopupImages = (selectedPreview?.images.length ?? 0) > 1;

  useEffect(() => {
    document.title = 'PocketPal Solutions';
    const timer = window.setTimeout(() => setLoaded(true), 50);

    const handleScroll = () => {
      const headerText = document.querySelector('.header-text');
      const header = document.querySelector('header');
      const scroll = window.scrollY;
      const threshold = headerText && header ? headerText.offsetHeight - header.offsetHeight : 50;
      setHeaderBackground(scroll >= threshold);

      const currentSection = [...navSectionIds].reverse().find((sectionId) => {
        const element = document.getElementById(sectionId);
        return element && scroll + 140 >= element.offsetTop;
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
    if (!showVideo || !videoRef.current) {
      return;
    }

    const scrollTimer = window.setTimeout(() => {
      videoSectionRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }, 100);

    const playTimer = window.setTimeout(() => {
      videoRef.current?.play().catch(() => undefined);
    }, 600);

    return () => {
      window.clearTimeout(scrollTimer);
      window.clearTimeout(playTimer);
    };
  }, [showVideo]);

  useEffect(() => {
    if (!expandedPreview) {
      return undefined;
    }

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        setExpandedPreview(null);
        return;
      }

      if (!selectedPreview?.images.length) {
        return;
      }

      if (event.key === 'ArrowRight') {
        setPopupImageIndex((value) => (value + 1) % selectedPreview.images.length);
      }

      if (event.key === 'ArrowLeft') {
        setPopupImageIndex((value) => (value - 1 + selectedPreview.images.length) % selectedPreview.images.length);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [expandedPreview, selectedPreview]);

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (!element) {
      return;
    }

    element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    window.history.replaceState(null, '', `#${sectionId}`);
    setMobileMenuOpen(false);
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

  const showNextPopupImage = () => {
    if (!selectedPreview?.images.length) {
      return;
    }

    setPopupImageIndex((value) => (value + 1) % selectedPreview.images.length);
  };

  const showPreviousPopupImage = () => {
    if (!selectedPreview?.images.length) {
      return;
    }

    setPopupImageIndex((value) => (value - 1 + selectedPreview.images.length) % selectedPreview.images.length);
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

      <nav className={`floating-section-nav${sidebarExpanded ? ' is-expanded' : ' is-collapsed'}`} aria-label="Page sections">
        <div className="floating-section-nav__inner">
          <button
            type="button"
            className="floating-section-nav__toggle"
            onClick={() => setSidebarExpanded((value) => !value)}
            aria-label={sidebarExpanded ? 'Collapse section navigation' : 'Expand section navigation'}
            aria-expanded={sidebarExpanded}
          >
            <i className={`fa ${sidebarExpanded ? 'fa-angle-left' : 'fa-angle-right'}`}></i>
          </button>
          <span className="floating-section-nav__title">On this page</span>
          <ul className="floating-section-nav__list">
            {homeSectionNavItems.map((item) => (
              <li key={item.id}>
                <a
                  href={item.href}
                  className={activeSection === item.id ? 'active' : undefined}
                  onClick={(event) => handleNavClick(event, item.href)}
                  aria-label={item.label}
                >
                  <span className="floating-section-nav__dot"></span>
                  <span className="floating-section-nav__label">{item.label}</span>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </nav>

      <div
        className="main-banner"
        id="top"
        style={{ padding: '140px 0 80px 0', background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' }}
      >
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="header-text hero-header-text">
                <h2>Welcome to PocketPal Solutions</h2>
                <p>AI-Native Campus Operating System</p>
              </div>
              <div className="col-lg-12 hero-video-button-wrap">
                {!showVideo ? (
                  <button id="watch-video-btn" type="button" onClick={() => setShowVideo(true)}>
                    <i className="fa fa-play" style={{ fontSize: '18px' }}></i>
                    Watch Demo Video
                  </button>
                ) : null}
              </div>
              <div
                className="col-lg-12"
                id="video-section"
                ref={videoSectionRef}
                style={{
                  marginTop: '25px',
                  display: showVideo ? 'flex' : 'none',
                  justifyContent: 'center',
                  opacity: showVideo ? 1 : 0
                }}
              >
                <div id="video-container" style={{ position: 'relative', width: '100%', maxWidth: '1200px', transition: 'all 0.5s ease' }}>
                  <div
                    id="video-wrapper"
                    style={{
                      position: 'relative',
                      width: '100%',
                      paddingBottom: '56.25%',
                      background: '#000',
                      borderRadius: '10px',
                      overflow: 'hidden',
                      boxShadow: '0 15px 50px rgba(0,0,0,0.3)'
                    }}
                  >
                    <video
                      id="pocketpal-video"
                      ref={videoRef}
                      width="100%"
                      height="100%"
                      controls
                      style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        width: '100%',
                        height: '100%',
                        borderRadius: '10px',
                        objectFit: 'contain',
                        background: '#000'
                      }}
                    >
                      <source src="assets/videos/PocketPal Demo v2.mp4" type="video/mp4" />
                      Your browser does not support the video tag.
                    </video>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="services section" id="services" style={{ paddingTop: '0px' }}>
        <div className="container">
          <div className="row">
            <div className="col-lg-12 text-center">
              <div className="section-heading">
                <h2>About us</h2>
                <a
                  href="https://masters.pratt.duke.edu/news/from-idea-to-mvp-pocketpal/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="story-link"
                >
                  <span className="story-link__label">Learn More About Our Story</span>
                  <span className="story-link__icon" aria-hidden="true">
                    <i className="fa fa-arrow-right"></i>
                  </span>
                </a>
              </div>
            </div>
          </div>
        </div>
        <div className="container">
          <div className="row">
            {services.map((service) => (
              <div className="col-lg-4 col-md-6" key={service.title}>
                <div className="service-item">
                  <div className={service.iconClass}>
                    <img src={service.image} alt={service.alt} />
                  </div>
                  <div className="main-content">
                    <h4>{service.title}</h4>
                    <p>{service.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="section about-us">
        <div className="container">
          <div className="row">
            <div className="col-lg-6 offset-lg-1">
              <div className="accordion" id="accordionExample">
                {accordionItems.map((item) => {
                  const isOpen = openAccordionId === item.id;
                  return (
                    <div className="accordion-item" key={item.id}>
                      <h2 className="accordion-header" id={item.headingId}>
                        <button
                          className={`accordion-button${isOpen ? '' : ' collapsed'}`}
                          type="button"
                          aria-expanded={isOpen}
                          aria-controls={item.id}
                          onClick={() => setOpenAccordionId(isOpen ? null : item.id)}
                        >
                          {item.title}
                        </button>
                      </h2>
                      <div id={item.id} className={`accordion-collapse collapse${isOpen ? ' show' : ''}`} aria-labelledby={item.headingId}>
                        <div className="accordion-body">{item.body}</div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
            <div className="col-lg-5 align-self-center">
              <div className="section-heading">
                <h2>What make us unique?</h2>
                <p>
                  PocketPal operates at the institutional coordination layer, not just individual productivity. While existing tools organize
                  tasks or report outcomes, PocketPal actively shapes academic behavior, aligning students, schedules, and support systems in a
                  privacy-first way.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <section className="section courses" id="courses">
        <div className="container">
          <div className="row">
            <div className="col-lg-12 text-center">
              <div className="section-heading">
                <h2>Our AI-Powered Support</h2>
                <p className="support-cloud-subtitle">Explore PocketPal capabilities by category</p>
              </div>
            </div>
          </div>
          <div className="support-groups">
            {supportGroups.map((group) => (
              <section className="support-group" key={group.category} aria-label={group.label}>
                <h3 className="support-group-label">{group.label}</h3>
                <div className="support-word-cloud" role="list" aria-label={`${group.label} word cloud`}>
                  {group.items.map((item) => (
                    <button
                      type="button"
                      className={`support-word support-word--${item.weight} support-word--${item.tone}`}
                      key={`${item.category}-${item.title}`}
                    >
                      {item.title}
                    </button>
                  ))}
                </div>
              </section>
            ))}
          </div>
        </div>
      </section>

      <div className="section fun-facts" id="fun-facts">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="wrapper">
                <div className="row">
                  <div className="col-lg-3 col-md-6">
                    <div className="counter">
                      <h2 className="timer count-title count-number">
                        <CounterValue target={1460} />
                      </h2>
                      <p className="count-text">Revolutionized student experiences from Day 1 to Graduation</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="team section" id="team">
        <div className="container">
          <div className="row">
            {teamMembers.map((member) => (
              <div className="col-lg-3 col-md-6" key={member.name}>
                <div className="team-member">
                  <div className="main-content">
                    <img src={member.image} alt={member.name} />
                    <span className="category">{member.role}</span>
                    <h4>{member.name}</h4>
                    <ul className="social-icons">
                      <li>
                        <a href={member.linkedin} target="_blank" rel="noopener noreferrer" aria-label={`${member.name} LinkedIn`}>
                          <i className="fab fa-linkedin"></i>
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="section events" id="events">
        <div className="container">
          <div className="row">
            <div className="col-lg-12 text-center">
              <div className="section-heading">
                <h2>Demo Preview</h2>
              </div>
            </div>
            {previews.map((preview) => (
              <div className="col-lg-12 col-md-6" key={preview.title}>
                <div className="item">
                  <div className="row">
                    <div className="col-lg-12">
                      <ul>
                        <li>
                          <span className="category">{preview.category}</span>
                          <h4>{preview.title}</h4>
                        </li>
                        <li>
                          <h6>{preview.description}</h6>
                        </li>
                      </ul>
                      <button
                        type="button"
                        className={`demo-expand-button${expandedPreview === preview.title ? ' is-open' : ''}`}
                        onClick={() =>
                          preview.images.length
                            ? setExpandedPreview((value) => {
                                const nextValue = value === preview.title ? null : preview.title;
                                setPopupImageIndex(0);
                                return nextValue;
                              })
                            : undefined
                        }
                        aria-label={`Expand ${preview.title}`}
                        aria-expanded={expandedPreview === preview.title}
                        disabled={!preview.images.length}
                      >
                        <i className="fa fa-angle-right"></i>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {expandedPreview && selectedPreview ? (
        <div className="demo-popup-overlay" role="dialog" aria-modal="true" aria-label={`${expandedPreview} preview gallery`}>
          <div className="demo-popup-backdrop" onClick={() => setExpandedPreview(null)}></div>
          <div className={`demo-popup-window${expandedPreview === 'Onboarding Survey' ? ' demo-popup-window--compact' : ''}`}>
            <button type="button" className="demo-popup-close" onClick={() => setExpandedPreview(null)} aria-label="Close preview">
              <i className="fa fa-times"></i>
            </button>
            <div className="demo-popup-gallery">
              {hasMultiplePopupImages ? (
                <button type="button" className="demo-popup-nav demo-popup-nav--left" onClick={showPreviousPopupImage} aria-label="Previous image">
                  <i className="fa fa-angle-left"></i>
                </button>
              ) : null}
              <button
                type="button"
                className="demo-popup-image-button"
                onClick={hasMultiplePopupImages ? showNextPopupImage : undefined}
                aria-label={hasMultiplePopupImages ? 'Next image' : `${expandedPreview} preview`}
              >
                <img src={selectedPreview.images[popupImageIndex]} alt={`${expandedPreview} preview ${popupImageIndex + 1}`} />
              </button>
              {hasMultiplePopupImages ? (
                <button type="button" className="demo-popup-nav demo-popup-nav--right" onClick={showNextPopupImage} aria-label="Next image">
                  <i className="fa fa-angle-right"></i>
                </button>
              ) : null}
            </div>
          </div>
        </div>
      ) : null}

      <div className="contact-us section" id="contact">
        <div className="container">
          <div className="row">
            <div className="col-lg-6 align-self-center">
              <div className="section-heading">
                <h6>Contact Us</h6>
                <h2>Feel free to contact us anytime</h2>
                <p>Thank you for choosing us!</p>
                <div className="special-offer">
                  <h4>Try Demo!</h4>
                </div>
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
