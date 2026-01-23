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
});