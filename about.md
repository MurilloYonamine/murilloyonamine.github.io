---
layout: null
permalink: /about/
---
<!doctype html>
<html lang="pt-BR">
<head>
  <meta charset="utf-8">
  <meta http-equiv="refresh" content="0; url=/br/about/">
  <meta name="robots" content="noindex">
  <title>Redirecting…</title>
  <script>
    (function(){
      try {
        var lang = localStorage.getItem('language') || (document.documentElement && document.documentElement.lang) || 'pt-BR';
        if (typeof lang === 'string') {
          var low = lang.toLowerCase();
          if (low === 'pt' || low.indexOf('pt') === 0) lang = 'pt-BR';
          else lang = 'en';
        } else {
          lang = 'pt-BR';
        }
        var target = (lang === 'en') ? '/en/about/' : '/br/about/';
        var newUrl = target + window.location.search + window.location.hash;
        window.location.replace(newUrl);
      } catch (e) {
        window.location.replace('/br/about/');
      }
    })();
  </script>
</head>
<body>
  Redirecting — <a href="/br/about/">Português</a> | <a href="/en/about/">English</a>
</body>
</html>
