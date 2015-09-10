---
layout: post
title: "Why we should put priors on parameter?"
description: ""
category: 
tags: []
---
{% include JB/setup %}

Many statistical analyses assume that random variables being studied are independent and identically distributed (iid). With the assumption, we can calculate the joint distributed probability by multiplying marginal probabilities of variables.

But, iid is stronger assumption than infinitely exchangeable. If the data is exchangeable and not iid, how we can calculate the joint probability? The theorem below says that the exchangeability of the data ensures

* the existence of a parameter <span>$\theta$</span>, a distribution <span>$P$</span> on <span>$\theta$</span>, and a likelihood <span>$p(x|\theta)$</span>
* the conditionally independence of given data <span>$(x1,x2,\cdots,xn)$</span>

    Theorem (De Finnetti, 1930s)
    
    A sequence of random variables <span>$(x_1,x_2,\cdots)$</span> is infinitely exchangeable iff, for all n,
    <div>$$p(x_1,x_2,\cdots,x_n) = \int { \prod_{i=1}^{n}{p(x_i|\theta)} }P(d\theta),$$</div>
    for some measure <span>$P$</span> on <span>$\theta$</span>.

Here's an example. Bag-of-words models assume that the order of words in a document does not matter. Even the words are definitely not iid, we can continue the argument since the assumption makes words conditionally independent.