---
layout: post
title: "Monte Carlo inference"
description: ""
category: 
tags: []
---
{% include JB/setup %}

The concept of Monte Carlo approximation is very simple: 

> Generate some samples from a distribution, and then use these to compute any quantity of interest.
> All quantities can be approximated by $\mathbb{E}[f] \approx \frac{1}{S}\sum_{s=1}^{S} f(\textbf{x}^s)$ where $\textbf{x} \sim p(\textbf{x})$ for some distribution $p$.

For posterior inference, we can use various deterministic algorithms. 

* examples???
* 

Main issues

* Why do we use MC approximation for posterior inference rather than deterministic algorithms?
  * ???
  * 
* How do we efficiently generate samples from a probability distribution, particularly in high dimensions?
  * non-iterative methods for generating independent samples
  * iterative method known as Markov Chain Monte Carlo(MCMC): produces dependent samples but which works well in high dimensions





# Sampling from standard distributions
* 1 or 2 dimensions
* often used as subroutines by more complex methods

## Inverse probability transform 

When: univariate cdf 
* monotonic (having inverse function)
* range in unit interval

<div class="notice--blue">
<h2>Theorem</h2>
<p>If $U \sim unif(0,1)$, then $F^{-1}(U) \sim F$.</p>
</div>

## Box-Muller method

When: sampling from a Gaussian (univariate or multivariate)

1. 


## Rejection sampling


## Importance sampling


(Ref: K. Murphy, Ch.23)
