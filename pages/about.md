---
layout: default
title: about
permalink: /
---

I am an [Assistant Professor](http://biz.cau.ac.kr/2016/sub01/sub01_04_profile.php?pfNo=102&searchPfMajorCode=S01&searchPfTypeCode=S01){:target="_blank"} at the [School of Business Administration](http://biz.cau.ac.kr){:target="_blank"}, [Chung-Ang University](http://www.cau.ac.kr){:target="_blank"}. Prior to joining here, I was a Staff Researcher at [Samsung Advanced Institute of Technology (SAIT)](https://www.sait.samsung.co.kr/saithome/main/main.do){:target="_blank"}. I earned my Ph.D. degree in Data Mining at [Seoul National University](http://www.snu.ac.kr/){:target="_blank"}. My broad research interest lies in adopting deep learning models to various business problems such as fraud detection, fault detection and diagnosis, etc. I am also interested in interpretability in modeling for both data scientists and domain experts.

---

## Education

- Ph.D., [Industrial Engineering](http://ie.snu.ac.kr/){:target="_blank"}, [Seoul National University](http://www.snu.ac.kr){:target="_blank"} (Advisor: [Sungzoon Cho](http://dm.snu.ac.kr/){:target="_blank"}).
    - Dissertation: Supervised Deep Learning-based Anomaly Detection Models and Their Applications in Finance, Manufacturing, and Media
- B.S., [Mathematical Sciences](http://www.math.snu.ac.kr/){:target="_blank"}, [Seoul National University](http://www.snu.ac.kr){:target="_blank"}.

---

## Research Interests

- eXplainable Industrial AI (XIAI)
    - Solving real world problems including fraud detection, fault detection, driving route prediction, root-cause identification, retrosynthesis, human activity recognition, and so on.
    - Interpretability in modeling for both data scientists and domain experts.
- Learning from tensor-shaped data
    - Tensors are high dimensional generalizations of vectors and matrices.
    - E.g., sensor signal, image, video, ...
- Optimization, Regularization

---

## Experiences

- Assistant professor, [Chung-Ang University](http://www.cau.ac.kr){:target="_blank"}, 2021-Present.
- Staff researcher, [Samsung Advanced Institute of Technology (SAIT)](https://www.sait.samsung.co.kr/saithome/main/main.do){:target="_blank"}, 2019-2021.
<!-- - Intern, [Samsung Fire & Marine Insurance](http://www.samsungfire.com), Jul 2019. -->
- Guest Consultant, [Deloitte Consulting](https://www2.deloitte.com/kr/ko/services/consulting-deloitte.html){:target="_blank"}, 2019.
- Intern, [Naver Clova](https://clova.ai/){:target="_blank"}, 2018.
- Actuary, [Kyobo Life Insurance](https://www.kyobo.co.kr/){:target="_blank"}, 2011-2013.

---

## Recent Publications <a id="pub" href="{{ site.url }}/publication/" class="styled-link">more</a>

<ul class="">
{% assign i = 0 %}
{% for item in site.data.journals %}
  {% assign i = i | plus:1 %}
  <li>
  <div>
      {{ item.author | replace: 'Eunji Kim', '<u>Eunji Kim</u>' }} ({{ item.year }}), "<a href="{{ item.url }}" target="_blank">{{ item.title }}</a>." <i>{{ item.journal }}</i> {{ item.volnopage }}.
  </div>
  </li>
  {% if i == 3 %}
    {% break %}
  {% endif %}
{% endfor %}
</ul>

---

## Recent Projects <a id="pjt" href="{{ site.url }}/project/" class="styled-link">more</a>

<ul class="">
{% assign i = 0 %}
{% for item in site.data.projects %}
  {% assign i = i | plus:1 %}
  <li>
  <div>
      {{ item.enorg }}, {{ item.entitle }}.
  </div>
  </li>
  {% if i == 3 %}
    {% break %}
  {% endif %}
{% endfor %}
</ul>

---

## Awards

- Group Prize in 2020 Future Creator Award, DS Division, Samsung Electronics, 2020.
- Rookie Award in 2020 Real Mate Award, Material Research Center, Samsung Advanced Institute of Technology, 2020.
- Grand Prize in 2019 Industry-Academic Cooperation Excellence Paper Award, Seoul National University & Samsung Electronics, 2019.
- Best Paper Award in 2018 Fall Conference of Korea Business Intelligence Data Mining Society, Korea Data Mining Society, 2018.

---

## Contact

- E-mail: {{ site.email_txt }}
- Address: {{ site.address_en }}

<!-- <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3165.181103495683!2d126.95383621492536!3d37.50364653548569!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x357ca19bfd1c0bb1%3A0xee902db348af57fd!2z7KSR7JWZ64yA7ZWZ6rWQIDMxMOq0gCgxMDDso7zrhYTquLDrhZDqtIAp!5e0!3m2!1sen!2skr!4v1611764371581!5m2!1sen!2skr" width="100%" height="400" frameborder="0" style="border:0;" allowfullscreen="" aria-hidden="false" tabindex="0"></iframe> -->
