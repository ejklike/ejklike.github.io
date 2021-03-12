---
layout: default
title: Projects
permalink: /projects/
---

<!-- ## Projects -->
<!-- 
<ul class="terminal">
{% assign i = 0 %}
{% for item in site.data.projects %}
  {% assign i = i | plus:1 %}
  <li class="js-line line" id="L{{ i }}-J">
  <a href="#L{{ i }}" class="line-link">{{ i }}</a>
  <div>
      {% if item.position == 'PM' %}(PM) {% endif %}{{ item.entitle }}, {{ item.enorg }}, {{ item.duration }}.
  </div>
  </li>
{% endfor %}
</ul> -->

## Projects <span class="smol">[ <a href="/projects/ko/">한국어</a> / English ]</span>


{% assign i = 0 %}
{% for item in site.data.projects %}
  {% assign i = i | plus:1 %}
  <div class="project">
      <img src="/assets/logo/{{ item.logo }}.png">
      <p>{% if item.position == 'PM' %}(PM) {% endif %}{{ item.entitle }}</p>
  </div>
{% endfor %}


<!-- 
<h2 class="text">Latest note  <span class="smol">[Jan 16, 2021]</span></h2>
<div class="note">
  <p>I’ve muted so many people on Facebook that whenever I add a new friend, Facebook will show every single one of their post to me because there’s often nothing else new. And I then have to mute the new friend because wow friend how did you get the time to post stuff daily?</p>

<p>Perhaps I just need a weekly digest of how my friends are doing.</p>

</div> -->
