document.addEventListener('DOMContentLoaded', function() {
  (function () {
    function normalize(s) { return (s || '').toString().trim().toLowerCase(); }

    var tagLinks = document.querySelectorAll('.entries-tags a');
    if (!tagLinks || tagLinks.length === 0) return;
    var itemTagLinks = document.querySelectorAll('.entry-tag');
    var entries = Array.prototype.slice.call(document.querySelectorAll('.entry-item'));

    function applyFilter(tag) {
      var t = normalize(tag);
      entries.forEach(function (item) {
        var tags = normalize(item.getAttribute('data-tags'));
        var tagsArr = tags === '' ? [] : tags.split(',').map(function(s){ return s.trim(); });
        if (!t || t === 'all') {
          item.style.display = '';
        } else if (tagsArr.indexOf(t) !== -1) {
          item.style.display = '';
        } else {
          item.style.display = 'none';
        }
      });

      // Atualiza os parâmetros de consulta da URL (query params) para persistência
      try {
        var url = new URL(window.location.href);
        if (!t || t === 'all') {
          url.searchParams.delete('tag');
        } else {
          url.searchParams.set('tag', t);
        }
        window.history.replaceState({}, '', url.toString());
      } catch (e) {
        console.error('Erro ao atualizar URL de tags:', e);
      }

      // Recalcula a numeração sequencial dos projetos visíveis de forma decrescente (mais antigo = 01)
      var visibleEntries = entries.filter(function (item) {
        return item.style.display !== 'none';
      });
      var totalVisible = visibleEntries.length;
      visibleEntries.forEach(function (item, index) {
        var displayNum = totalVisible - index;
        var paddedNum = ('0' + displayNum).slice(-2);
        var badge = item.querySelector('.entry-badge');
        if (badge) {
          badge.textContent = 'PROJETO_' + paddedNum + '.EXE';
        }
      });

      document.querySelectorAll('.entries-tags a, .entry-tag').forEach(function (a) { a.classList.remove('active'); });
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
