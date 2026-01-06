// Plugin jQuery para geração automática de Sumário (Table of Contents)
// https://github.com/ghiculescu/jekyll-table-of-contents
// Updated by https://mazhuang.org
// Traduzido e comentado em português

(function ($) {
  // Plugin principal para criar sumário automático
  $.fn.toc = function (options) {
    // Configurações padrão do plugin
    var defaults = {
      noBackToTopLinks: false, // Se deve incluir links "voltar ao topo"
      title: 'Sumário', 
      minimumHeaders: 2, // Número mínimo de cabeçalhos para mostrar o sumário
      headers: 'h1, h2, h3, h4, h5, h6', // Seletores dos cabeçalhos
      listType: 'ul', // Tipo de lista: [ol|ul]
      showEffect: 'show', // Efeito de exibição: [show|slideDown|fadeIn|none]
      showSpeed: 0 // Velocidade do efeito (0 = desativado)
    },
      settings = $.extend(defaults, options);

    // Função para codificar corretamente caracteres especiais em URLs
    function fixedEncodeURIComponent(str) {
      return encodeURIComponent(str).replace(/[!'()*]/g, function (c) {
        return '%' + c.charCodeAt(0).toString(16);
      });
    }

    // Busca todos os cabeçalhos que atendem aos critérios
    var headers = $(settings.headers).filter(function () {
      // Ignora cabeçalhos dentro de blockquotes
      if ($(this).parent('blockquote').length > 0) {
        return false;
      }
      // Obtém todos os cabeçalhos que possuem um ID
      var previousSiblingName = $(this).prev().attr("name");
      if (!this.id && previousSiblingName) {
        this.id = $(this).attr("id", previousSiblingName.replace(/\./g, "-"));
      }
      return this.id;
    }), output = $(this);
    
    // Se não há cabeçalhos suficientes, oculta o sumário
    if (!headers.length || headers.length < settings.minimumHeaders || !output.length) {
      $(this).hide();
      $('.post-directory-title').css('display', 'none');
      return;
    }

    // Se velocidade é 0, desativa efeitos
    if (0 === settings.showSpeed) {
      settings.showEffect = 'none';
    }

    // Diferentes efeitos de exibição do sumário
    var render = {
      show: function () { output.hide().html(html).show(settings.showSpeed); },
      slideDown: function () { output.hide().html(html).slideDown(settings.showSpeed); },
      fadeIn: function () { output.hide().html(html).fadeIn(settings.showSpeed); },
      none: function () { output.html(html); }
    };

    // Função para obter o nível do cabeçalho (h1=1, h2=2, etc.)
    var get_level = function (ele) { return parseInt(ele.nodeName.replace("H", ""), 10); }
    // Encontra o nível mais alto (menor número) dos cabeçalhos
    var highest_level = headers.map(function (_, ele) { return get_level(ele); }).get().sort()[0];
    // Ícone para "voltar ao topo"
    var return_to_top = '<i class="icon-arrow-up back-to-top"> </i>';

    // Variáveis para construir o HTML do sumário
    var level = get_level(headers[0]),
      this_level,
      html = "<p><strong class=\"toc-title\">" + settings.title + "</strong></p>\n";
    html += " <" + settings.listType + " class=\"toc\">";
    // Processa cada cabeçalho para construir o sumário
    headers.on('click', function () {
      if (!settings.noBackToTopLinks) {
        window.location.hash = this.id;
      }
    })
      .addClass('clickable-header')
      .each(function (_, header) {
        this_level = get_level(header);
        // Adiciona botão "voltar ao topo" nos cabeçalhos de nível mais alto
        if (!settings.noBackToTopLinks && this_level === highest_level) {
          $(header).addClass('top-level-header').after(return_to_top);
        }
        if (this_level === level) { // Mesmo nível do anterior
          html += "<li class=\"toc-item toc-level-" + this_level + "\">";
          html += "<a class=\"jumper\" href='#" + fixedEncodeURIComponent(header.id) + "'>";
          html += "<span class='toc-text'>" + header.textContent + "</span>";
          html += "</a>";

        } else if (this_level <= level) { // Nível superior (menor número)
          for (i = this_level; i < level; i++) {
            html += "</li></" + settings.listType + ">"
          }
          html += "<li class='toc-item toc-level-" + this_level + "'><a class=\"jumper\" href='#" + fixedEncodeURIComponent(header.id) + "'>";
          html += "<span class='toc-text'>" + header.textContent + "</span>";
          html += "</a>";
        }
        else if (this_level > level) { // Nível inferior (maior número)
          for (i = this_level; i > level; i--) {
            html += "<" + settings.listType + " class='toc-child'><li class='toc-item toc-level-" + i + "'>"
          }
          html += "<a class=\"jumper\" href='#" + fixedEncodeURIComponent(header.id) + "'>";
          html += "<span class='toc-text'>" + header.textContent + "</span>";
          html += "</a>";
        }
        level = this_level; // Atualiza para o próximo
      });
    html += "</" + settings.listType + ">";
    if (!settings.noBackToTopLinks) {
      $(document).on('click', '.back-to-top', function () {
        $(window).scrollTop(0);
        window.location.hash = '';
      });
    }

    render[settings.showEffect]();
  };
})(jQuery);

