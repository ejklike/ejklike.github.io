---
layout: resume
title:  
permalink: /music/
---

{% assign sorted = (site.data.music | sort: 'artist') %}

<div class="myphotos">
    {% for item in sorted %}
        <a href="{{page.url}}" class="p-{{ item.idx }} myphoto"><img src="{{ item.img }}"></a>
    {% endfor %}

    {% for item in sorted %}
        <div class="caption c-{{ item.idx }}">{% if item.artist == None %} {% else %} {{ item.artist }} - {% endif %}{{ item.title }} {% if item.caption == None %}{% else %}| {{ item.caption }}{% endif %}</div>
    {% endfor %}
</div>