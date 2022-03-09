---
layout: default
title: project
permalink: /project/
---

## Projects

{% assign i = 0 %}
{% for item in site.data.projects %}
  {% assign i = i | plus:1 %}
  <div class="project">
      <div class="projectimgframe">
      <img src="/assets/logo/{{ item.logo }}.png">
      </div>
      <p>{% if item.position == 'PM' %}(PM) {% endif %}{{ item.entitle }}</p>
  </div>
{% endfor %}
