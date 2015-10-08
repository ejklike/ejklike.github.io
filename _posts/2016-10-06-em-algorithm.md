---
layout: post
title: "EM algorithm"
description: ""
category: 
tags: em algorithm
---

When we model data, we want to find parameters maximizing given log-likelihood function:

\begin{eqnarray}
l(\theta) = \sum_i {\log p(x_i;\theta)}.
\end{eqnarray}

But, estimating parameters explicitly may be hard when the model contains hidden variables that are not observed (since the marginalizing term over the hidden variables is in the logarithm).

\begin{eqnarray}
l(\theta) &=& \sum_i {\log p(x_i;\theta)} \cr
&=& \sum_i {\log \Bigl( \sum_{z_i}p(x_i,z_i;\theta) \Bigr)}
\end{eqnarray}

Then, how can we find parameters that optimize the log-likelihood? **Expectation-Maximization(EM) algorithm** is a solution. The key idea is simple: 

1. (E-step) construct a lower bound of the log-likelihood 
2. (M-step) maximize the lower bound
3. repeat until the lower bound converges

How does it work? Let's take a look at.

## 1. Construct a lower bound of the log-likelihood

Introduce an arbitrary distribution $q_i(z)$ for $i=1,\cdots,N$. Then,

\begin{eqnarray}
l(\theta)  &=& \sum_i {\log \int_{z_i}p(x_i,z_i|\theta)} \cr
&=& \sum_i {\log \int_{z_i} q_i(z_i) \frac{p(x_i,z_i|\theta)}{q_i(z_i)} } \cr
\end{eqnarray}

For generality, integration form is used rather than summation. For deriving a lower bound of given weighted integral, we can use **Jensen's inequality** due to the convexity of logarithm.

\begin{eqnarray}
{\log \int_{z_i} q_i(z) \frac{p(x_i,z_i|\theta)}{q_i(z_i)} }
    \geq { \int_{z_i} q_i(z) \log \frac{p(x_i,z_i|\theta)}{q_i(z_i)} }
\end{eqnarray}

Then, finding $\theta$ maximizing the log-likelihood is indirectly solved via finding $\theta$ and $q$ that maximize $J$.

\begin{eqnarray}
l(\theta)
    \geq \sum_i { \int_{z_i} q_i(z) \log \frac{p(x_i,z_i|\theta)}{q_i(z_i)} } 
    := J(\theta,q)
\end{eqnarray}

The lower bound becomes tight or loose depending on the choice of $q(z_i)$. We should find $q(z_i)$ that maximize the lower bound. In Jensen's inequality, equaltiy holds iff the inside of the logarithm is constant wrt $z_i$.

\begin{eqnarray}
\frac{p(x_i,z_i;\theta)}{q_i(z_i)} = const.
\end{eqnarray}

*i.e.,* $q_i(z_i)$ is proportional to $p(x_i,z_i;\theta)$. Since $\sum_{z_i} q_i(z_i)=1$ for all $i$,

\begin{eqnarray}
q_i(z_i) &=& \frac{p(x_i,z_i;\theta)}{\sum_{z_i} {p(x_i,z_i;\theta)} } \cr
&=& \frac{p(x_i,z_i;\theta)}{p(x_i;\theta)} = p(z_i|x_i;\theta)
\end{eqnarray}

In other words, we enough to choose $q_i$ as the conditional distribution on $x_i$.

Given $q$, our problem is finding $\theta$ maximizing $J$.

\begin{eqnarray}
\theta 
&=& arg \max_\theta \sum_i { \int_{z_i} q_i(z) \log \frac{p(x_i,z_i|\theta)}{q_i(z_i)} }
\end{eqnarray}








EM can be viewed as a coordinate ascent on $J(θ, q)$.
dd
\begin{eqnarray}
l(\theta)  
&\geq&  \max \Bigl( \sum_{i} {\log \int_{z_i} q_i(z) \frac{p(x_i,z_i|\theta)}{q_i(z_i)} } \Bigr) 
\end{eqnarray}

Then,

\begin{eqnarray}
l(\theta)  &\geq&  \sum_{i} {\log \int_{z_i} q_i(z) \frac{p(x_i,z_i|\theta)}{q_i(z_i)} } \cr
&=& \sum_{i} \mathbb{E}_{z_i\sim q_i}[\log P(x_i,z_i|\theta)]
\end{eqnarray}



