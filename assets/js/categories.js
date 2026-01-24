document.addEventListener('DOMContentLoaded', function() {
  var hash = location.hash;
  if (!hash) return;
  var slug = hash.replace('#', '');
  var groups = document.querySelectorAll('.archive-group');
  var found = false;
  groups.forEach(function(g) {
    var idDiv = g.querySelector('div[id]');
    if (idDiv && idDiv.id === slug) {
      found = true;
      g.style.display = ''; // keep visible
    } else {
      g.style.display = 'none';
    }
  });
  if (found) {
    var el = document.getElementById(slug);
    if (el) el.scrollIntoView();
  }
});
