---
layout: page
title: Sobre
description: Desenvolvedor Web apaixonado por tecnologia
keywords: Murillo Yonamine, desenvolvedor, web developer
comments: true
menu: Sobre
permalink: /about/
---

Olá! Eu sou Murillo Yonamine, um desenvolvedor web apaixonado por criar experiências digitais incríveis.

Acredito no poder da tecnologia para transformar ideias em realidade e estou sempre em busca de novos desafios e oportunidades de aprendizado.

## Contato

<ul>
{% for website in site.data.social %}
<li>{{website.sitename }}: <a href="{{ website.url }}" target="_blank">{{ website.name }}</a></li>
{% endfor %}
</ul>

## Habilidades Técnicas

{% for skill in site.data.skills %}
### {{ skill.name }}
<div class="btn-inline">
{% for keyword in skill.keywords %}
<button class="btn btn-outline" type="button">{{ keyword }}</button>
{% endfor %}
</div>
{% endfor %}

## Sobre este Site

Este é meu portfolio pessoal onde compartilho projetos, experiências e reflexões sobre desenvolvimento web e tecnologia em geral.
