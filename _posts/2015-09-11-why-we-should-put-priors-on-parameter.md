---
layout: post
title: "Why we should put priors on parameter?"
description: "Many statistical analyses assume that random variables being studied are independent and identically distributed (iid). With the assumption, we can calculate the joint distributed probability by multiplying marginal probabilities of variables. But, iid is stronger assumption than infinitely exchangeable. If the data is exchangeable and not iid, how we can calculate the joint probability? The theorem below says that the exchangeability of the data ensures"
tags: bayesian prior parameter
---

Many statistical analyses assume that random variables being studied are independent and identically distributed (iid). With the assumption, we can calculate the joint distributed probability by multiplying marginal probabilities of variables.

But, iid is stronger assumption than infinitely exchangeable. If the data is exchangeable and not iid, how we can calculate the joint probability? The theorem below says that the exchangeability of the data ensures

* the existence of a parameter $\theta$, a distribution $P$ on $\theta$, and a likelihood $p(x\vert\theta)$
* the conditionally independence of given data $(x_1,x_2,\cdots,x_n)$


<div class = "notice">
<b>Theorem (De Finnetti, 1930s)</b>
<!-- <p> -->
A sequence of random variables $(x_1,x_2,\cdots)$ is infinitely exchangeable iff, for all $n$,
$$p(x_1,x_2,\cdots,x_n) = \int { \prod_{i=1}^{n}{p(x_i|\theta)} }P(d\theta),$$
for some measure $P$ on $\theta$.
<!-- </p> -->
</div>

Here's an example. Bag-of-words models assume that the order of words in a document does not matter. Even the words are definitely not iid, we can continue the argument since the assumption makes words conditionally independent.

# References

* [Michael I. Jordan's lecture note](http://www.cs.berkeley.edu/~jordan/courses/260-spring10/lectures/lecture1.pdf)

