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

<ul class="tag_box inline">
  {% assign tags_list = site.tags %}  
  {% include JB/tags_list %}
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
