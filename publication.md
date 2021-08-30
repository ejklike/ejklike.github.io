---
layout: default
title: publication
permalink: /publication/
---


## Journals


<ul class="terminal">
{% assign i = 0 %}
{% for item in site.data.journals %}
  {% assign i = i | plus:1 %}
  <li class="js-line line" id="L{{ i }}-J">
  <a href="#L{{ i }}-J" class="line-link">{{ i }}</a>
  <div>
      {{ item.author | replace: 'Eunji Kim', '<u>Eunji Kim</u>' }} ({{ item.year }}), "<a href="{{ item.url }}" target="_blank">{{ item.title }}</a>." {{ item.journal }} {{ item.volnopage }}.
  </div>
  </li>
{% endfor %}
</ul>

<hr class="hr2">


## Conferences


<ul class="terminal">
{% assign i = 0 %}
{% for item in site.data.conferences %}
  {% assign i = i | plus:1 %}
  <li class="js-line line" id="L{{ i }}-C">
  <a href="#L{{ i }}-C" class="line-link">{{ i }}</a>
  <div>
      {{ item.author | replace: 'Eunji Kim', '<u>Eunji Kim</u>' }}, "{{ item.title }}", {{ item.conf }}, {{ item.month }}, {{ item.year }}.
  </div>
  </li>
{% endfor %}
</ul>

<hr class="hr">


### Books

<ul class="terminal">
  <li class="js-line line" id="L1-B">
  <a href="#L1-B" class="line-link">1</a>
  <div>
    Kenneth Reitz and Tanya Schlusser. The Hitchhiker's Guide to Python: Best Practices for Development. Translation to Korean ("파이썬을 여행하는 히치하이커를 위한 안내서: 모범 사례와 실용 라이브러리로 더 파이썬답게!". 도서출판 인사이트. 2017. ISBN: 9788966264070)
  </div>
  </li>
</ul>
