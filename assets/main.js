const navToggle = document.querySelector('[data-nav-toggle]');
const nav = document.querySelector('[data-nav]');
const header = document.querySelector('[data-header]');

// Shared GA4 property for jeneconk.com and its tagged subdomains.
const JENECONK_GA4_ID = 'G-0CJ60EYHBL';
window.dataLayer = window.dataLayer || [];
window.gtag = window.gtag || function () { window.dataLayer.push(arguments); };
window.gtag('js', new Date());
window.gtag('config', JENECONK_GA4_ID, { transport_type: 'beacon' });

if (!document.querySelector(`script[src*="googletagmanager.com/gtag/js?id=${JENECONK_GA4_ID}"]`)) {
  const analyticsScript = document.createElement('script');
  analyticsScript.async = true;
  analyticsScript.src = `https://www.googletagmanager.com/gtag/js?id=${JENECONK_GA4_ID}`;
  document.head.appendChild(analyticsScript);
}

const trackJeneconkEvent = (eventName, parameters = {}) => {
  if (typeof window.gtag === 'function') window.gtag('event', eventName, parameters);
};

document.addEventListener('click', (event) => {
  const link = event.target.closest('a[href]');
  if (!link) return;

  let destination;
  try {
    destination = new URL(link.href, window.location.href);
  } catch {
    return;
  }

  if (destination.hostname === 'wa.me' || destination.hostname === 'api.whatsapp.com') {
    trackJeneconkEvent('whatsapp_click', {
      link_text: (link.textContent || '').trim().slice(0, 100),
      link_location: window.location.pathname
    });
  }

  const conversionEvent = link.dataset.analyticsEvent;
  if (conversionEvent === 'desk_card_request') {
    trackJeneconkEvent('desk_card_request', {
      link_location: window.location.pathname
    });
  }
});

document.querySelectorAll('form[action*="formsubmit.co"]').forEach((form) => {
  form.addEventListener('submit', () => {
    try {
      sessionStorage.setItem('jeneconk_pending_enquiry', JSON.stringify({
        submittedAt: Date.now(),
        formLocation: window.location.pathname
      }));
    } catch {
      // Analytics storage may be unavailable; allow the enquiry to continue.
    }
  });
});

if (window.location.pathname.endsWith('/contact-success.html')) {
  try {
    const pendingEnquiry = JSON.parse(sessionStorage.getItem('jeneconk_pending_enquiry') || 'null');
    const isRecentSubmission = pendingEnquiry && Date.now() - pendingEnquiry.submittedAt < 30 * 60 * 1000;
    if (isRecentSubmission) {
      trackJeneconkEvent('enquiry_submitted', {
        form_location: pendingEnquiry.formLocation
      });
      sessionStorage.removeItem('jeneconk_pending_enquiry');
    }
  } catch {
    // Keep the confirmation page usable if browser storage is unavailable.
  }
}

if (navToggle && nav) {
  navToggle.setAttribute('aria-expanded', 'false');
  navToggle.addEventListener('click', () => {
    const isOpen = nav.classList.toggle('is-open');
    navToggle.setAttribute('aria-label', isOpen ? 'Close navigation' : 'Open navigation');
    navToggle.setAttribute('aria-expanded', String(isOpen));
  });
}

const updateHeader = () => {
  if (!header) return;
  header.classList.toggle('is-scrolled', window.scrollY > 16);
};

updateHeader();
window.addEventListener('scroll', updateHeader, { passive: true });
