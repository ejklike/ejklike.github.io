---
layout: default
title: publication
permalink: /publication/ko/
---

# Publications

## <strong>저널 논문</strong> 

<ul class="publication">
{% assign i = 0 %}
{% for item in site.data.journals %}
  {% assign i = i | plus:1 %}
  <li class="line">
  <div class="lineno">[{{ i }}]</div>
  <div>
      {{ item.author | replace: 'Eunji Kim', '<u>Eunji Kim</u>' }} ({{ item.year }}), "<a href="{{ item.url }}" target="_blank">{{ item.title }}</a>." <i>{{ item.journal }}</i>{% if item.volnopage =="Accepted" or item.volnopage =="In revision" %},{% endif %} {{ item.volnopage }}.
  </div>
  </li>
{% endfor %}
</ul>


## <strong>학술대회</strong>

<ul class="publication">
{% assign i = 0 %}
{% for item in site.data.conferences %}
  {% assign i = i | plus:1 %}
  <li class="line">
  <div class="lineno">[{{ i }}]</div>
  <div>
      {% if item.author_ko %}
        {{ item.author_ko | replace: '김은지', '<u>김은지</u>' }}, "{% if item.title_ko %}{{ item.title_ko }}{% else %}{{ item.title }}{% endif %}", <i>{{ item.conf_ko }}</i>, {{ item.year }}.
      {% else %}
        {{ item.author | replace: 'Eunji Kim', '<u>Eunji Kim</u>' }}, "{{ item.title }}", <i>{{ item.conf }}</i>, {{ item.month }}, {{ item.year }}.
      {% endif %}
  </div>
  </li>
{% endfor %}
</ul>

## <strong>특허</strong>

<ul class="publication">
{% assign i = 0 %}
{% for item in site.data.patents %}
  {% assign i = i | plus:1 %}
  <li class="line">
  <div class="lineno">[{{ i }}]</div>
  <div>
    {{ item.author_ko | replace: '김은지', '<u>김은지</u>' }} ({{ item.year }}), "{{ item.title_ko }}" 
    <ul>
      <!-- <li class="patent"> -->
      {% if item.application_no_kr %}
        <li><div>
          KR Patent, Application No. <a href="{{ item.url_kr }}" target="_blank">{{ item.application_no_kr }}</a>.
        </div></li>
      {% endif %}
      {% if item.application_no_us %}
        <li><div>
          US Patent, Application No. <a href="{{ item.url_us }}" target="_blank">{{ item.application_no_us }}</a>.
        </div></li>
      {% endif %}
      {% if item.application_no_ep %}
        <li><div>
          EP Patent, Application No. <a href="{{ item.url_ep }}" target="_blank">{{ item.application_no_ep }}</a>.
        </div></li>
      {% endif %}
      {% if item.application_no_jp %}
        <li><div>
          JP Patent, Application No. <a href="{{ item.url_jp }}" target="_blank">{{ item.application_no_jp }}</a>.
        </div></li>
      {% endif %}
      {% if item.application_no_cp %}
        <li><div>
          CP Patent, Application No. <a href="{{ item.url_cp }}" target="_blank">{{ item.application_no_cp }}</a>.
        </div></li>
      {% endif %}
    </ul>
  </div>
  </li>
{% endfor %}
</ul>


## <strong>저역서</strong>

<ul class="publication">
  <li class="line">
  <div class="lineno">[1]</div>
  <div>
    Kenneth Reitz and Tanya Schlusser. The Hitchhiker's Guide to Python: Best Practices for Development. Translation to Korean ("파이썬을 여행하는 히치하이커를 위한 안내서: 모범 사례와 실용 라이브러리로 더 파이썬답게!". 도서출판 인사이트. 2017. ISBN: 9788966264070)
  </div>
  </li>
</ul>
