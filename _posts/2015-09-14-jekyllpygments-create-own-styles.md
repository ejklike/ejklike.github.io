---
layout: post
title: "Jekyll+pygments: create own styles"
description: ""
category: 
tags: [jekyll, pygments, customize, style, python]
---
{% include JB/setup %}

{% highlight python %}
from pygments.style import Style
from pygments.token import Keyword, Name, Comment, String, Error, \
     Number, Operator, Generic

class YourStyle(Style):
    default_style = ""
    styles = {
        Comment:                'italic #888',
        Keyword:                'bold #005',
        Name:                   '#f00',
        Name.Function:          '#0f0',
        Name.Class:             'bold #0f0',
        String:                 'bg:#eee #111'
    }
{% endhighlight %}