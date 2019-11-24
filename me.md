---
layout: resume
title: AboutMe
permalink: /me/
---

## Eunji Kim

<div class="myphotos"> 
    <a href="{{page.url}}" class="p-0 myphoto"><img src="/assets/mine/me.jpeg"></a>
    <a href="{{page.url}}" class="p-l myphoto"><img src="/assets/mine/smallheart.png"></a>
    <a href="{{page.url}}" class="p-1 myphoto"><img src="/assets/mine/beer2.jpeg"></a>
    <a href="{{page.url}}" class="p-2 myphoto"><img src="/assets/mine/latte2.jpeg"></a>
    <a href="{{page.url}}" class="p-3 myphoto"><img src="/assets/mine/track.jpg"></a>
    <div class="caption c-0">Me.</div>
    <div class="caption c-l">:raised_hands:</div>
    <div class="caption c-1">Free and easy atmosphere.</div>
    <div class="caption c-2">A cup of iced Latte.</div>
    <div class="caption c-3">Running and Cycling.</div>
</div>
<br>


Currently a research staff in [Samsung Advanced Institute of Technology (SAIT)](https://www.sait.samsung.co.kr/saithome/main/main.do).

I am interested in

- Adopting deep learning models to various real world problems
    - Real world problems including fraud detection, fault detection, driving route prediction, root-cause identification, retrosynthesis, human activity recognition, and so on.
    - Interpretability in modeling for both data scientists and domain experts.
- Learning from tensor-shaped data
    - Tensors are high dimensional generalizations of vectors and matrices.
    - E.g., sensor signal, image, video, ...
- Optimization, Regularization

I am familiar with Python and Matlab, and have experience with Java, R, C++, and D3.js.

---

## Education

- Ph.D., Industrial Engineering, Seoul National University (Advisor: Sungzoon Cho).
    - Dissertation: Supervised Deep Learning-based Anomaly Detection Models and Their Applications in Finance, Manufacturing, and Media
- B.S., Mathematical Sciences, Seoul National University.

---

## Experiences

### Teaching

- Instructor, Analytical Languages : R & Python (데이터처리언어), Seoul National University of Science and Technology, Spring 2017.
- Instructor, Big data analysis in public relations and advertising, Sookmyung Women's Univ., Fall 2016.
- Instructor, Big Data Advanced course, Samsung SDS Multicampus, Aug 2016.

### Camps

- Mentee, Develop with Google (구글 여성 소프트웨어 캠프), Jan-Feb 2017.
- Mentor, Industrial Engineering FIELD Camp, Aug 2016.
- Teaching Assistant, SNU Summer Camp For Young Engineering Frontiers, Jul 2016.
- Teaching Assistant, SNU Winter Camp For Young Engineering Frontiers, Feb 2016.
- Teaching Assistant, SNU Summer Camp For Young Engineering Frontiers, Aug 2015.

###  Company

- Intern, Samsung Fire & Marine Insurance, Jul 2019.
- Guest Consultant, Deloitte, May-Jun 2019.
- Intern, Naver Clova AI, Mar-Jun 2018.
- Actuary, Kyobo Life Insurance, 2011-2013.

---

## Awards

- Grand Prize in 2019 Industry-Academic Cooperation Excellence Paper Award, Seoul National University & Samsung Electronics, 2019.
- Best Paper Award in 2018 Fall Conference of Korea Business Intelligence Data Mining Society, Korea Data Mining Society, 2018.

---

## Projects

 <ul>
{% for item in site.data.projects %}
  <li>
      {% if item.position == 'PM' %}(PM) {% endif %}{{ item.entitle }}, {{ item.enorg }}, {{ item.duration }}.
  </li>
{% endfor %}
</ul>  

---
 
## Publications

### Journals

 <ul>
{% for item in site.data.journals %}
  <li>
      {{ item.author | replace: 'Eunji Kim', '<u>Eunji Kim</u>' }} ({{ item.year }}), "{{ item.title }}." {{ item.journal }} {{ item.volnopage }}. ({{ item.sci }})
  </li>
{% endfor %}
</ul>  

### Conferences

 <ul>
{% for item in site.data.conferences %}
  <li>
      {{ item.author | replace: 'Eunji Kim', '<u>Eunji Kim</u>' }}, "{{ item.title }}", {{ item.conf }}, {{ item.month }}, {{ item.year }}.
  </li>
{% endfor %}
</ul> 

### Books

- Kenneth Reitz and Tanya Schlusser. The Hitchhiker's Guide to Python: Best Practices for Development. Translation to Korean ("파이썬을 여행하는 히치하이커를 위한 안내서: 모범 사례와 실용 라이브러리로 더 파이썬답게!". 도서출판 인사이트. 2017. ISBN: 9788966264070)
