---
layout: post
title: "Latent variables and EM algorithm"
description: ""
category: 
tags: ['algorithm','em']
---

Assume data $X=\\{\x_1,\dots,\x_n\\}$ is observed and is generated by some distribution governed by the set of parameters $\theta$. 

If the observed variables are correlated, how can we model the dependencies between variables? Assuming a hidden common "cause" can be a simple example. Model with hidden variables are known as **latent variable models (LVM)**.

<div class="notice" markdown="1">
### Q. Should we use Latent(hidden) variables?

LVMs have several advantages.

* LVMs often have fewer parameters than models that directly represent correlation in the visible space.
* Hidden variables can represents a compressed representation of the data. (E.g., Latent Dirichlet Allocation)
</div>

But, hidden variables makes our learning hard since we can't observe them directly. Let $\z$ be the set of assumed hidden variables and $Z=\\{\z_1,\dots,\z_n\\}$ be a latent data set corresponding to the given data. If we want to find MLE $\theta^*$ of our LVM, we would maximize the log-likelihood of following form.

$$
\begin{align}
l(\theta ; X) &= \sum_i {\log p(\x_i;\theta)} \notag\\
&= \sum_i {\log \Bigl( \sum_{\z_i}p(\x_i,\z_i;\theta) \Bigr)}\label{likelihood}
\end{align}
$$

As you can see, the marginalizing term over the hidden variables is in the logarithm and it is not possible to reduce this equation anymore. Then, how can we do MLE with this likelihood? The **Expectation-Maximization(EM) algorithm** is an elaborate solution.

# EM algorithm

Assume a complete data $(X,Z)$ exists (The obaserved data $X$ alone is called the incomplete data). Then, the joint density is 

$$
p(X,Z;\theta) = p(X|Z;\theta)\,p(Z;\theta).
$$

With this new density function, we can define the complete log-likelihood.

$$
\begin{align*}
l_c(\theta ; X,Z) 
&= \sum_i { \log p(\x_i,\z_i;\theta) }
\end{align*}
$$

Note that the complete log-likelihood is in fact **a random variable**, since it is a function of random variables $Z$. Take expectation on this random variable with respect to $Z$ given the observed data $X$ and the current parameter estimates $\theta_0$. It is called as **expected complete log-likelihood**.

$$
\begin{align*}
Q(\theta ; \theta_0)
= \EE { Z | X, \theta_0 }{ l_c(\theta;X,Z) } 
= \sum_i { \EE { \z_i | \x_i, \theta_0 } { \log p(\x_i,\z_i;\theta)} }
\end{align*}
$$

In other words, we plug in the best value of $\z_i$ in the complete log-likelihood. The expectation term can be re-written as:

$$
\begin{align*}
\EE { \z_i | \x_i , \theta_0 } { \log p(\x_i,\z_i;\theta) }
&= \int_{\z_i} \log p(\x_i,\z_i;\theta) \, d p(\z_i|\x_i;\theta_0) \\
&\propto \int_{\z_i} \log p(\x_i,\z_i;\theta) \, d p(\x_i,\z_i;\theta_0).
\end{align*}
$$

The last line is due to the Bayes' rule. We then maximize this Q-function with respect to $\theta$, i.e., find the optimal parameter set maximizing the expected complete log-likelihood which is computed with the previous optimal parameter set $\theta_0$.

In summary,

1. Initial parameter set $\theta_0$ is given.
2. (E-step) Derive $Q(\theta;\theta_0)$. In many applications, it is enough to calculate sufficient statistics.
3. (M-step) Find the optimal parameter set maximizing $Q(\theta;\theta_0)$. Set the resulting parameter set as $\theta_0$ and go to 2.
4. Repeat 2-3.

<div class="notice" markdown="1">
### Q. How can we ensure this algorithm works well?

The log-likelihood function increases with new parameter set. Suppose the single data case. (Just add summation terms for multiple data case.)

For any $\z$ with non-zero probability $p(\z \vert \x;\theta_0)$, we can write

$$
\begin{align*}
l(\theta ; \x) \\
&= \log p(\x,\z ;\theta) - \log p(\z|\x ;\theta)\\
&= \EE{ \z|\x ;\theta }{ \log p(\x,\z ;\theta) - \log p(\z|\x ;\theta) }\\
&= \sum_{\z} p(\z|\x;\theta_0) \log p(\x,\z;\theta) - \sum_{\z} p(\z|\x;\theta_0) \log p(\z|\x;\theta)\\
&= Q(\theta|\theta_0) - \sum_{\z} p(\z|\x;\theta_0) \log p(\z|\x;\theta)
\end{align*}
$$

Then,

$$
\begin{align*}
l(\theta ; \x) - l(\theta_0 ; \x) 
&= \bigl( Q(\theta|\theta_0)-Q(\theta_0|\theta_0) \bigr)
 + \sum_{\z} p(\z|\x;\theta_0) \log \frac{ p(\z|\x;\theta_0) }{ p(\z|\x;\theta) } \\
&= \bigl( Q(\theta|\theta_0)-Q(\theta_0|\theta_0) \bigr) + KL(p(\z|\x;\theta_0)||p(\z|\x;\theta)) \\
&\geq 0
\end{align*}
$$

The last inequality holds since

1. Q-function is maximized with $\theta$
2. Kullback-Leibler divergence is grater than or equal to 0 due to Gibbs' inequality.

</div>

<!-- 
# EM algorithm (from Andrew Ng's CS229 class note)

