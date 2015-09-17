---
layout: page
title: 
---
{% include JB/setup %}

<div class="maintitle-font">
  <a class="brand" href="{{ HOME_PATH }}">{{ site.title }}</a>
</div>

<div align = "center">
    <img src ="/main.jpg">
</div>

<div class="maindescription-font">
"When the spirits are low, when the day appears dark, 
when work becomes monotonous, 
when hope hardly seems worth having, 

just mount a bicycle and go out for a spin down the road, 
without thought on anything but the ride you are taking." 

-- Arthur Conan Doyle
</div>

---

<ul>
    {% for tag in site.tags %}		
        <li><a href="/tags/{{ tag[0] }}">{{ tag[0] }}</a></li>
    {% endfor %}
</ul>
<!--<ul class="tag_box inline">-->
<!--  {% assign tags_list = site.tags %}  -->
<!--  {% include JB/tags_list %}-->
<!--</ul>-->

<!--{% for tag in site.tags %} -->
<!--  <h2 id="{{ tag[0] }}-ref">{{ tag[0] }}</h2>-->
<!--  <ul>-->
<!--    {% assign pages_list = tag[1] %}  -->
<!--    {% include JB/pages_list %}-->
<!--  </ul>-->
<!--{% endfor %}-->

---

<h2 class="post_title">{.{page.title}}</h2>
<ul>
  {.% for post in site.posts %}
  {.% for tag in post.tags %}
  {.% if tag == page.tag %}
  <li class="archive_list">
    <time style="color:#666;font-size:11px;" datetime='{.{post.date | date: "%Y-%m-%d"}}'>{.{post.date | date: "%m/%d/%y"}}</time> <a class="archive_list_article_link" href='{.{post.url}}'>{.{post.title}}</a>
    <p class="summary">{.{post.summary}}</p>
    <ul class="tag_list">
      {.% for tag in post.tags %}
      <li class="inline archive_list"><a class="tag_list_link" href="/tag/{.{ tag }}">{.{ tag }}</a></li>
      {.% endfor %}
    </ul>
  </li>
  {.% endif %}
  {.% endfor %}
  {.% endfor %}
</ul>

---
I see. I know. I understand.
---
Just keep pedaling :+1:!

<!-- <ul class="posts">
  {% for post in site.posts %}
    <li><span>{{ post.date | date_to_string }}</span> &raquo; <a href="{{ BASE_PATH }}{{ post.url }}">{{ post.title }}</a></li>
  {% endfor %}
</ul> -->

<ul id="post-list" class="archive">
    {% for post in site.posts %}
        <li>
            <a href="{{ post.url }}">{{ post.title }}<aside class="dates">{{ post.date | date_to_string }}</aside></a>
        </li>
    {% endfor %}
</ul>
