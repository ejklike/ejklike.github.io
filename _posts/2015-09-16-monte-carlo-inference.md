---
layout: post
title: "Monte Carlo inference"
description: ""
tags: [mcmc, sampling]
---

The concept of Monte Carlo approximation is very simple: 

> Generate some samples from a distribution, and then use these to compute any quantity of interest.
> All quantities can be approximated by $\mathbb{E}[f] \approx \frac{1}{S}\sum_{s=1}^{S} f(\textbf{x}^s)$ where $\textbf{x} \sim p(\textbf{x})$ for some distribution $p$.

Monte Carlo methods are used for posterior inference because we are interested about the integration value(mean, variance, ...) as well as the distribution(the probability for given $x$). When the sample size is large enough, we can achieve any desired level of accuracy.


<!-- For posterior inference, we can use various deterministic algorithms. But, our posterior may have some problems: -->
<!-- * need to be normalized -->
<!-- * hard to integrate (=hard to derive mean, variance, ...) -->

<!-- Then, how can we -->
<!-- * Why do we use MC approximation for posterior inference rather than deterministic algorithms? -->
  <!-- * ??? -->
  <!-- *  -->

<!-- How do we efficiently generate samples from a probability distribution, particularly in high dimensions?
  * non-iterative methods for generating independent samples
  * iterative method known as Markov Chain Monte Carlo(MCMC): produces dependent samples but which works well in high dimensions -->





# Sampling from standard distributions

These methods works in 1~2 dimensional sampling and often used as subroutines by more complex methods.

## Inverse probability transform 

When the inverse of an univariate cdf is easy to calculate,

1. Generate $u \sim unif(0,1)$.
2. Compute the value $F(x)=u$ where $F$ is the given cdf.
3. Take x to be the random number drawn from the cdf $F$.

This is due to the following theorem:

<div class="notice"><b>Theorem</b> For a cdf $F$ and an uniform random variable $u \sim unif(0,1)$, $F^{-1}(u) \sim F$. </div>

## Box-Muller method

When we want to generate **Gaussian random numbers**, we can't use the Inverse probability transform because there is no closed form formula for Gaussian cdf. Box-Muller method gives us pairs of independent standard normals from two independent uniforms.

If $(X,Y)$ is a pair of independent standard normals, then the probability density is a product:

$$f(x,y)=f(x)f(y)=\frac{1}{\sqrt{2\pi}} e^{-x^2/2}\cdot\frac{1}{\sqrt{2\pi}} e^{-y^2/2}=\frac{1}{2\pi} e^{-(x^2+y^2)/2}$$

Since this density is radially symmetric, it is natural to consider the polar coordinate random variables $(R,\theta)$. We interprete the change of variables probabilistically: $\theta$ is uniformly distributed over $[0,2\pi]$. Then, the marginal cdf over $R$ is 

$$P(R \leq r) = \int_{0}^{r} e^{-s^2/2}sds = 1-e^{-r^2/2}.$$

By letting $e^{-r^2/2}=U_2$, 

$$\theta=2\pi U_1,\: R=\sqrt{-2 ln(U_2)},\: X=R\cos\theta,\: Y=R\sin\theta$$

The resulting $X$ and $Y$ are independent univariate standard normals.

To sample from a multivariate Gaussian, 

1. Compute the Cholesky decomposition of given covariance matrix: $\boldsymbol\Sigma=\textbf{L}\textbf{L}^T$, where $\textbf{L}$ is lower triangular.
2. Sample $\textbf{x} \sim \mathcal{N}(\textbf{0},\textbf{I})$ using the Box-Muller method. ($n$ independent standard normals)
3. Set $\textbf{y}=\textbf{Lx}+\boldsymbol\mu$.

This is valid since

$$cov[\textbf{y}]=\textbf{L} cov[\textbf{x}] \textbf{L}^T=\textbf{L I L}^T=\boldsymbol\Sigma.$$

## Rejection sampling

When the inverse cdf method cannot be used, a type of Monte Carlo method called Rejection sampling (=acceptance-rejection method) can be used. The method works for any distritions in $\mathbb{R}^m$ with a density.

When the computational cost for deriving evidence(=normalizing constant) is very expensive, rejection samping works well in low dimension. (In high dimension, rejection rate grows exponentially.)

Suppose that an unnormalized target $\tilde{p}(\textbf{x})$ is given.

1. Find a constant $M$ and a **proposal distribution** $q(\textbf{x})$ such that $Mq(\textbf{x})\leq \tilde{p}(\textbf{x})$.
2. Sample $u\sim unif(0,1)$ (random height for $y$) and $\textbf{x} \sim q(\textbf{x})$ (random location for $\textbf{x}$) $\textbf{x}$)
3. Accept $\textbf{x}$ if $u\leq \tilde{p}(x) / M q(\textbf{x})$

## Importance sampling

When: approximating integrals of the form $I=\mathbb{E}[f]=\int f(\textbf{x})p(\textbf{x})d\textbf{x}$

Basic idea: 

# References

* K. Murphy, Ch.23
* Wikipedia
