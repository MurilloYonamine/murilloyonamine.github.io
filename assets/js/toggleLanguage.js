function toggleLanguage() {
  const current = localStorage.getItem('language') || (document.documentElement.lang === 'en' ? 'en' : 'pt');
  const target = current === 'pt' ? 'en' : 'pt';
  setLanguage(target);
  redirectToEquivalent(target);
}

function setLanguage(lang) {
  localStorage.setItem('language', lang);
  document.documentElement.lang = (lang === 'en') ? 'en' : 'pt';
  updateLanguageIcon();
}

function updateLanguageIcon() {
  const isEn = document.documentElement.lang === 'en';
  const enEl = document.querySelector('.icon-en');
  const ptEl = document.querySelector('.icon-pt');
  if (enEl) enEl.style.display = isEn ? 'inline-block' : 'none';
  if (ptEl) ptEl.style.display = isEn ? 'none' : 'inline-block';
}

function redirectToEquivalent(lang) {
  try {
    const path = window.location.pathname;
    let newPath = path;
    if (lang === 'en') {
      if (path.startsWith('/en/')) newPath = path;
      else if (path.startsWith('/pt/')) newPath = path.replace('/pt/', '/en/');
      else newPath = '/en' + (path === '/' ? '/' : path);
    } else {
      if (path.startsWith('/pt/')) newPath = path;
      else if (path.startsWith('/en/')) newPath = path.replace('/en/', '/pt/');
      else newPath = '/pt' + (path === '/' ? '/' : path);
    }
    if (newPath !== path) {
      window.location.href = newPath + window.location.search + window.location.hash;
    }
  } catch (e) {
    console.error('language redirect error', e);
  }
}

document.addEventListener('DOMContentLoaded', function() {
  const saved = localStorage.getItem('language');
  if (saved === 'en') {
    document.documentElement.lang = 'en';
  } else if (saved === 'pt') {
    document.documentElement.lang = 'pt';
  }
  updateLanguageIcon();

  // Navigation toggle for mobile movement
  const navToggle = document.querySelector('.nav-toggle');
  const mainNav = document.getElementById('main-nav');
  const THEME_BREAKPOINT = 600;
  const langBtn = document.getElementById('language-toggle-btn');

  function moveToggleToNav() {
    if (!langBtn || !mainNav) return;
    const existsInNav = mainNav.querySelector('.nav-language-toggle-item');
    if (window.innerWidth <= THEME_BREAKPOINT) {
      if (!existsInNav) {
        const li = document.createElement('li');
        li.className = 'nav-language-toggle-item';
        li.appendChild(langBtn);
        mainNav.prepend(li);
      }
    } else {
      if (existsInNav) {
        document.body.insertBefore(langBtn, document.body.firstChild);
        existsInNav.remove();
      }
    }
  }

  moveToggleToNav();
  window.addEventListener('resize', moveToggleToNav);
});
