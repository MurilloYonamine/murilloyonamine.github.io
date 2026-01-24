document.addEventListener('DOMContentLoaded', function() {
  (function () {
    function normalize(s) { return (s || '').toString().trim().toLowerCase(); }

    var tagLinks = document.querySelectorAll('.projects-tags a');
    if (!tagLinks || tagLinks.length === 0) return;
    var itemTagLinks = document.querySelectorAll('.project-tag');
    var projectItems = Array.prototype.slice.call(document.querySelectorAll('.project-item'));

    function applyFilter(tag) {
      var t = normalize(tag);
      projectItems.forEach(function (item) {
        var tags = normalize(item.getAttribute('data-tags'));
        if (!t || t === 'all') {
          item.style.display = '';
        } else if (tags.split(',').indexOf(t) !== -1) {
          item.style.display = '';
        } else {
          item.style.display = 'none';
        }
      });
      document.querySelectorAll('.projects-tags a, .project-tag').forEach(function (a) { a.classList.remove('active'); });
      if (t && t !== 'all') {
        document.querySelectorAll('[data-tag="' + t + '"]').forEach(function (a) { a.classList.add('active'); });
      }
    }

    function onTagClick(e) {
      e.preventDefault();
      var tag = this.getAttribute('data-tag');
      if (!tag) return;
      if (this.classList.contains('active')) {
        applyFilter('all');
      } else {
        applyFilter(tag);
      }
    }

    tagLinks.forEach(function (a) { a.addEventListener('click', onTagClick); });
    itemTagLinks.forEach(function (a) { a.addEventListener('click', onTagClick); });

    var params = new URLSearchParams(window.location.search);
    if (params.has('tag')) {
      applyFilter(params.get('tag'));
    }
  })();
});
