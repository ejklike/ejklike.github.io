---
layout: default
title: publication
permalink: /publication/
---

# Publications

## Journals

<ul class="publication">
{% assign i = 0 %}
{% for item in site.data.journals %}
  {% assign i = i | plus:1 %}
  <li class="line">
  <div class="lineno">[{{ i }}]</div>
  <div>
      {{ item.author | replace: 'Eunji Kim', '<u>Eunji Kim</u>' }} ({{ item.year }}), "<a href="{{ item.url }}" target="_blank">{{ item.title }}</a>." <i>{{ item.journal }}</i> {{ item.volnopage }}.
  </div>
  </li>
{% endfor %}
</ul>


## Conferences

<ul class="publication">
{% assign i = 0 %}
{% for item in site.data.conferences %}
  {% assign i = i | plus:1 %}
  <li class="line">
  <div class="lineno">[{{ i }}]</div>
  <div>
      {{ item.author | replace: 'Eunji Kim', '<u>Eunji Kim</u>' }}, "{{ item.title }}", <i>{{ item.conf }}</i>, {{ item.month }}, {{ item.year }}.
  </div>
  </li>
{% endfor %}
</ul>


## Patents

<ul class="publication">
  <li class="line">
  <div class="lineno">[1]</div>
  <div>
    Apparatus and method for synthesizing target products using neural networks (KR, 10-2021-0017869), 2021.
  </div>
  </li>
</ul>


### Books

<ul class="publication">
  <li class="line">
  <div class="lineno">[1]</div>
  <div>
    Kenneth Reitz and Tanya Schlusser. The Hitchhiker's Guide to Python: Best Practices for Development. Translation to Korean ("파이썬을 여행하는 히치하이커를 위한 안내서: 모범 사례와 실용 라이브러리로 더 파이썬답게!". 도서출판 인사이트. 2017. ISBN: 9788966264070)
  </div>
  </li>
</ul>
