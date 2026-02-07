function toggleTheme() {
  if (document.body.classList.contains('light-mode')) {
    document.body.classList.remove('light-mode');
    document.body.classList.add('dark-mode');
    localStorage.setItem('theme', 'dark-mode');
  } else {
    document.body.classList.remove('dark-mode');
    document.body.classList.add('light-mode');
    localStorage.setItem('theme', 'light-mode');
  }
  updateThemeIcon();
}

function updateThemeIcon() {
  const isDark = document.body.classList.contains('dark-mode');
  document.querySelector('.icon-dark').style.display = isDark ? 'inline-block' : 'none';
  document.querySelector('.icon-light').style.display = isDark ? 'none' : 'inline-block';
}

document.addEventListener('DOMContentLoaded', function() {
  const savedTheme = localStorage.getItem('theme');
  if (savedTheme === 'dark-mode') {
    document.body.classList.add('dark-mode');
  } else {
    document.body.classList.add('light-mode');
  }
  updateThemeIcon();
  // Navigation toggle for mobile
  const navToggle = document.querySelector('.nav-toggle');
  const mainNav = document.getElementById('main-nav');
  if (navToggle && mainNav) {
    navToggle.addEventListener('click', function () {
      const expanded = navToggle.getAttribute('aria-expanded') === 'true';
      navToggle.setAttribute('aria-expanded', String(!expanded));
      mainNav.classList.toggle('open');
      document.body.classList.toggle('nav-open');
    });
  }

  const THEME_BREAKPOINT = 600;
  const themeBtn = document.getElementById('theme-toggle-btn');

  function moveToggleToNav() {
    if (!themeBtn || !mainNav) return;
    const existsInNav = mainNav.querySelector('.nav-theme-toggle-item');
    if (window.innerWidth <= THEME_BREAKPOINT) {
      if (!existsInNav) {
        const li = document.createElement('li');
        li.className = 'nav-theme-toggle-item';
        li.appendChild(themeBtn);
        mainNav.prepend(li);
      }
    } else {
      if (existsInNav) {
        document.body.insertBefore(themeBtn, document.body.firstChild);
        existsInNav.remove();
      }
    }
  }

moveToggleToNav();
  window.addEventListener('resize', function() {
    moveToggleToNav();
  });
});
