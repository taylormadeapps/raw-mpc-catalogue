(() => {
  'use strict';

  const preferences = document.querySelector('.analytics-preferences');
  if (!preferences) return;

  const measurementId = 'G-9RXW7FTDRD';
  const disableKey = `ga-disable-${measurementId}`;
  const preferenceKey = 'raw-mpc-analytics-v1';
  const productionOrigin = 'https://mpc.ruminantaudioworks.com';
  const cookiePrefix = 'raw_mpc';
  const allow = preferences.querySelector('[data-analytics="allow"]');
  const decline = preferences.querySelector('[data-analytics="decline"]');
  const status = preferences.querySelector('[role="status"]');
  const consent = {
    analytics_storage: 'denied',
    ad_storage: 'denied',
    ad_user_data: 'denied',
    ad_personalization: 'denied',
  };
  let choice;
  let tag;
  let tagReady = false;
  let pageViewSent = false;
  let emailCampaign = null;

  try {
    choice = localStorage.getItem(preferenceKey);
  } catch {
    // Consent applies to this page when browser storage is unavailable.
  }

  function gtag() {
    window.dataLayer.push(arguments);
  }

  function pageView() {
    if (pageViewSent || !tagReady || choice !== 'allow') return;
    pageViewSent = true;
    gtag('event', 'page_view', { send_to: measurementId });
    if (emailCampaign) gtag('event', 'download_email_return', {
      send_to: measurementId, product: emailCampaign.campaign_name, platform_page: 'mpc',
    });
  }

  async function startAnalytics() {
    if (location.origin !== productionOrigin) return;
    window[disableKey] = false;
    if (tag) {
      gtag('consent', 'update', { ...consent, analytics_storage: 'granted' });
      pageView();
      return;
    }

    if (new URL(location.href).searchParams.get('utm_source') === 'download_email') {
      try {
        const { downloadEmailCampaign } = await import('./download-email-attribution.js');
        emailCampaign = downloadEmailCampaign(location.href);
      } catch (error) {
        console.error('Download email attribution could not be loaded; analytics has not started.', error);
        return;
      }
      // Consent can be withdrawn while the local module loads.
      if (choice !== 'allow' || tag) return;
    }

    window.dataLayer = window.dataLayer || [];
    window.gtag = gtag;
    gtag('consent', 'default', consent);
    gtag('consent', 'update', { ...consent, analytics_storage: 'granted' });
    gtag('js', new Date());
    gtag('config', measurementId, {
      send_page_view: false,
      page_location: `${location.origin}${location.pathname}`,
      page_referrer: document.referrer ? new URL(document.referrer).origin : '',
      ...emailCampaign,
      allow_google_signals: false,
      allow_ad_personalization_signals: false,
      cookie_domain: 'none',
      cookie_prefix: cookiePrefix,
      cookie_expires: 7776000,
      cookie_update: false,
    });
    tag = document.createElement('script');
    tag.async = true;
    tag.referrerPolicy = 'no-referrer';
    tag.src = `https://www.googletagmanager.com/gtag/js?id=${measurementId}`;
    tag.addEventListener('load', () => {
      tagReady = true;
      pageView();
    }, { once: true });
    document.head.append(tag);
  }

  function stopAnalytics() {
    window[disableKey] = true;
    if (tag) gtag('consent', 'update', consent);
    const cookieNames = document.cookie.split(';').map(cookie => cookie.split('=')[0].trim());
    for (const name of cookieNames) {
      if (name === `${cookiePrefix}_ga` || name.startsWith(`${cookiePrefix}_ga_`)) {
        document.cookie = `${name}=; Max-Age=0; Path=/`;
      }
    }
  }

  function applyChoice(value) {
    choice = value;
    allow.disabled = choice === 'allow';
    decline.disabled = choice === 'decline';
    decline.textContent = choice === 'allow' ? 'Turn off analytics' : 'Keep analytics off';
    status.textContent = choice === 'allow' ? 'Analytics is on.' : 'Analytics is off.';
    if (choice === 'allow') startAnalytics();
    else stopAnalytics();
  }

  function saveChoice(value) {
    try {
      localStorage.setItem(preferenceKey, value);
    } catch {
      // The choice still applies to this page.
    }
    applyChoice(value);
  }

  allow.addEventListener('click', () => saveChoice('allow'));
  decline.addEventListener('click', () => saveChoice('decline'));
  window.addEventListener('storage', event => {
    if (event.key === preferenceKey || event.key === null) applyChoice(event.newValue);
  });

  function trackDownload(event) {
    if (!tagReady || choice !== 'allow' || !(event.target instanceof Element)) return;
    const link = event.target.closest('a[href]');
    if (!link || link.hostname !== 'github.com' || link.protocol !== 'https:') return;
    const asset = link.pathname.match(/^\/taylormadeapps\/raw-mpc-catalogue\/releases\/download\/[^/]+\/([^/]+\.zip)$/i);
    if (!asset) return;
    gtag('event', 'file_download', {
      send_to: measurementId,
      file_name: asset[1],
      file_extension: 'zip',
    });
  }

  document.addEventListener('click', trackDownload);
  document.addEventListener('auxclick', event => {
    if (event.button === 1) trackDownload(event);
  });

  preferences.hidden = false;
  preferences.open = choice !== 'allow' && choice !== 'decline';
  applyChoice(choice);
})();
