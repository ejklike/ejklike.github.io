---
layout: post
title: "Multivariate Gaussians"
description: ""
tags: [gaussian]
---

A multivariate normal (MVN) is given:

$$\left(\matrix{x \\ y}\right) \sim \mathcal{N} (\mu, \Sigma)$$

where 

$$\mu = \left(\matrix{\mu_x \\ \mu_y}\right), \:\:
\Sigma = \left( \matrix{ \Sigma_{xx} & \Sigma_{xy} \\ \Sigma_{xy}^T & \Sigma_{yy} }\right). $$

# Linear transform of MVN

Linear combinations of MVN are MVN.

$$ Ax \sim \mathcal{N}(A\mu_x,A\Sigma_{xx}A^T) $$

# Marginal and conditionals of MVN

We can factorize the joint as 

$$ p(x,y) = p(x)p(y|x). $$

The marginal is

$$ p(x) = \mathcal{N}(\mu_x,\Sigma_{xx})$$

and the conditional is 

$$ p(y|x) = \mathcal{N}(\mu_{y|x},\Sigma_{y|x}) $$

where

$$
\mu_{y|x} = ?, \:\: \Sigma_{y|x} = ?
$$

(TBD)

# Bayes rules of MVN

(TBD)

<!-- Assume $x \sim \mathcal{N}(x;\mu_x,\Sigma_x)$ and $y$ is a linear function value of $x$.

$$
y|x \sim \mathcal{N}(y;Ax+b,\Sigma_y)
$$

Then, the posterior is given by the following:

$$
x|y \sim \mathcal{N}(x;\mu_{x|y},\Sigma_{x|y})
$$

where 

$$
\Sigma_{x|y}^{-1}   = \Sigma_x^{-1}+A^T\Sigma_y^{-1}A\\
\mu_{x|y}   = \Sigma_{x|y}[A^T\Sigma_y^{-1}(y-b)+\Sigma_x^{-1}\mu_x]
$$

Additionally, the marginal is given by the following:

$$
y\sim\mathcal{N}(A\mu_x+b,\Sigma_y+A\Sigma_xA^T)
$$

 -->