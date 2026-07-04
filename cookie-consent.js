(function () {
  var STORAGE_KEY = 'htp_cookie_consent';

  function getConsent() {
    try {
      var raw = localStorage.getItem(STORAGE_KEY);
      return raw ? JSON.parse(raw) : null;
    } catch (e) {
      return null;
    }
  }

  function setConsent(consent) {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(consent));
    } catch (e) {
      /* storage unavailable — banner will just re-show next visit */
    }
    applyConsent(consent);
  }

  // Hook point: enable/disable actual scripts based on saved choice.
  // Wire real Analytics/Marketing snippets in here when you add them.
  function applyConsent(consent) {
    window.htpConsent = consent;
    if (consent.analytics) {
      // e.g. load Google Analytics here
    }
    if (consent.marketing) {
      // e.g. load Meta Pixel / Google Ads tags here
    }
  }

  function injectMarkup() {
    var bannerHTML = ''
      + '<div class="cookie-banner" id="cookieBanner" role="dialog" aria-live="polite" aria-label="Cookie consent">'
      + '  <p>We use cookies to run this site and, with your permission, to understand how visitors use it. See our '
      + '  <a href="privacy-policy.html">Privacy Policy</a> for details. You can change your choice anytime via "Cookie Settings" in the footer.</p>'
      + '  <div class="cookie-actions">'
      + '    <button type="button" class="ck-accept" id="ckAcceptAll">Accept All</button>'
      + '    <button type="button" class="ck-reject" id="ckRejectAll">Reject Non-Essential</button>'
      + '    <button type="button" class="ck-manage" id="ckManage">Customize</button>'
      + '  </div>'
      + '</div>'
      + '<div class="cookie-modal-overlay" id="cookieModalOverlay">'
      + '  <div class="cookie-modal" role="dialog" aria-modal="true" aria-labelledby="cookieModalTitle">'
      + '    <h3 id="cookieModalTitle">Cookie Preferences</h3>'
      + '    <p>Choose which categories of cookies we may use. Strictly necessary cookies keep the site and quote form working and can\'t be switched off.</p>'
      + '    <div class="ck-row">'
      + '      <div class="ck-row-text"><strong>Strictly Necessary</strong><span>Required for the site, quote form and WhatsApp handoff to work. Always on.</span></div>'
      + '      <div class="ck-toggle"><input type="checkbox" checked disabled aria-label="Strictly necessary cookies, always on"><span class="track"><span class="thumb"></span></span></div>'
      + '    </div>'
      + '    <div class="ck-row">'
      + '      <div class="ck-row-text"><strong>Analytics</strong><span>Helps us understand which pages and services visitors use, so we can improve the site.</span></div>'
      + '      <div class="ck-toggle"><input type="checkbox" id="ckAnalyticsToggle" aria-label="Analytics cookies"><span class="track"><span class="thumb"></span></span></div>'
      + '    </div>'
      + '    <div class="ck-row">'
      + '      <div class="ck-row-text"><strong>Marketing</strong><span>Used to measure ad performance if we ever run Google/Meta ads for Homeboy Tar-Pave.</span></div>'
      + '      <div class="ck-toggle"><input type="checkbox" id="ckMarketingToggle" aria-label="Marketing cookies"><span class="track"><span class="thumb"></span></span></div>'
      + '    </div>'
      + '    <div class="cookie-modal-actions">'
      + '      <button type="button" class="ck-save" id="ckSavePrefs">Save Preferences</button>'
      + '      <button type="button" class="ck-close" id="ckCloseModal">Cancel</button>'
      + '    </div>'
      + '  </div>'
      + '</div>';

    var mount = document.createElement('div');
    mount.innerHTML = bannerHTML;
    document.body.appendChild(mount);
  }

  function showBanner() {
    var el = document.getElementById('cookieBanner');
    if (el) el.classList.add('show');
  }
  function hideBanner() {
    var el = document.getElementById('cookieBanner');
    if (el) el.classList.remove('show');
  }
  function openModal(prefill) {
    var overlay = document.getElementById('cookieModalOverlay');
    var analytics = document.getElementById('ckAnalyticsToggle');
    var marketing = document.getElementById('ckMarketingToggle');
    if (prefill) {
      analytics.checked = !!prefill.analytics;
      marketing.checked = !!prefill.marketing;
    }
    overlay.classList.add('show');
  }
  function closeModal() {
    document.getElementById('cookieModalOverlay').classList.remove('show');
  }

  function bindEvents() {
    document.getElementById('ckAcceptAll').addEventListener('click', function () {
      setConsent({ necessary: true, analytics: true, marketing: true, ts: Date.now() });
      hideBanner();
    });
    document.getElementById('ckRejectAll').addEventListener('click', function () {
      setConsent({ necessary: true, analytics: false, marketing: false, ts: Date.now() });
      hideBanner();
    });
    document.getElementById('ckManage').addEventListener('click', function () {
      openModal(getConsent());
    });
    document.getElementById('ckCloseModal').addEventListener('click', closeModal);
    document.getElementById('cookieModalOverlay').addEventListener('click', function (e) {
      if (e.target === this) closeModal();
    });
    document.getElementById('ckSavePrefs').addEventListener('click', function () {
      var analytics = document.getElementById('ckAnalyticsToggle').checked;
      var marketing = document.getElementById('ckMarketingToggle').checked;
      setConsent({ necessary: true, analytics: analytics, marketing: marketing, ts: Date.now() });
      closeModal();
      hideBanner();
    });

    // Footer "Cookie Settings" links (class="open-cookie-settings") reopen preferences anytime.
    document.querySelectorAll('.open-cookie-settings').forEach(function (btn) {
      btn.addEventListener('click', function (e) {
        e.preventDefault();
        openModal(getConsent() || { analytics: false, marketing: false });
      });
    });
  }

  function init() {
    injectMarkup();
    bindEvents();
    var consent = getConsent();
    if (consent) {
      applyConsent(consent);
    } else {
      setTimeout(showBanner, 600);
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

  // Expose for manual triggering if needed elsewhere
  window.HTPCookies = { openSettings: function () { openModal(getConsent() || {}); } };
})();
