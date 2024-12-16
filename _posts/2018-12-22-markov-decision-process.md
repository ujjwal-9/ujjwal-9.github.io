---
layout: post
title:  "Markov Decision Process: A Framework for Decision Making"
date:   2018-12-22
title_include: true
categories: blog
---

<script type="text/x-mathjax-config">
MathJax.Hub.Config({
  <!-- tex2jax: {inlineMath: [['$','$'], ['\\(','\\)']]}, -->
  jax: ["input/TeX","output/HTML-CSS"],
  displayAlign: "left",
  "HTML-CSS": { scale: 110}
});
</script>

Markov Decision Process (MDP) provides a mathematical framework for modeling decision-making in situations where outcomes are partly random and partly under the control of a decision-maker. Let's dive into how MDPs help us understand different types of environments and decision-making scenarios.

## Types of Decision Environments

Decision environments can be categorized along several dimensions:

1. Complete vs Incomplete Information
2. Fully Observable vs Partially Observable 
3. Competitive vs Collaborative
4. Static vs Dynamic
5. Deterministic vs Stochastic

Today, we'll focus on observability in environments and how it impacts decision-making.

## Fully Observable Environments

In a fully observable environment, the agent has complete information about the current state of the system. Mathematically, we can represent this as:

$$s_t = f(o_t)$$

where:
- $$s_t$$ is the true state at time t
- $$o_t$$ is the observation at time t
- $$f$$ is a direct mapping function

### Example: Chess
Consider a chess game. The state space can be represented as:

$$S = \{s_1, s_2, ..., s_n\}$$

where each $$s_i$$ represents a possible board configuration. The optimal policy $$\pi^*$$ depends only on the current state:

$$\pi^*(s) = \arg\max_a Q(s,a)$$

where $$Q(s,a)$$ is the action-value function representing the expected future reward.

## Partially Observable Environments

In partially observable environments, the agent cannot directly observe the true state. Instead, it maintains a belief state based on past observations. This can be represented as:

$$b_t = P(s_t | o_1, o_2, ..., o_t)$$

where:
- $$b_t$$ is the belief state at time t
- $$s_t$$ is the true state
- $$o_1, o_2, ..., o_t$$ are observations up to time t

### Example: Poker
In poker, the optimal policy depends on both current observation and history:

$$\pi^*(b_t) = \arg\max_a \sum_{s \in S} b_t(s)Q(s,a)$$

where $$b_t(s)$$ represents the probability of being in state $$s$$ given the history of observations.

## The Markov Property

The key distinction lies in the Markov property. In fully observable environments:

$$P(s_{t+1}|s_t, s_{t-1}, ..., s_1) = P(s_{t+1}|s_t)$$

This means the future is independent of the past given the present. However, in partially observable environments, we need to maintain a history:

$$P(s_{t+1}|o_t, o_{t-1}, ..., o_1) \neq P(s_{t+1}|o_t)$$

## Real-World Applications

Consider a self-driving car:
- **Fully Observable**: Highway driving with clear weather and perfect sensor data
- **Partially Observable**: Urban driving in fog where past observations help predict hidden obstacles

The mathematical framework for decision-making changes based on observability:

$$
V(s) = \max_a \left[R(s,a) + \gamma \sum_{s'} P(s'|s,a)V(s')\right]
$$

where:
- $$V(s)$$ is the value function
- $$R(s,a)$$ is the reward function
- $$ \gamma $$ is the discount factor
- $$
P(s'|s,a)
$$ is the transition probability

This equation, known as the Bellman equation, takes different forms depending on whether we're dealing with fully or partially observable environments.

## Conclusion

Understanding the observability of an environment is crucial for designing effective decision-making systems. While fully observable environments like chess can rely solely on current state information, partially observable environments like poker require sophisticated belief state tracking and historical information processing.

The mathematical frameworks we've explored help us design better algorithms for each type of environment, leading to more effective decision-making systems in real-world applications.
