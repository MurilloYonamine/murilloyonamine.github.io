localStorage.setItem('theme', 'dark-mode');
localStorage.setItem('theme', 'light-mode');

function toggleTheme() {
  if (document.body.classList.contains('light-mode')) {
    document.body.classList.remove('light-mode');
    document.body.classList.add('dark-mode');
    localStorage.setItem('theme', 'dark-mode');
    return;
  }

  document.body.classList.remove('dark-mode');
  document.body.classList.add('light-mode');
  localStorage.setItem('theme', 'light-mode');
}