---
layout: default
title: project
permalink: /project/ko/
---


## projects <span class="smol">[ 한국어 / <a href="/project/">English</a> ]</span>


{% assign i = 0 %}
{% for item in site.data.projects %}
  {% assign i = i | plus:1 %}
  <div class="project">
      <div class="projectimgframe">
      <img src="/assets/logo/{{ item.logo }}.png">
      </div>
      <p>{% if item.position == 'PM' %}(PM) {% endif %}{{ item.kotitle }}</p>
  </div>
{% endfor %}