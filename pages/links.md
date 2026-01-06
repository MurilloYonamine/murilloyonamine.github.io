---
layout: page
title: Links Úteis
description: Recursos e ferramentas para desenvolvimento web
keywords: links, recursos, desenvolvimento web
comments: true
menu: Links
permalink: /links/
---

> Links úteis para desenvolvedores

## Ferramentas de Desenvolvimento

<ul>
{% for link in site.data.links %}
  {% if link.src == 'dev' %}
  <li><a href="{{ link.url }}" target="_blank">{{ link.name}}</a></li>
  {% endif %}
{% endfor %}
</ul>

## Outros Recursos

<ul>
{% for link in site.data.links %}
  {% if link.src == 'other' %}
  <li><a href="{{ link.url }}" target="_blank">{{ link.name}}</a></li>
  {% endif %}
{% endfor %}
</ul>