// Inicialização quando o documento estiver pronto
$(document).ready(function () {
  // Ativa o plugin de sumário
  $('.post-directory').toc();

  // Variáveis para controle do scroll e destaque
  var fixmeTop = $('#post-directory-module').offset().top;
  var tocSections = $('.clickable-header');
  var tocSectionOffsets = [];

  // Calcula as posições dos cabeçalhos na página
  var calculateTocSections = function () {
    tocSectionOffsets = [];
    tocSections.each(function (index, section) {
      tocSectionOffsets.push(section.offsetTop);
    })
  }
  calculateTocSections();
  // Recalcula as posições quando imagens são carregadas
  $(window).bind('load', calculateTocSections);

  // Função para destacar a seção atual no sumário
  var highlightTocSection = function () {
    var highlightIndex = 0;
    var sectionsCount = tocSectionOffsets.length;
    var currentScroll = $(window).scrollTop();

    // Determina qual seção deve ser destacada baseado no scroll
    if (currentScroll + 60 > tocSectionOffsets[sectionsCount - 1]) {
      highlightIndex = sectionsCount;
    } else {
      for (var i = 0; i < sectionsCount; i++) {
        if (currentScroll + 60 <= tocSectionOffsets[i]) {
          highlightIndex = i;
          break;
        }
      }
    }
    // Aplica destaque ao item correto do sumário
    if (highlightIndex == 0) {
      highlightIndex += 1;
    }
    $('.toc-item .jumper').removeClass('on');
    $('.toc-item .jumper').eq(highlightIndex - 1).addClass('on');
  }
  highlightTocSection();

  // Ajusta a altura máxima do sumário baseado na janela
  var updateTocHeight = function () {
    var height = document.documentElement.clientHeight;
    height = height || 'auto';
    $('.post-directory').css('max-height', height);
  }

  // Controla o comportamento do sumário durante o scroll
  $(window).scroll(function () {
    var currentScroll = $(window).scrollTop();
    // Fixa o sumário no topo quando necessário
    if (currentScroll >= fixmeTop) {
      $('#post-directory-module').css({
        top: '0',
        position: 'fixed',
        width: 'inherit'
      });
      $('.post-directory').css('overflow', 'auto');
    } else {
      $('#post-directory-module').css({
        position: 'inherit',
        width: 'inherit'
      });
      $('.post-directory').css('overflow', 'hidden');
      $('.post-directory').scrollTop(0);
    }

    highlightTocSection();
  });

  updateTocHeight();

  // Recalcula altura quando a janela é redimensionada
  $(window).on("resize", function () {
    updateTocHeight();
  });
});

// Animação suave ao clicar nos links do sumário
$(".jumper").on("click", function (e) {
  e.preventDefault();
  $("body, html").animate({
    scrollTop: $($(this).attr('href')).offset().top
  }, 600); // 600ms de duração da animação
});
