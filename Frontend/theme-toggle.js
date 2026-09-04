(function () {
  'use strict';

  const THEME_KEY = 'nathauxfx_theme';
  const systemTheme = window.matchMedia ? window.matchMedia('(prefers-color-scheme: light)') : null;

  function getSavedTheme() {
    try {
      const saved = localStorage.getItem(THEME_KEY);
      return saved === 'light' || saved === 'dark' ? saved : null;
    } catch (_error) {
      return null;
    }
  }

  function getEffectiveTheme() {
    const saved = getSavedTheme();
    if (saved) return saved;
    return systemTheme && systemTheme.matches ? 'light' : 'dark';
  }

  function updateButton(theme) {
    const button = document.getElementById('themeToggle');
    if (!button) return;
    const isDark = theme === 'dark';
    const nextTheme = isDark ? 'light' : 'dark';
    button.setAttribute('aria-checked', String(isDark));
    button.setAttribute('aria-label', `Switch to ${nextTheme} mode`);
    button.title = `Switch to ${nextTheme} mode`;
  }

  function applyTheme(theme, persist) {
    document.documentElement.setAttribute('data-theme', theme);
    if (persist) {
      try {
        localStorage.setItem(THEME_KEY, theme);
      } catch (_error) {}
    }
    updateButton(theme);
  }

  function installPublicLayoutFix() {
    if (document.getElementById('nathauxfx-public-layout-fix')) return;
    const style = document.createElement('style');
    style.id = 'nathauxfx-public-layout-fix';
    style.textContent = `
      /* Keep the second platform card rectangular, farther left, and tall enough
         to contain the disclosure and all legal links. */
      #landingPage > .hero-stats {
        flex: 0 0 auto !important;
        display: grid !important;
        grid-template-columns: repeat(4, minmax(0, 1fr)) !important;
        grid-auto-rows: auto !important;
        align-items: stretch !important;
        align-content: start !important;
        width: min(calc(100% - 8vw), 1180px) !important;
        max-width: 1180px !important;
        height: auto !important;
        min-height: 0 !important;
        margin-left: 4vw !important;
        margin-right: auto !important;
        margin-top: 22px !important;
        margin-bottom: 34px !important;
        padding: 16px 16px 18px !important;
        overflow: visible !important;
        box-sizing: border-box !important;
      }

      #landingPage > .hero-stats > div:not(.legal-links) {
        min-height: 76px !important;
        justify-content: center !important;
        text-align: center !important;
      }

      #landingPage > .hero-stats > .risk-note {
        display: block !important;
        visibility: visible !important;
        opacity: 1 !important;
        grid-column: 1 / -1 !important;
        width: auto !important;
        height: auto !important;
        margin: 12px 8px 0 !important;
        padding: 16px 2px 0 !important;
        text-align: left !important;
        line-height: 1.55 !important;
      }

      #landingPage > .hero-stats > .legal-links {
        display: flex !important;
        visibility: visible !important;
        opacity: 1 !important;
        grid-column: 1 / -1 !important;
        width: auto !important;
        height: auto !important;
        min-height: 0 !important;
        margin: 14px 8px 0 !important;
        padding: 0 2px 2px !important;
        border-right: 0 !important;
        flex-direction: row !important;
        flex-wrap: wrap !important;
        align-items: center !important;
        justify-content: center !important;
        gap: 10px 16px !important;
        overflow: visible !important;
      }

      @media (max-width: 700px) {
        #landingPage > .hero-stats {
          width: calc(100% - 30px) !important;
          margin-left: auto !important;
          margin-right: auto !important;
          grid-template-columns: 1fr 1fr !important;
        }
      }

      @media (max-width: 520px) {
        #landingPage > .hero-stats {
          grid-template-columns: 1fr !important;
        }
      }
    `;
    document.head.appendChild(style);
  }

  function initThemeToggle() {
    installPublicLayoutFix();
    applyTheme(getEffectiveTheme(), false);

    const button = document.getElementById('themeToggle');
    if (button) {
      button.addEventListener('click', function () {
        const current = document.documentElement.getAttribute('data-theme') || getEffectiveTheme();
        applyTheme(current === 'dark' ? 'light' : 'dark', true);
      });
    }

    if (systemTheme) {
      const onSystemThemeChange = function (event) {
        if (!getSavedTheme()) applyTheme(event.matches ? 'light' : 'dark', false);
      };
      if (typeof systemTheme.addEventListener === 'function') {
        systemTheme.addEventListener('change', onSystemThemeChange);
      } else if (typeof systemTheme.addListener === 'function') {
        systemTheme.addListener(onSystemThemeChange);
      }
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initThemeToggle, { once: true });
  } else {
    initThemeToggle();
  }
})();
