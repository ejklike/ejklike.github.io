---
layout: default
title: about
permalink: /ko/
---

## <strong>학력</strong>

- [서울대학교](http://www.snu.ac.kr){:target="_blank"} [산업공학과](http://ie.snu.ac.kr/){:target="_blank"} 공학박사, (지도교수: [조성준](http://dm.snu.ac.kr/){:target="_blank"}).
    - 학위논문: Supervised Deep Learning-based Anomaly Detection Models and Their Applications in Finance, Manufacturing, and Media (교사 딥러닝 기반 이상탐지 모델과 금융, 제조, 미디어 분야에의 응용)
- [서울대학교](http://www.snu.ac.kr){:target="_blank"} [수리과학부](http://www.math.snu.ac.kr/){:target="_blank"} 이학사.

---

## <strong>주요 경력</strong>

- 조교수, [중앙대학교](http://www.cau.ac.kr){:target="_blank"}, 2021-현재.
- 전문연구원, [삼성종합기술원](https://www.sait.samsung.co.kr/saithome/main/main.do){:target="_blank"}, 2019-2021.
<!-- - Intern, [Samsung Fire & Marine Insurance](http://www.samsungfire.com), Jul 2019. -->
- 객원컨설턴트, [딜로이트](https://www2.deloitte.com/kr/ko/services/consulting-deloitte.html){:target="_blank"}, 2019.
- 인턴, [네이버 클로바](https://clova.ai/){:target="_blank"}, 2018.
- 계리사, [교보생명](https://www.kyobo.co.kr/){:target="_blank"}, 2011-2013.

---

## <strong>연구분야</strong>
- <span class="mark">설명 가능한 산업인공지능 (eXplainable Industrial AI, XIAI)</span>
    - 제조불량, 설비고장, 카드사기, 위조이미지 등 이상탐지 및 근본 원인 규명 (anomaly detection & root cause identification)
    - 자동차 주행 경로 및 목적지 예측 (driving route and destination prediction)
    - 화학 소재 역합성 경로 예측 (retrosynthesis)
    - 웨어러블 센서 기반 인간 활동 인식 (human activity recognition)

---

## <strong><a href="#pub" class="nocolor">최근 논문 및 저서</a></strong> <a id="pub" href="{{ site.url }}/publication/ko/" class="styled-link">more</a>

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

## <strong>최근 연구과제</strong> <a id="pjt" href="{{ site.url }}/project/ko" class="styled-link">more</a>

<ul class="">
{% assign i = 0 %}
{% for item in site.data.projects %}
  {% assign i = i | plus:1 %}
  <li>
  <div>
      {{ item.kotitle }}, {{ item.koorg }}.
  </div>
  </li>
  {% if i == 3 %}
    {% break %}
  {% endif %}
{% endfor %}
</ul>

<!-- 
---
## <strong>담당 교과목</strong>

- Business Analytics (비즈니스 애널리틱스)
- Management Science (경영과학)
- Operations Management (운영관리) -->

---

## <strong>수상이력</strong>

- Future Creator Award 단체상, 삼성전자 DS부문, 2020.
- Real Mate Award 신인상, 삼성전자 종합기술원 소재연구센터, 2020.
- 서울대-삼성전자 산학협력 최우수논문상, 서울대 & 삼성전자, 2019.
- 2018 추계 한국BI데이터마이닝학회 최우수논문상, 한국BI데이터마이닝학회, 2018.


---

## <strong>외부 강의</strong>

- 산업인공지능 데이터기반 품질관리 교육과정, 한국전자기술연구원(KETI), 2022
- 스마트팩토리 품질관리 미래역량교육, 기아자동차, 2022.
- 텐서플로 튜토리얼, 한국통계학회 여름/겨울학교, 2018-2019.
- 개발자를 위한 파이썬 머신러닝 실전과정, 동부금융그룹, 2017.
- 데이터처리언어, 서울과학기술대학교, 2017.
- 파이썬과 오픈소스를 활용한 딥러닝, 삼성SDS멀티캠퍼스, 2016-2017.
- 홍보광고빅데이터분석, 숙명여자대학교, 2016.
- 경기 빅데이터 전문인력 양성과정, 2016.

---

## <strong>학회 및 협회활동</strong>

- 한국생산성본부(KPC), 자문위원 (2022- )
- 중소벤처기업부, 기술자문위원 (2021-)
- 한국생산관리학회(KOPOMS), 이사 (2021- )
- 대한민국관세청, 특허심사위원 (2021- )
- 한국전자정보통신산업진흥회(KEA), 자문위원 (2021- )

---

## Contact

- 이메일: {{ site.email_txt }}
- 주소: {{ site.address_ko }}

<!-- <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3165.181103495683!2d126.95383621492536!3d37.50364653548569!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x357ca19bfd1c0bb1%3A0xee902db348af57fd!2z7KSR7JWZ64yA7ZWZ6rWQIDMxMOq0gCgxMDDso7zrhYTquLDrhZDqtIAp!5e0!3m2!1sen!2skr!4v1611764371581!5m2!1sen!2skr" width="100%" height="400" frameborder="0" style="border:0;" allowfullscreen="" aria-hidden="false" tabindex="0"></iframe> -->