The log-likelihood \eqref{likelihood} is revisited. We introduce an arbitrary density $q_i(\z_i)$ called "averaging distribution" for all $i$.

$$
\begin{align*}
l(\theta ; X) 
&= \sum_i {\log \Bigl( \sum_{\z_i} p(\x_i,\z_i;\theta) \Bigr)} \\
&= \sum_i {\log \Bigl( \sum_{\z_i} q_i(\z_i) \frac{p(\x_i,\z_i;\theta)}{q_i(\z_i)}  \Bigr)} \\
&\geq \sum_i \sum_{\z_i} q_i(\z_i) \log \frac{p(\x_i,\z_i;\theta)}{q_i(\z_i)} \\
&= \sum_i \EE {q_i(\z_i)} {\log p(\x_i,\z_i;\theta)} + \sum_i Entropy[q_i(\z_i)]
\end{align*}
$$

The inequality holds due to Jensen's inequality and the concavity of logarithm. To maximize the log-likelihood, it is enough to maximize the expectation term only since the latter term contains no parameter. Then, a natural question arises: "Which average function we should use?"

Remind that the equality holds in Jensen's inequality if the inside of logarithm is constant.

$$
q_i(\z_i)
\propto p(\x_i,\z_i;\theta) 
$$

Since $\sum_{\z_i} q_i(\z_i)=1$ for all $i$,

$$
\begin{align*}
q_i(\z_i) =& \frac{p(\x_i,\z_i;\theta)}{\sum_{\z_i} {p(\x_i,\z_i;\theta)} } \\
=& \frac{p(\x_i,\z_i;\theta)}{p(\x_i;\theta)} = p(\z_i|\x_i;\theta)
\end{align*}
$$

In other words, we enough to choose $q_i$ as the conditional distribution on $x_i$. It is the same result as above: 

$$
\EE {q_i(\z_i)} {\log p(\x_i,\z_i;\theta)}
= \int_{\z_i} \log p(\x_i,\z_i;\theta) \, d p(\z_i|\x_i;\theta_0)
$$





The key idea is simple: 

1. (E-step) construct a lower bound of the log-likelihood 
2. (M-step) maximize the lower bound
3. repeat until the lower bound converges

How does it work? Let's take a look at.

## 1. Construct a lower bound of the log-likelihood

Introduce an arbitrary distribution $q_i(z)$ for $i=1,\cdots,N$. Then,

$$
\begin{align*}
l(\theta)  =& \sum_i {\log \int_{z_i}p(x_i,z_i|\theta)} \cr
=& \sum_i {\log \int_{z_i} q_i(z_i) \frac{p(x_i,z_i|\theta)}{q_i(z_i)} } \cr
\end{align*}
$$

For generality, integration form is used rather than summation. For deriving a lower bound of given weighted integral, we can use **Jensen's inequality** due to the convexity of logarithm.

$$
\begin{align*}
\log \int_{z_i} q_i(z) \frac{p(x_i,z_i|\theta)}{q_i(z_i)}
    \geq  \int_{z_i} q_i(z) \log \frac{p(x_i,z_i|\theta)}{q_i(z_i)}
\end{align*}
$$

Then, finding $\theta$ maximizing the log-likelihood is indirectly solved via finding $\theta$ and $q$ that maximize $J$.

$$
\begin{align*}
l(\theta)
    \geq \sum_i { \int_{z_i} q_i(z) \log \frac{p(x_i,z_i|\theta)}{q_i(z_i)} } 
    := J(\theta,q)
\end{align*}
$$

The lower bound becomes tight or loose depending on the choice of $q(z_i)$. We should find $q(z_i)$ that maximize the lower bound. In Jensen's inequality, equaltiy holds iff the inside of the logarithm is constant wrt $z_i$.

$$
\frac{p(x_i,z_i;\theta)}{q_i(z_i)} = const.
$$

*i.e.,* $q_i(z_i)$ is proportional to $p(x_i,z_i;\theta)$. Since $\sum_{z_i} q_i(z_i)=1$ for all $i$,

$$
\begin{align*}
q_i(z_i) =& \frac{p(x_i,z_i;\theta)}{\sum_{z_i} {p(x_i,z_i;\theta)} } \cr
=& \frac{p(x_i,z_i;\theta)}{p(x_i;\theta)} = p(z_i|x_i;\theta)
\end{align*}
$$

In other words, we enough to choose $q_i$ as the conditional distribution on $x_i$.

Given $q$, our problem is finding $\theta$ maximizing $J$.

$$
\begin{align*}
\theta 
=& arg \max_\theta \sum_i { \int_{z_i} q_i(z) \log \frac{p(x_i,z_i|\theta)}{q_i(z_i)} }
\end{align*}
$$







EM can be viewed as a coordinate ascent on $J(θ, q)$.
dd

$$
\begin{align}
l(\theta)  
\geq&  \max \Bigl( \sum_{i} {\log \int_{z_i} q_i(z) \frac{p(x_i,z_i|\theta)}{q_i(z_i)} } \Bigr) 
\end{align}
$$

Then,

$$
\begin{align}
l(\theta)  \geq&  \sum_{i} {\log \int_{z_i} q_i(z) \frac{p(x_i,z_i|\theta)}{q_i(z_i)} } \cr
=& \sum_{i} \mathbb{E}_{z_i\sim q_i}[\log P(x_i,z_i|\theta)]
\end{align}
$$ -->


# References

* K. Murphy, Ch. 11
* Wikipedia, "EM algorithm"