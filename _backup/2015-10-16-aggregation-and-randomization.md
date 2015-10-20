---
title: "Aggregation and randomization"
layout: post
tags: ["random forest"]
---

Given Data $\D$ and algorithm, we can derive $\varphi^{(D)}$

Data, algorithm => $\varphi^{(\D)}$

$p(y\vert x)$ unknown => 주어진 데이터로부터 못구함

$\varphi_a(x) = arg min \,\E\left[ l(\varphi^{(D)}(x),y) \right]$ => 못구함

B-V tradeoff


# Bootstrap & bagging

* What is aggregation?
* Why does aggregation help?
* How to get practical aggregation? = bagging
1. Generate bootstrap samples. (with small correlation)
2. Average or vote.


# CART (Classification and regression tree)

cart: unstable, overfitting -> pruning

C4.5, CHAID

# Random forest

Fix $m<<d$ (typically $m=\sqrt{d}$)
Fix $N_{min}$, $B$

1. draw a bootstrap sample.
2. For $k=1,\dots,B$, construct a tree $T_k$.
    * at each node, randomly select $m$ features
    * do the split on these $m$ features using some impurity measure
    * stop splitting the node if it contains fewer than $N_{min}$ element
    * Do not prune

---

1. Bootstrap resampling $D^{(k)}$ from $D$.
* bagging
* aggregation
2. random selection of $m<<d$ features at EACH node
* row correlation among node splits (stubs)
* individual decision 간 correlation이 작으면 variance이 작아진다.  (e.g., iid sample variance vs. correlated sample variance)
* randomization
3. No pruning
* speed up

---

## Why do random forests work?

robust, accurate

...

## Some thoughts on bias-variance tradeoff

* RF has very small bias
* RF reduces the variance

* Boosting reduces bias

RF : 주어진  피쳐에 대해 로버스트한 클래시파이어 구축


# Boosting

경제학, 게임이론에서 decision 결정하는데 많이 쓰임
bias를 줄이는 게 목적 (RF는 variance)