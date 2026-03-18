import privacyContent from './content/privacy-content.html?raw';
import securityContent from './content/security-content.html?raw';
import termsContent from './content/terms-content.html?raw';

export const legalPages = {
  privacy: {
    title: 'Privacy Policy',
    subtitle: 'Effective date: December 2025',
    documentTitle: 'Privacy Policy - PocketPal Solutions',
    footerYear: '2025',
    contentHtml: privacyContent
  },
  security: {
    title: 'Security',
    subtitle: 'Our Commitment to Data Protection',
    documentTitle: 'Security - PocketPal Solutions',
    footerYear: '2025',
    contentHtml: securityContent
  },
  terms: {
    title: 'Terms of Use',
    subtitle: 'Effective date: December 2025',
    documentTitle: 'Terms of Use - PocketPal Solutions',
    footerYear: '2025',
    contentHtml: termsContent
  }
};
