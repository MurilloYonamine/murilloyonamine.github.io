function toggleLanguage() {
  const current = localStorage.getItem('language') || (document.documentElement.lang === 'en' ? 'en' : 'pt-BR');
  const target = current === 'pt-BR' ? 'en' : 'pt-BR';
  setLanguage(target);
  redirectToEquivalent(target);
}

function setLanguage(lang) {
  localStorage.setItem('language', lang);
  document.documentElement.lang = (lang === 'en') ? 'en' : 'pt-BR';
  updateLanguageIcon();
  try {
    window.dispatchEvent(new CustomEvent('language-changed', { detail: { lang } }));
  } catch (e) {}
}

// select a language explicitly and redirect; no-op if already selected
function selectLanguage(lang) {
  const current = (localStorage.getItem('language') || document.documentElement.lang || '').toString();
  const normalizedCurrent = current.toLowerCase().startsWith('pt') ? 'pt-BR' : 'en';
  const normalizedTarget = (lang || '').toString().toLowerCase().startsWith('pt') ? 'pt-BR' : 'en';
  if (normalizedCurrent === normalizedTarget) {
    // still update icons in case
    setLanguage(normalizedTarget);
    return;
  }
  setLanguage(normalizedTarget);
  setTimeout(function () { redirectToEquivalent(normalizedTarget === 'en' ? 'en' : 'pt-BR'); }, 180);
}

function updateLanguageIcon() {
  const isEn = document.documentElement.lang === 'en';
    const enBtn = document.querySelector('.lang-btn-en');
    const ptBtn = document.querySelector('.lang-btn-pt');
    if (enBtn && ptBtn) {
      if (isEn) {
        enBtn.classList.add('active');
        enBtn.classList.remove('inactive');
        ptBtn.classList.add('inactive');
        ptBtn.classList.remove('active');
        enBtn.setAttribute('aria-pressed', 'true');
        ptBtn.setAttribute('aria-pressed', 'false');
      } else {
        ptBtn.classList.add('active');
        ptBtn.classList.remove('inactive');
        enBtn.classList.add('inactive');
        enBtn.classList.remove('active');
        ptBtn.setAttribute('aria-pressed', 'true');
        enBtn.setAttribute('aria-pressed', 'false');
      }
    }
}

function redirectToEquivalent(lang) {
  try {
    const path = window.location.pathname;
    let newPath = path;
    const isEn = (lang || '').toString().toLowerCase().startsWith('en');
    if (isEn) {
      if (path.startsWith('/en/')) newPath = path;
      else if (path.startsWith('/br/')) newPath = path.replace('/br/', '/en/');
      else newPath = '/en' + (path === '/' ? '/' : path);
    } else {
      if (path.startsWith('/br/')) newPath = path;
      else if (path.startsWith('/en/')) newPath = path.replace('/en/', '/br/');
      else newPath = '/br' + (path === '/' ? '/' : path);
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
  } else if (saved === 'pt' || saved === 'pt-BR') {
    document.documentElement.lang = 'pt-BR';
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
